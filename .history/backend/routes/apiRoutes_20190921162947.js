require('dotenv').config();

const express = require('Express');
const router = express.Router();

const axios = require('axios');
const ensureLogin = require('connect-ensure-login');

const Log = require('../models/Log');

router.post('/weather', (req, res, next) => {
  const getWeather = () => {
    try {
      return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${process.env.WEATHER_KEY}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const axiosWeather = async () => {
    const weather = getWeather()
      .then(response => {
        console.log(response.data.weather);
        console.log(response.data.weather[0]);
        console.log(response.data.weather[0].id); //USE THIS ONE
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  axiosWeather();
});

router.post('/api', ensureLogin.ensureLoggedIn(), (req, res, next) => {
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

  const getWeather = () => {
    try {
      return axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${process.env.WEATHER_KEY}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const axiosWeather = async () => {
    const weather = getWeather()
      .then(response => {
        console.log(response.data.weather);
        console.log(response.data.weather[0]);
        console.log(response.data.weather[0].id); //USE THIS ONE
        console.log(response.data.weather[0].main); //USE THIS ONE
        const weatherStuff = {
          type: response.data.weather[0].main,
          code: response.data.weather[0].id
        };

        countAddress(weatherStuff);
        // res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const countAddress = async weatherStuff => {
    const weatherType = weatherStuff.type;
    const weatherCode = weatherStuff.code;
    console.log('=-=-=-=-=-=-=-', weatherType, weatherCode);
    const address = getAddress()
      .then(response => {
        console.log(response.data.address.adminName2);
        console.log(response.data.address.adminName1);

        const log = {
          mood: req.body.mood,
          productivity: req.body.productivity,
          weatherType: weatherStuff,
          weatherCode: weatherCode,
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

        console.log(log);

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
  axiosWeather();
});

module.exports = router;
