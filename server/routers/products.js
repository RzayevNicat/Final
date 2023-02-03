const express = require('express');
const { postProduct, deleteProduct, getProducts } = require('../controllers/products');
const { errorTest } = require('../controllers/products');

const router = express.Router();

router.post('/products', postProduct);
router.get('/error', errorTest);
router.get('/products', getProducts);
router.delete('/products/:id', deleteProduct);
module.exports = router;
