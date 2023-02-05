const express = require('express');
const { postFilter, getFilter } = require('../controllers/filter');
const { errorTest } = require('../controllers/filter');

const router = express.Router();

router.post('/filters', postFilter);
router.get('/filters', getFilter);
router.get('/error', errorTest);
module.exports = router;
