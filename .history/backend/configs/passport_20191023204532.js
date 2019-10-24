const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          console.log('ERROR');
          return next(err);
        }
        if (!user) {
          console.log('USERNAME INCORRECT');
          return next(null, false, { message: 'Incorrect username' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log('PASSWORD INCORRECT');
          return next(null, false, { message: 'Incorrect password' });
        }
        console.log('Successful Login. app.js line 100');
        console.log(user);
        return next(null, user);
      });
    }
  )
);
