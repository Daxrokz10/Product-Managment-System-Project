const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "No user found" });
          }

          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  passport.userAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.verified) {
      res.locals.user = req.user;
      res.locals.session = req.session;
      return next();
    }
    if (req.isAuthenticated() && !req.user.verified) {
      return res.render("./pages/auth/verifyNotice", { email: req.user.email });
    }
    return res.redirect("/auth/login");
  };
}


module.exports = initialize;
