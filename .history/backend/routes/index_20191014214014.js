const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const jwt = require('jsonwebtoken');
const ensureLogin = require('connect-ensure-login');

//ALL SIGNUP/LOGIN ROUTES WILL BE HERE

//GET Login Page

router.get('/isLoggedIn/:id', (req, res, next) => {
  console.log('IS LOGGED IN', req.params.id);
  User.findById(req.params.id).then(result => {
    console.log(`we found you, ${result.username}`);
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true,
      passReqToCallback: true
    });
    console.log('???????');
  });
});

router.get('/login', (req, res, next) => {
  console.log('failure');
  // res.send('We are at the login page');
  res.render('user/login.hbs');
});

//GET Signup page
router.get('/signup', (req, res, next) => {
  res.send('We are at the signup page');
  // res.render('user/signup.hbs');
});

//POST Signup
router.post('/signup', (req, res, next) => {
  console.log('hello', req.body);
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;

  if (username === '' || password === '' || gender === '') {
    console.log('missing username or password');
    res.json({ message: 'Username, Password, and Gender must be entered' });
    return;
  }

  User.findOne({ username })
    .then(user => {
      console.log('USER FOUND:', user);
      if (user !== null) {
        res.json({ message: 'The username already exists' });
        return;
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

      console.log('almost there', newUser);

      newUser.save(err => {
        if (err) {
          res.json({ message: err });
        } else {
          console.log('SAVED');
          passport.authenticate('local')(req, res, function() {
            console.log('complete', newUser);

            const { username, _id, gender } = newUser;
            const userToLocalStorage = { username, _id, gender };
            res.json({
              message: 'User has been created',
              user: userToLocalStorage
            });
          });
        }
      });
    })
    .catch(error => {
      next(error);
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

router.get('/profile', (req, res) => {
  console.log('YEET', req);
  res.json(req.user);
  // res.render('user/profile', { user: req.user });
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