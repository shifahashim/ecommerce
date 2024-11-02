const express = require('express');
const loginValidator = require('../../middleware/auth/loginValidator');
const authController = require('../../controllers/auth/authController');
const handleRefreshToken = require('../../controllers/auth/refreshController.js');

const Router = express.Router();

Router.route('/login').post(loginValidator, authController.handleLogin);
Router.route('/logout').get(authController.handleLogout);
Router.route('/refresh').post(handleRefreshToken);
module.exports=Router;