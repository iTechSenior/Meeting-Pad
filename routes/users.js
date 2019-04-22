const express = require('express');
const router = express.Router();
const { aW, response } = require('../helpers');
const { User } = require('../models');

// /api/users

router.get('/', aW(async (req, res) => {
  const users = await User.find({}).populate('unit', '-_id name').populate('role', '-_id name').select('id email role unit').lean().exec();
  res.status(200).json(users)
}));

module.exports = router;
