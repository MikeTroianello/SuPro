require('dotenv').config();

const express = require('Express');
const router = express.Router();

const axios = require('axios');
const ensureLogin = require('connect-ensure-login');

const Log = require('../models/Log');

// router.post('/api', ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   console.log(req.body);
//   console.log(req.user);

//   const getAddress = () => {
//     try {
//       return axios.get(
//         `http://api.geonames.org/findNearestAddressJSON?lat=${req.body.latitude}&lng=${req.body.longitude}&username=${process.env.GEO_NAME}`
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   //EVERYTHING ABOVE IS GOOD

//   const countAddress = async () => {
//     const address = getAddress()
//       .then(response => {
//         console.log(response.data.address.adminName2);
//         console.log(response.data.address.adminName1);

//         const log = {
//           mood: req.body.mood,
//           productivity: req.body.productivity,
//           weather: req.body.weather,
//           externalFactors: req.body.externalFactors,
//           journal: req.body.journal,
//           privateJournal: req.body.privateJournal,
//           latitude: req.body.latitude,
//           longitude: req.body.longitude,
//           city: response.data.address.adminName2,
//           state: response.data.address.adminName1,
//           zip: req.body.zip,
//           hideCreator: req.body.hideCreator,
//           creatorId: req.user._id
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
// });s

module.exports = router;
