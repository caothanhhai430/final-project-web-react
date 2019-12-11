const passport = require('passport');
const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/login/facebookOauth', userController.facebookLogin);
router.post('/login/googleOauth', userController.googleLogin);

module.exports = router;