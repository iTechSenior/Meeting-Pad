const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { response } = require('../helpers');
const { Document } = require('../models');

module.exports = {
  isLoggedIn: (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return res.status(401).json(response(false, 'Unauthorized', err))
    if (!user) return res.status(401).json(response(false, 'Unauthorized', 'Invalid token or user not found'))
    req.login(user, { session: false }, (err) => {
      if (err) return res.status(401).json(response(false, 'Unauthorized', err))
      return next()
    })
  })(req, res, next),
  isUnit: (req, res, next) => {
    if (req.user.role.name === "Unit") return next();
    return res.status(403).json(response(false, "You don't have privileges to do that!"));
  },
  isPresenter: (req, res, next) => {
    if (req.user.role.name === "Presenter") return next();
    return res.status(403).json(response(false, "You don't have privileges to do that!"));
  },
  isOrganizer: (req, res, next) => {
    if (req.user.role.name === "Organizer") return next();
    return res.status(403).json(response(false, "You don't have privileges to do that!"));
  },
  isMyUnit: (req, res, next) => {
    if (req.user.role.name === 'Unit') {
      if (req.user.unit.name.toLowerCase() !== req.params.name) return res.status(403).json(response(false, "You don't have privileges to do that!"));
    }
    next();
  }
}