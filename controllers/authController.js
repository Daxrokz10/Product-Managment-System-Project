const passport = require("passport");
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const transporter = require('../configs/nodemailer');

const otpStore = {}; // Temporary store for OTPs

module.exports.getLogin = (req, res) => {
  return res.render("./pages/auth/login");
};
module.exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // pass info.message to query string or flash
      return res.redirect("/auth/login?error=" + encodeURIComponent(info?.message || "Invalid credentials"));
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      // ✅ If you want email verification later:
      // if (!user.verifiedStatus) {
      //   req.flash("error", "Email not verified!");
      //   return res.redirect("/auth/login");
      // }

      return res.redirect("/");
    });
  })(req, res, next);
};

module.exports.getSignup = (req, res) => {
  return res.render("./pages/auth/signup");
};
module.exports.postSignup = async (req, res) => {
 const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      if (!existing.verified) {
        return res.redirect("/auth/signup?error=Verification already sent");
      }
      return res.redirect("/auth/signup?error=User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    otpStore[email] = otp; // Store OTP temporarily

    const user = await User.create({
      username,
      email,
      password: hashed,
      verified: false,
    });

    // ✅ Send OTP via email
    await transporter.sendMail({
      from: `"PMS Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email address",
      html: `
        <h2>Hello ${username},</h2>
        <p>Thank you for signing up!</p>
        <p>Your OTP for email verification is:</p>
        <h3>${otp}</h3>
        <p>Please enter this OTP on the verification page to activate your account.</p>
      `,
    }, (error, info) => {
      if (error) {
        console.error("Error sending email:", error.message);
        return res.render("./pages/auth/verifyNotice", { email, error: "Failed to send verification email" });
      }
      console.log("Email sent:", info.response);
      return res.render("./pages/auth/verifyNotice", { email });
    });
  } catch (error) {
    console.log(error.message);
    return res.redirect("/auth/signup?error=Something went wrong");
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (otpStore[email] && otpStore[email] === parseInt(otp)) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.redirect("/auth/verify?error=User not found");
      }

      user.verified = true;
      await user.save();

      delete otpStore[email]; // Remove OTP after successful verification

      return res.render("./pages/auth/verifySuccess");
    } else {
      return res.redirect("/auth/verify?error=Invalid OTP");
    }
  } catch (error) {
    console.log(error.message);
    return res.redirect("/auth/verify?error=Something went wrong");
  }
};

module.exports.logout = (req,res)=>{
  req.logout((err)=>{
    if(err) return next(err);
    return res.redirect('/auth/login');
  })
}