const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer/multer.js');
const productValidator = require('../../middleware/productValidator/productValidator.js')
const productController = require('../../controllers/productsController.js');

router.route('/')
    .get(productController.getAllproducts)
    .post(upload.array('images',5),productValidator,productController.AddNewProduct);
router.route('/:id')
    .delete(productController.deleteProduct)
    .get(productController.getProduct)
router.route('/:category_id')
    .get(productController.getProductByName)

module.exports = router;