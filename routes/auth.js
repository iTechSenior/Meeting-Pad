const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../config').passport;
const { aW, response } = require('../helpers');
const { User, UserRole, Unit } = require('../models');

// /api/auth

/**
 * User login, generate JWT token
 */
router.post('/login', aW(async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(404).json(response(false, 'Email is required!'));
  if (!password) return res.status(404).json(response(false, 'Password is required!'));
  let user = await User.findOne({ email }).populate('unit', '-_id name').populate('role', '-_id name');
  if(!user) return res.status(404).json(response(false, 'User not found!'));
  const isMatch = await user.comparePasswords(password);
  if (!isMatch) return res.status(404).json(response(false, 'User not found!'));
  const whatToSign = { id: user._id };
  const token = jwt.sign(whatToSign, secret, { expiresIn: 60 * 60 * 24 }); // 1440 seconds, default session time
  return res.status(200).json({ 
    token: 'JWT ' + token, 
    role: user.role.name,
    unit: user.unit.name
  });
}));


router.post('/register', aW(async (req, res) => {
  console.log("asdfasfsadf");
  const { email, password, unit, role } = req.body;
  await User.create({ email, password, unit, role });
  res.json('OK');
}));

module.exports = router;