const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');

authRouter.get('/login',authCtrl.getLogin);
authRouter.post('/login',authCtrl.postLogin);

authRouter.get('/signup',authCtrl.getSignup);
authRouter.post('/signup',authCtrl.postSignup);


module.exports = authRouter;
