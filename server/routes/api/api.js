const express = require('express');
const router = express.Router();

const authApi = require('./auth.js');
const userApi = require('./users.js');
const categoryApi = require('./category.js');
const productApi = require('./products.js');

router.use('/auth',authApi)
router.use('/users',userApi);
router.use('/category',categoryApi);
router.use('/products',productApi);

module.exports=router;