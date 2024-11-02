const express = require('express');
const router = express.Router();
const userValidator = require('../../middleware/usersValidator/usersValidator.js')
const userController = require('../../controllers/userController.js');
const verifyJWT = require('../../middleware/auth/verifyJWT.js');

router.route('/signup')
    .post(userValidator,userController.AddNewUser);
router.use(verifyJWT);

module.exports=router;