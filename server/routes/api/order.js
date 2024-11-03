const express = require('express');
const router = express.Router();

const orderValidator = require('../../middleware/orderValidator/orderValidator');
const orderController = require('../../controllers/orderController');

router.route('/:user_id')
    .post(orderValidator,orderController.AddNewOrder)
    .get(orderController.getAllOrders)

module.exports=router;

