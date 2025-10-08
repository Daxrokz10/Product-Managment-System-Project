const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');
const User = require('../models/userSchema');

authRouter.get('/login',authCtrl.getLogin);
authRouter.post('/login',authCtrl.postLogin);

authRouter.get('/signup',authCtrl.getSignup);
authRouter.post('/signup',authCtrl.postSignup);

authRouter.get('/logout',authCtrl.logout);

authRouter.get('/verify/:token', (req, res) => res.redirect('/auth/login')); // Removed token-based verification route

authRouter.post('/verify-otp', authCtrl.verifyOtp);

module.exports = authRouter;
