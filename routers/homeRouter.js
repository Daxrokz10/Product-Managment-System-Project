const express = require("express");
const homeRouter = express.Router();
const passport = require('passport');
const homeCtrl = require('../controllers/homeController');
const Product = require('../models/productSchema');

homeRouter.get('/',passport.userAuth,homeCtrl.getHome);
homeRouter.get('/products',passport.userAuth,homeCtrl.getProducts);

module.exports = homeRouter;