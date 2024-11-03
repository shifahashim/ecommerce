const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer/multer.js');
const productValidator = require('../../middleware/productValidator/productValidator.js')
const productController = require('../../controllers/productsController.js');


router.route('/admin/:admin_id')
    .post(upload.array('images',5),productValidator,productController.AddNewProduct)
    .get(productController.getAllproductsforAdmin)
router.route('/:id')
    .delete(productController.deleteProduct)
    .get(productController.getProduct)
    .patch(productController.updateProduct)
router.route('/:category_name')
    .get(productController.getProductByCategoryName)
router.route('/')
    .get(productController.getAllproducts)

module.exports = router;