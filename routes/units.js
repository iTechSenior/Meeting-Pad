const express = require('express');
const router = express.Router();
const { aW, response, dates } = require('../helpers');
const { Document, Unit } = require('../models');
const { isLoggedIn, isMyUnit } = require('../middlewares');

// /api/units

router.get('/', aW(async (req, res) => {

}));

router.get('/week/:name', isLoggedIn, aW(async (req, res) => {
  const now = new Date(); // endDay also
  const startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0, 0);
  const { name, status } = req.params;
  const unitID = await switchHelper(name);
  const [monday, tuesday, wednesday, thursday, friday, saturday, sunday, monday1, tuesday1, wednesday1, thursday1, friday1, saturday1, sunday1] = await Promise.all([
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 1').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 2').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 3').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 4').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 5').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 6').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 0').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 1').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 2').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 3').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 4').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 5').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 6').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: now } }).$where('new Date(this.createdAt).getDay() == 0').lean().exec()
  ]);
  return res.status(200).json({
    approved: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[monday.length, tuesday.length, wednesday.length, thursday.length, friday.length, saturday.length, sunday.length]]
      // Mo: monday.length,
      // Tu: tuesday.length,
      // We: wednesday.length,
      // Th: thursday.length,
      // Fr: friday.length,
      // Sa: saturday.length,
      // Su: sunday.length
    },
    rejected: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[monday1.length, tuesday1.length, wednesday1.length, thursday1.length, friday1.length, saturday1.length, sunday1.length]]
      // Mo: monday1.length,
      // Tu: tuesday1.length,
      // We: wednesday1.length,
      // Th: thursday1.length,
      // Fr: friday1.length,
      // Sa: saturday1.length,
      // Su: sunday1.length
    }
  });
}));

router.get('/month/:month/:name', aW(async (req, res) => {
  const { month, name } = req.params,
    unitID = await switchHelper(name);
  let startDay,
    lastDay;
  switch (month) {
    case 'january':
      startDay = dates.january.startDay,
        lastDay = dates.january.lastDay
      break;
    case 'february':
      startDay = dates.february.startDay,
        lastDay = dates.february.lastDay
      break;
    case 'march':
      startDay = dates.march.startDay,
        lastDay = dates.march.lastDay
      break;
    case 'april':
      startDay = dates.april.startDay,
        lastDay = dates.april.lastDay
      break;
    case 'may':
      startDay = dates.may.startDay,
        lastDay = dates.may.lastDay
      break;
    case 'june':
      startDay = dates.june.startDay,
        lastDay = dates.june.lastDay
      break;
    case 'july':
      startDay = dates.july.startDay,
        lastDay = dates.july.lastDay
      break;
    case 'august':
      startDay = dates.august.startDay,
        lastDay = dates.august.lastDay
      break;
    case 'september':
      startDay = dates.september.startDay,
        lastDay = dates.september.lastDay
      break;
    case 'october':
      startDay = dates.october.startDay,
        lastDay = dates.october.lastDay
      break;
    case 'november':
      startDay = dates.november.startDay,
        lastDay = dates.november.lastDay
      break;
    case 'december':
      startDay = dates.december.startDay,
        lastDay = dates.december.lastDay
      break;
    default:
      break;
  }
  const [monday, tuesday, wednesday, thursday, friday, saturday, sunday, monday1, tuesday1, wednesday1, thursday1, friday1, saturday1, sunday1] = await Promise.all([
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 1').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 2').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 3').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 4').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 5').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 6').lean().exec(),
    Document.find({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 0').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 1').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 2').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 3').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 4').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 5').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 6').lean().exec(),
    Document.find({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).$where('new Date(this.createdAt).getDay() == 0').lean().exec()
  ]);
  return res.status(200).json({
    approved: {
      monday: monday.length,
      tuesday: tuesday.length,
      wednesday: wednesday.length,
      thursday: thursday.length,
      friday: friday.length,
      saturday: saturday.length,
      sunday: sunday.length
    },
    rejected: {
      monday: monday1.length,
      tuesday: tuesday1.length,
      wednesday: wednesday1.length,
      thursday: thursday1.length,
      friday: friday1.length,
      saturday: saturday1.length,
      sunday: sunday1.length
    }
  });
}));

router.get('/year/:name', isLoggedIn, isMyUnit, aW(async (req, res) => {
  const { name } = req.params;
  const unitID = await switchHelper(name);
  const [totals, approved, rejected] = await Promise.all([
    Document.find().getDocumentsByUnitCount(unitID),
    Document.find().getDocumentsByUnitPerMonthForYear(unitID, 'approved'),
    Document.find().getDocumentsByUnitPerMonthForYear(unitID, 'rejected')
  ]);
  return res.status(200).json({
    totals,
    year: {
      approved, rejected
    }
  });
}));

router.get('/:name', isLoggedIn, aW(async (req, res) => {
  const { name } = req.params;
  const unitID = await switchHelper(name);
  const [totals, monthly] = await Promise.all([
    Document.find().getDocumentsByUnitCount(unitID),
    Document.find().getDocumentsByUnitForCurrentMonth(unitID)
  ]);
  res.status(200).json({
    totals, monthly
  });
}));

router.get('/:name/:status', isLoggedIn, isMyUnit, aW(async (req, res) => {
  const { name, status } = req.params;
  const unitID = await switchHelper(name);
  const documents = await Document.find({ unitID, status }).lean().exec();
  return res.status(200).json(documents);
}));

module.exports = router;

const switchHelper = async (value) => {
  let unitID;
  switch (value) {
    case 'business':
      const business = await Unit.findOne({ name: 'Business' });
      unitID = business._id;
      break;
    case 'it':
      const it = await Unit.findOne({ name: 'Integrated Technology' });
      unitID = it._id;
      break;
    case 'wholesale':
      const wholesale = await Unit.findOne({ name: 'Wholesale' });
      unitID = wholesale._id;
      break;
    case 'finance':
      const finance = await Unit.findOne({ name: 'Finance' });
      unitID = finance._id;
      break;
    case 'hr':
      const hr = await Unit.findOne({ name: 'HR' });
      unitID = hr._id;
      break;
  }
  return unitID;
}