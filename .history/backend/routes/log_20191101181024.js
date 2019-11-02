const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Log = require('../models/Log');
const ensureLogin = require('connect-ensure-login');

const passport = require('passport');
const axios = require('axios');

//POST Create a Log *NOT FINISHED*
router.post('/create', (req, res, next) => {
  // console.log(req.body);
  console.log('LOGGING!!!! user', req.user);
  if (req.isAuthenticated()) {
    const {
      mood,
      productivity,
      journal,
      privateJournal,
      hideCreator,
      latitude,
      longitude
    } = req.body.info;

    const getAddress = () => {
      try {
        return axios.get(
          `http://api.geonames.org/findNearestAddressJSON?lat=${latitude}&lng=${longitude}&username=${process.env.GEO_NAME}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    const getWeather = () => {
      try {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_KEY}`
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
            code: response.data.weather[0].id,
            icon: response.data.weather[0].icon
          };
          console.log('WEATHER STUFF', weatherStuff);
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
      const weatherIcon = weatherStuff.icon;
      console.log('=-=-=-=-=-=-=-', weatherType, weatherCode);
      const address = getAddress()
        .then(response => {
          console.log(response.data.address.adminName2);
          console.log(response.data.address.adminName1);

          var now = new Date();

          function dayOfYear(now) {
            var start = new Date(now.getFullYear(), 0, 0);
            var diff =
              now -
              start +
              (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
            var oneDay = 1000 * 60 * 60 * 24;
            var day = Math.floor(diff / oneDay);
            console.log('Day of year: ' + day);
            return day;
          }

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
            dayOfWeek: a[0],
            month: a[1],
            dayOfMonth: Number(a[2]),
            dayOfYear: dayOfYear(now),
            year: Number(a[3])
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
  }
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

// GET See all logs from logged in User
router.get('/all/my-posts', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log(req.user);
  console.log(req.user._id);
  Log.find({ creatorId: req.user._id })
    .then(userLogs => {
      console.log(userLogs);
      // const reducer = (accumulator, currentValue) => accumulator + currentValue;
      // const moodAvg = [];
      // userLogs.map(log => {
      //   moodAvg.push(log.mood);
      // });
      // let mood =
      //   Math.round(100 * (moodAvg.reduce(reducer) / moodAvg.length)) / 100;
      // console.log('MOOD', mood);
      // const profile = { userLogs, mood };
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
router.get('/region/:county', (req, res, next) => {
  console.log(req.params.county);
  Log.find({ county: req.params.county })
    .then(countyLogs => {
      console.log(countyLogs);
      res.send(countyLogs);
    })
    .catch(err => {
      next(err);
    });
});

//GET See all posts from a certain date
router.get('/date/:year/:day', (req, res, next) => {
  console.log('dayOfYear', req.params.day);
  console.log('year', req.params.day);

  Log.find({ dayOfYear: req.params.day })
    .then(dayLogs => {
      // console.log('THESE ARE THE DAY LOGS: ', dayLogs);
      let specificDay = dayLogs.filter(log => {
        // if (log.privateJournal && req.user.id != log.creatorId) {
        //   log.journal = 'This log is set to private';
        // }
        if (req.user.id == log.creatorId) {
          log.yours = true;
          if (log.privateJournal) {
            log.madePrivate = true;
          }
        } else if (log.privateJournal) {
          log.journal = 'This log is set to private';
        }
        console.log('log', log);
        return log.year == req.params.year;
      });
      console.log('THIS IS THE CORRECT YEAR', specificDay);
      res.json(specificDay);
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
      res.sendStatus(foundLog);
    })
    .catch(err => {
      next(err);
    });
});

//GET see time of log

//GET create log
router.get('/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('logs/create');
});

//POST create log
// router.post('/create', (req, res, next) => {
//   const {
//     mood,
//     productivity,
//     journal,
//     privateJournal,
//     hideCreator,
//     latitude,
//     longitude
//   } = req.body.info;
//   console.log('BODY', req.body);

//   const getAddress = () => {
//     try {
//       return axios.get(
//         `http://api.geonames.org/findNearestAddressJSON?lat=${latitude}&lng=${longitude}&username=${process.env.GEO_NAME}`
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const countAddress = async () => {
//     const address = getAddress()
//       .then(response => {
//         console.log('ADDRESS', response.data);
//         // console.log(response.data.address.adminName2);
//         // console.log(response.data.address.adminName1);

//         var now = new Date();

//         function dayOfYear(now) {
//           var start = new Date(now.getFullYear(), 0, 0);
//           var diff =
//             now -
//             start +
//             (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
//           var oneDay = 1000 * 60 * 60 * 24;
//           var day = Math.floor(diff / oneDay);
//           console.log('Day of year: ' + day);
//           return day;
//         }

//         let a = now.toString().split(' ');

//         const log = {
//           mood: mood,
//           productivity: productivity,
//           // weather: weather,
//           // externalFactors: externalFactors,
//           journal: journal,
//           privateJournal: privateJournal,
//           latitude: latitude,
//           longitude: longitude,
//           county: response.data.address.adminName2,
//           state: response.data.address.adminName1,
//           // zip: zip,
//           hideCreator: hideCreator,
//           // creatorId: req.user._id,
//           dayOfWeek: a[0],
//           month: a[1],
//           dayOfMonth: Number(a[2]),
//           dayOfYear: dayOfYear(now),
//           year: Number(a[3])
//         };

//         Log.create(log)
//           .then(createdLog => {
//             res.send(createdLog);
//           })
//           .catch(err => {
//             res.send(err);
//           });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
//   countAddress();
// });

module.exports = router;

//Use PATCH to change Boolean values
