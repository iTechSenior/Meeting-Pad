const express = require('express'),
  router = express.Router(),
  { aW, response } = require('../helpers'),
  { isLoggedIn, isOrganizer } = require('../middlewares'),
  { Meeting } = require('../models');

router.get('/', isLoggedIn, isOrganizer, aW(async (req, res) => {
  const meetings = await Meeting.find({}).lean().exec();
  return res.status(200).json(meetings);
}));

router.post('/', isLoggedIn, isOrganizer, aW(async (req, res) => {
  const { attendants, document } = req.body;
  if (!attendants || !document || !Array.isArray(attendants)) return res.status(400).json(response(false, 'You should fill all the fields!'));
  await Meeting.create({ attendants, document });
  return res.status(200).json(response(true, 'Meeting created!'));
}));



module.exports = router;