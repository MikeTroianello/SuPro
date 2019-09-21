require('dotenv').config();

const express = require('Express');
const router = express.Router();

const axios = require('axios');

axios.get(`http://api.geonames.org/findNearestAddressJSON?lat=${}&lng=${}&username=${GEO_NAME}`)

module.exports = router;
