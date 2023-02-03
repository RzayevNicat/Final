const express = require('express');
const { getAllAuth, errorTest } = require('../controllers/auth');
const router = express.Router();

router.post('/auth', getAllAuth);
router.get('/error', errorTest);
module.exports = router;
