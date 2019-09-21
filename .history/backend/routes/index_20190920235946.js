const express = require('express');
const router = express.Router();

const User = require('../models/User');

//ALL SIGNUP/LOGIN ROUTES WILL BE HERE

//POST Signup

router.post('/signup', (req, res, next) => {
  const user = req.body;
  console.log(user);
  User.findOne(user)
    .then(foundUser => {
      console.log(foundUser);
      if (foundUser) {
        res.send('user exists');
        // res.redirect('/');
      } else {
        User.create(user);
        res.send('User Created?');
        // res.redirect('/');
      }
    })
    .catch(err => {
      next(err);
    });
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
