const passport = require('passport');
const { ExtractJwt: ExtractJWT, Strategy: JWTStrategy } = require('passport-jwt');
const { User } = require('../models');
const config = require('../config');

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.passport.secret
}, async (jwtPayload, cb) => {
  try {
    const user = await User.findOne({ _id: jwtPayload.id }).populate('unit', '_id name').populate('role', '_id name').select('email role unit').exec();
    if (!user) return cb(null, false);
    return cb(null, user);
  } catch (err) {
    console.error('ERROR IZ JWT STRATEGIJE', err)
    return cb(err, false);
  }
}));