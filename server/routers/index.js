const express = require('express');
const products = require('./products');
const auth = require('./auth');
const router = express.Router();

router.use('/', products);
router.use('/', auth);

module.exports = router;
