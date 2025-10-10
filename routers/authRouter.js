const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');
const User = require('../models/userSchema');

authRouter.get('/login',authCtrl.getLogin);
authRouter.post('/login',authCtrl.postLogin);

authRouter.get('/signup',authCtrl.getSignup);
authRouter.post('/signup',authCtrl.postSignup);

authRouter.get('/logout',authCtrl.logout);


module.exports = authRouter;
