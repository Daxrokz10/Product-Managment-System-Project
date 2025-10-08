const passport = require("passport");
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const transporter = require('../configs/nodemailer');

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
    const token = uuidv4();

    const user = await User.create({
      username,
      email,
      password: hashed,
      verified: false,
      verifyToken: token,
    });

    // ✅ Send email with verification link
    const verifyLink = `${process.env.DOMAIN || req.protocol + '://' + req.get("host")}/auth/verify/${token}`;

    await transporter.sendMail({
      from: `"PMS Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email address",
      html: `
        <h2>Hello ${username},</h2>
        <p>Thank you for signing up!</p>
        <p>Please click the link below to verify your email:</p>
        <a href="${verifyLink}" style="background:#2d79f3;color:white;padding:10px 20px;text-decoration:none;border-radius:8px;">Verify Email</a>
        <p>This link will not expire.</p>
      `,
    }, (error, info) => {
      if (error) {
        console.error("Error sending email:", error.message);
        return res.redirect("/auth/signup?error=Failed to send verification email");
      }
      console.log("Email sent:", info.response);
    });

    console.log("Verification email sent to:", email);

    return res.render("./pages/auth/verifyNotice", { email });
  } catch (error) {
    console.log(error.message);
    console.log(error);
    return res.redirect("/auth/signup?error=Something went wrong");
  }
};

module.exports.logout = (req,res)=>{
  req.logout((err)=>{
    if(err) return next(err);
    return res.redirect('/auth/login');
  })
}