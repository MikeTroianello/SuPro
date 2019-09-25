const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const ensureLogin = require('connect-ensure-login');

//ALL SIGNUP/LOGIN ROUTES WILL BE HERE

//GET Login Page

router.get('/login', (req, res, next) => {
  // res.send('We are at the login page');
  res.render('user/login.hbs');
});

//POST Signup

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  // const email = req.body.email;
  // const phone = req.body.phone;
  // const gender = req.body.gender;

  const user = req.body;

  if (!username || !password) {
    // res.send('missing username/password');
    res.redirect('/');
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    password: hashPass,
    email,
    phone,
    gender
  });

  console.log(newUser);

  User.findOne({ username })
    .then(foundUser => {
      console.log(foundUser);
      if (foundUser) {
        // res.send('User exists!');
        res.redirect('/');
      } else {
        User.create(newUser);
        // res.send('User Created');
        res.redirect('/');
      }
    })
    .catch(err => {
      next(err);
    });
});

//POST Login User

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res) => {
  console.log('WE DONE DID IT');
  res.send('YEET');
  // res.render('user/private-page', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  // res.send('logged oot');
  res.redirect('/login');
});

//POST Delete user

// router.post('/delete-user', (req,res,next) =>)

/* GET home page */
router.get('/', (req, res, next) => {
  // res.send('home');
  res.render('index');
});

module.exports = router;

//how to authenticate a user without logging out

// newUser.save((err) => {
//   if (err) {
//     res.render("auth-signup", { message: "Something went wrong" });
//   } else {
//     passport.authenticate('local')(req, res, function () {
//       res.redirect('/profile');
//     })
//   }
// });
