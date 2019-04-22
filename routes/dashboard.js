const express = require('express'),
  router = express.Router(),
  { aW, response } = require('../helpers'),
  { isLoggedIn } = require('../middlewares'),
  { Unit, UserRole, User, Document } = require('../models');

// /api/dashboard

/**
 * Different user roles get different dashboards. In fact, there are 2 types of dashboards:
 * One is for Unit, second is for Organizer and Presenter.
 */
router.get('/', isLoggedIn, aW(async (req, res) => {
  let units;
  let unitsCount;
  switch (req.user.role.name) {
    case 'Organizer':
      units = await Unit.find({}).select('id name');
      unitsCount = await Promise.all(units.map(async ({ id, name }) => {
        let count = await Document.find().getDocumentsByUnitCount(id)
        return { unit: name, count };
      }))
      res.status(200).json({
        msg: 'Ja sam Organizer',
        unitsCount
      });
      break;
    case 'Unit':
      res.status(200).json('Ja sam Unit!');
      break;
    case 'Presenter':
      units = await Unit.find({}).select('id name');
      unitsCount = await Promise.all(units.map(async ({ id, name }) => {
        let count = await Document.find().getDocumentsByUnitCount(id)
        return { unit: name, count };
      }))
      res.status(200).json({
        msg: 'Ja sam PRESENTER',
        unitsCount
      });
      break;
    default:
      res.status(400).json(response(false, 'Document status not found!'));
      break;
  }
}));

router.get('/:name', aW(async (req, res) => {
  res.json({
    approved: {
      total: 40,
      current: 10
    },
    rejected: {
      total: 60,
      current: 15
    }
  })
}));

router.get('/all', aW(async (req, res) => {
  const [users, units, roles] = await Promise.all([
    User.find().populate('role', 'name'),
    Unit.find(),
    UserRole.find()
  ]);
  res.json({ users, units, roles });
}));

module.exports = router;