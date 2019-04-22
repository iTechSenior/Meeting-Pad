const express = require('express'),
  appRoot = require('app-root-path'),
  path = require('path'),
  router = express.Router(),
  toPdf = require('office-to-pdf'),
  fs = require('fs'),
  { promisify } = require('util'),
  writeFile = promisify(fs.writeFile),
  readFile = promisify(fs.readFile),
  unlink = promisify(fs.unlink),
  multer = require('multer'),
  upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, appRoot + '/tmp/');
      },
      filename: (req, file, callback) => {
        if (file.originalname.indexOf("~") !== -1) {
          file.originalname = file.originalname.replace(/\s/g, "-");
          callback(null, file.originalname)
        } else {
          file.originalname = file.originalname.replace(/\s/g, "-");
          callback(null, Date.now() + '~' + file.originalname);
        }
      }
    }),
    fileFilter: (req, file, cb) => {
      const { originalname } = file;
      if (extensions.indexOf(path.extname(originalname)) == -1) {
        return cb(new Error('Only pdfs, doc(x)s and ppt(x)s are allowed!'));
      }
      cb(null, true)
    }
  }),
  { aW, response, encryptFile, decryptFile } = require('../helpers'),
  { extensions } = require('../config'),
  { isLoggedIn, isPresenter, isOrganizer, isUnit } = require('../middlewares'),
  { Document } = require('../models');

// /api/documents

/**
 * Get all documents from database
 */
router.get('/', /* isLoggedIn, isOrganizer, */aW(async (req, res) => {
  const [approved, rejected, pending, info] = await Promise.all([
    Document.find().getDocumentsGlobal('approved', false),
    Document.find().getDocumentsGlobal('rejected', false),
    Document.find().getDocumentsGlobal('pending', false),
    Document.find().getDocumentsGlobal('info', false),
  ]);
  res.json({
    approved, rejected, pending, info
  });
}));

/**
 * Upload documents (pdf, doc(x), ppt(x)). Office are converted to pdf.
 * All content of documents are encrypted.
 */
router.post('/', isLoggedIn, isUnit, upload.single('file'), aW(async (req, res) => {
  const { title, summary } = req.body;
  if (!title || !summary || !req.file) return res.status(400).json(response(false, 'You have to fill all the fields!'))
  let { filename } = req.file;
  let newPath = appRoot + '/uploads/' + filename;
  const office = extensions.slice(1);
  const userID = req.user._id;
  const unitID = req.user.unit;
  // if (office.indexOf(path.extname(filename)) === -1) {
    if(path.extname(filename) === '.pdf') {
    await Promise.all([
      encryptFile(filename),
      Document.create({ title, summary, userID, unitID, filename, path: newPath }),
      unlink(req.file.path)
    ]);
    return res.status(200).json(response(true, 'File uploaded!'));
  } else {
    let officeBuffer = await readFile(req.file.path);
    let pdfBuffer = await toPdf(officeBuffer);
    let newFilename = filename + '.pdf';
    newPath = newPath + '.pdf';
    await Promise.all([
      writeFile(appRoot + `/tmp/${newFilename}`, pdfBuffer),
      encryptFile(newFilename)
    ]);
    await Promise.all([
      Document.create({ title, summary, userID, unitID, filename: newFilename, path: newPath }),
      unlink(req.file.path),
      unlink(appRoot + `/tmp/${newFilename}`)
    ]);
    return res.status(200).json(response(true, 'File uploaded!'));
  }
}));

/**
 * Organizer may ask for additional info about document
 */
router.put('/info', isLoggedIn, isOrganizer, aW(async (req, res) => {
  const { _id } = req.body,
    document = await Document.findOne({ _id });
  if (!document) return res.status(404).json(response(false, 'Document not found!'));
  document.status = 'info';
  await document.save();
  return res.status(200).json(response(true, 'Document needs more informations!'));
}));

/**
 * Client asks for a document. 
 * Document is decrypted and stored into client build folder. For test purposes, client public folder is involved.
 */
router.get('/:_id', isLoggedIn, aW(async (req, res) => {
  const { _id } = req.params;
  const document = await Document.findOne({ _id }).select('_id status title summary filename path createdAt');
  if (!document) return res.status(404).json(response(false, 'Document not found!'));
  const { filename } = document;
  if (fs.existsSync(`client/build/${filename}`)) {
    return res.status(200).json(document);
  } else {
    await decryptFile(filename);
    return res.status(200).json(document);
  }
}));

/**
 * Only Presenter can change status of document from pending to rejected or approved.
 */
router.put('/:_id', isLoggedIn, isPresenter, aW(async (req, res) => {
  const { _id } = req.params,
    { status } = req.body;

  // da li pisati logiku za title i summary ako su isti nista ne raditi, ako su promenjeni, upisati novo ili novi kontroler za to
  // ukoliko je document approved || rejected, ne moze edit!!!

  if (!status) return res.status(400).json(response(false, 'Status is required!'));
  const approvedStatuses = ['approved', 'rejected'];
  if (approvedStatuses.indexOf(status) == -1) return res.status(400).json(response(false, 'Status is not defined by rules!'));
  const document = await Document.findOne({ _id });
  if (!document) return res.status(404).json(response(false, 'Document not found!'));
  if (document.status === status) return res.status(400).json(response(false, 'Document status is already ' + status));
  document.status = status;
  await document.save();
  return res.status(200).json(response(true, 'Document status has been updated to ' + status));
}));

/**
 * When client clicks save button after editing document in pspdf kit, document is replaced in uploads folder.
 */
router.put('/save/:_id', isLoggedIn, upload.single('file'), aW(async (req, res) => {
  const { _id } = req.params,
    document = await Document.findOne({ _id });
  document.updatedAt = new Date();
  await Promise.all([
    document.save(),
    encryptFile(req.file.filename),
    unlink(req.file.path),
    unlink(`client/build/${req.file.filename}`)
  ]);
  return res.status(200).json(response(true, 'File updated!'));
}));

/**
 * Organizer adds minutes of meeting to the document!
 */
router.post('/minutes', isLoggedIn, isOrganizer, aW(async (req, res) => {
  const { _id, minutes } = req.body;
  if (!minutes) return res.status(400).json(response(false, 'Minutes of meeting is required!'));
  const document = await Document.findOne({ _id });
  if (!document) return res.status(404).json(response(false, 'Document not found!'));
  document.minutesOfMeeting = minutes;
  await document.save();
  return res.status(200).json(response(true, 'Minutes of meeting added to the document!'));
}));

module.exports = router;