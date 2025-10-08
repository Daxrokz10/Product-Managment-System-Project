const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/authController');
const User = require('../models/userSchema');

authRouter.get('/login',authCtrl.getLogin);
authRouter.post('/login',authCtrl.postLogin);

authRouter.get('/signup',authCtrl.getSignup);
authRouter.post('/signup',authCtrl.postSignup);

authRouter.get('/logout',authCtrl.logout);

authRouter.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({ verifyToken: token });
    if (!user) {
      return res.send("<h2>Invalid or expired verification link.</h2>");
    }

    user.verified = true;
    user.verifyToken = null;
    await user.save();

    return res.render("./pages/auth/verifySuccess");
  } catch (err) {
    console.log(err);
    res.send("<h2>Error verifying email</h2>");
  }
});


module.exports = authRouter;
