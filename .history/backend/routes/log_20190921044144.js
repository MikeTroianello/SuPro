const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Log = require('../models/Log');
const ensureLogin = require('connect-ensure-login');

//POST Create a Log *NOT FINISHED*
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
    state: req.body.state,
    hideCreator: req.body.hideCreator
    creatorId: req.user._id
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
