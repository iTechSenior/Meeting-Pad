var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/dashboard', require('./dashboard'));
router.use('/documents', require('./documents'));
router.use('/meetings', require('./meetings'));
router.use('/polls', require('./polls'));
router.use('/units', require('./units'));
router.use('/users', require('./users'));

module.exports = router;