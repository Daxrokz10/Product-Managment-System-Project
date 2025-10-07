const express = require('express');
const router = express.Router();
const homeRouter = require('./homeRouter');
const productRouter = require('./productRouter');
const authRouter = require('./authRouter');
// const userRouter = require('./userRouter');

router.use('/',homeRouter);
router.use('/auth',authRouter);
router.use('/product',productRouter); 
// router.use('/user',userRouter);

module.exports = router;