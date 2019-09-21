const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Log = require('../models/Log');
const ensureLogin = require('connect-ensure-login');

const axios = require('axios');

//POST Create a Log *NOT FINISHED*
router.post('/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log(req.body);
  console.log(req.user);

  const getAddress = () => {
    try {
      return axios.get(
        `http://api.geonames.org/findNearestAddressJSON?lat=${req.body.latitude}&lng=${req.body.longitude}&username=${process.env.GEO_NAME}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const countAddress = async () => {
    const address = getAddress()
      .then(response => {
        console.log(response.data.address.adminName2);
        console.log(response.data.address.adminName1);

        const log = {
          mood: req.body.mood,
          productivity: req.body.productivity,
          weather: req.body.weather,
          externalFactors: req.body.externalFactors,
          journal: req.body.journal,
          privateJournal: req.body.privateJournal,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          city: response.data.address.adminName2,
          state: response.data.address.adminName1,
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
      })
      .catch(error => {
        console.log(error);
      });
  };
  countAddress();
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

// GET See all logs from logged in Useruser
router.get('/all/my-posts', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log(req.user);
  console.log(req.user._id);
  Log.find({ creatorId: req.user._id })
    .then(userLogs => {
      console.log(userLogs);
      res.send(userLogs);
    })
    .catch(err => {
      next(err);
    });
});

// GET See all logs from one user
router.get('/all/:id', (req, res, next) => {
  Log.find({ creatorId: req.params.id })
    .then(userLogs => {
      console.log(userLogs);
      res.send(userLogs);
    })
    .catch(err => {
      next(err);
    });
});

//GET See all posts from one area
router.get('/region/:city', (req, res, next) => {
  Log.find({ city: req.params.id })
    .then(cityLogs => {
      console.log(userLogs);
      res.send(userLogs);
    })
    .catch(err => {
      next(err);
    });
});

// GET see individual log
//Come back to this later and make this have some properties if the user clicks their own post
router.get('/view/:logId', (req, res, next) => {
  console.log(req.params.logId);

  Log.findById(req.params.logId)
    .then(foundLog => {
      console.log(foundLog);
      res.send(foundLog);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

//Use PATCH to change Boolean values
