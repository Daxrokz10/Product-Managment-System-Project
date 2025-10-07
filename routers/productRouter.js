const express = require("express");
const productRouter = express.Router();
const passport = require('passport');
const productCtrl = require('../controllers/productController.js');
const Product = require('../models/productSchema');
const upload = require('../middlewares/upload');

productRouter.get('/add',passport.userAuth,productCtrl.getAddProduct);
productRouter.post('/add', passport.userAuth, upload.single('image'), productCtrl.postAddProduct);

module.exports = productRouter;