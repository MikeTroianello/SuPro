require('dotenv').config();

const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Log = require('../models/Log');
const ensureLogin = require('connect-ensure-login');

const passport = require('passport');
const axios = require('axios');

//POST Create a Log *NOT FINISHED*
router.post('/createORIGINAL', (req, res, next) => {
  if (req.isAuthenticated()) {
    const {
      mood,
      productivity,
      journal,
      privateJournal,
      hideCreator,
      // latitude,
      // longitude,
      year,
      dayOfWeek,
      dayOfYear,
      dayOfMonth,
      month
    } = req.body.info;

    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log('LOGGING!!!! user', ip);

    let latitude;
    let longitude;

    axios
      .get(
        `http://api.ipstack.com/${ip}?access_key=${process.env.IPACCESSKEY}&format=1`
      )
      .then(data => {
        console.log(data);
        if (data.data.latitude && data.data.longitude) {
          latitude = data.data.latitude;
          longitude = data.data.longitude;
          console.log('WE DID IT', latitude, longitude);
        } else {
          console.log('FAILED', latitude, longitude);
        }
      })
      .catch(err => console.log(err));

    const getAddress = () => {
      try {
        return axios.get(
          `http://api.geonames.org/findNearestAddressJSON?lat=${latitude}&lng=${longitude}&username=${process.env.GEO_NAME}`
        );
      } catch (err) {
        // res.status(400).json(err);
        res.json(err);
        console.err(err);
      }
    };

    const getWeather = () => {
      try {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_KEY}`
        );
      } catch (err) {
        // res.status(400).json(err);
        res.json(err);
        console.error(err);
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
            code: response.data.weather[0].id,
            icon: response.data.weather[0].icon
          };
          console.log('WEATHER STUFF', weatherStuff);
          countAddress(weatherStuff);
          // res.send(response.data);
        })
        .catch(err => {
          // res.json(err);
          res.status(400).json(err);
          console.log(err);
        });
    };

    const countAddress = async weatherStuff => {
      const weatherType = weatherStuff.type;
      const weatherCode = weatherStuff.code;
      const weatherIcon = weatherStuff.icon;
      console.log('=-=-=-=-=-=-=-', weatherType, weatherCode);
      const address = getAddress()
        .then(response => {
          console.log(response.data.address.adminName2);
          console.log(response.data.address.adminName1);

          var now = new Date();

          // function dayOfYear(now) {
          //   var start = new Date(now.getFullYear(), 0, 0);
          //   var diff =
          //     now -
          //     start +
          //     (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
          //   var oneDay = 1000 * 60 * 60 * 24;
          //   var day = Math.floor(diff / oneDay);
          //   console.log('Day of year: ' + day);
          //   return day;
          // }

          let a = now.toString().split(' ');

          const log = {
            mood: mood,
            productivity: productivity,
            weatherType: weatherType,
            weatherCode: weatherCode,
            weatherIcon: weatherIcon,
            // externalFactors: externalFactors,
            journal: journal,
            privateJournal: privateJournal,
            latitude: latitude,
            longitude: longitude,
            county: response.data.address.adminName2,
            state: response.data.address.adminName1,
            // zip: zip,
            hideCreator: hideCreator,
            creatorId: req.user._id,
            dayOfWeek: dayOfWeek,
            month: month,
            dayOfMonth: dayOfMonth,
            dayOfYear: dayOfYear,
            year: year
          };

          console.log(log);

          Log.create(log)
            .then(createdLog => {
              req.user.createdToday = true;
              const infoToSendBack = { createdLog, user: req.user };

              res.json(infoToSendBack);
            })
            .catch(err => {
              res.send(err);
            });
        })
        .catch(err => {
          console.log(err);
          res.json(err);
        });
    };
    axiosWeather();
  }
});

module.exports = router;
