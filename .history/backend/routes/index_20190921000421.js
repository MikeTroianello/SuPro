const express = require('express');
const router = express.Router();

const User = require('../models/User');

//ALL SIGNUP/LOGIN ROUTES WILL BE HERE

//POST Signup

router.post('/signup', (req, res, next) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;

  const user = req.body;

  if (!username || !password) {
    res.send('missing username/password');
    // res.redirect('/')
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
  User.findOne(newUser)
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
