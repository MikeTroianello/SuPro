const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

// require the user model !!!!
const User = require('../models/user-model');

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      console.log('WE ARE LOGGED IN. STEP 1');
      // We are now logged in (that's why we can also send req.user)
      // res.status(200).json(theUser);
      res.redirect('/loggedin');
      // res.redirect('/api/loggedin');
    });
  })(req, res, next);
});

authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    console.log(req.user, 'is logged in!');
    console.log('this worked....');
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});
