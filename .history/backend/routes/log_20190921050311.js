import { log } from 'handlebars';

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
    privateJournal: req.body.privateJournal,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    hideCreator: req.body.hideCreator,
    creatorId: req.user._id
  };

  Log.create(log)
    .then(createdLog => {
      res.send(createdLog);
    })
    .catch(err => {
      res.send(err);
    });
});

// GET See all logs from everyone
router.get('/all/everyone', (req, res, nex) => {
  Log.find()
    .then(allLogs => {
      res.send(allLogs);
    })
    .catch(err => {
      next(err);
    });
});

// GET See all logs from user
router.get('/all/my-posts', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Log.find({ id: req.user._id })
    .then(userLogs => {
      console.log(userLogs);
      res.send({ userLogs });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
