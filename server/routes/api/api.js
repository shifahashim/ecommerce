const express = require('express');
const router = express.Router();

const categoryApi = require('./category.js');
const productApi = require('./products.js');

router.use('/category',categoryApi);
router.use('/products',productApi);

module.exports=router;