const express = require('express');
const router = express.Router();
const categoryValidator = require('../../middleware/categoryValidator/categoryValidator.js')
const categoryController = require('../../controllers/categoryController');

router.route('/')
    .get(categoryController.getAllCategory)
    .post(categoryValidator,categoryController.createCategory)
//router.route('/:name')
    //.delete(categoryController.deleteCategory)

module.exports = router;