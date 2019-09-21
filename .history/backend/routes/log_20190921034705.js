const express = require('express');
const router = express.Router();

const User = require('../models/User');
const ensureLogin = require('connect-ensure-login');

router.post('/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log(req.body);
  console.log(req.user);
  const log = {
    mood: req.body.mood,
    productivity: req.body.productivity,
    weather: req.body.weather,
    externalFactors: req.body.externalFactors,
    journal: req.body.journal,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    city: req.body.city,
    creatorId: req.user._ud
  };

  Log.create(log)
    .then(createdLog => {
      resizeBy.send(createdLog);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
