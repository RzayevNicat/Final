const express = require('express');
const products = require('./products');
const auth = require('./auth');
const filter = require('./filter');
const router = express.Router();

router.use('/', products);
router.use('/', auth);
router.use('/', filter);
module.exports = router;
