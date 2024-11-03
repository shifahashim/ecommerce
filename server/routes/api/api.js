const express = require('express');
const router = express.Router();

const orderApi = require('./order.js')
const authApi = require('./auth.js');
const userApi = require('./users.js');
const categoryApi = require('./category.js');
const productApi = require('./products.js');

router.use('/auth',authApi)
router.use('/users',userApi);
router.use('/category',categoryApi);
router.use('/products',productApi);
router.use('/orders',orderApi);

module.exports=router;