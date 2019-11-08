const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

// require the user model !!!!
const User = require('../models/User');
const Log = require('../models/Log');

authRoutes.post('/signup', (req, res, next) => {
  console.log('THIS IS WHAT WE HAVE:', req.body.state.username);
  const username = req.body.state.username;
  const password = req.body.state.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  // if (password.length < 7) {
  //   res.status(400).json({
  //     message:
  //       'Please make your password at least 8 characters long for security purposes.'
  //   });
  //   return;
  // }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Username check went bad.' });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass
    });

    aNewUser.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: 'Saving user to database went wrong.' });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(aNewUser, err => {
        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(aNewUser);
      });
    });
  });
});

authRoutes.post('/login', (req, res, next) => {
  console.log('LOGGING IN');
  console.log(req.body);
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
      console.log('here');
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
      // res.redirect('/api/loggedin');
    });
  })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  console.log('WE ARE LOGGING OUT NOW');
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

authRoutes.get('/loggedin', (req, res, next) => {
  console.log('TESTING');
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    console.log(req.user, 'is logged in!');
    console.log('this worked....');
    req.user.createdToday = false;
    Log.find({ creatorId: req.user.id }).then(results => {
      console.log('THE LOGS', results);

      //FIX THIS LATER, THIS IS JUST A PLACEHOLDER
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff =
        now -
        start +
        (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      console.log('Day of year: ' + day);

      // day if the dayOfYear

      let a = now.toString().split(' ');
      let year = Number(a[3]);

      results.map(log => {
        if (log.dayOfYear == day && log.year == year) {
          req.user.createdToday = true;
        }
      });
    });
    console.log('CREATED A LOG TODAY?', req.user.createdToday);
    res.json(req.user);
  }
  console.log('FAILED');
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;

// module.exports = authRoutes;
