require('dotenv').config();

const express = require('Express');
const router = express.Router();

const axios = require('axios');

router.get('/api', (req, res, next) => {
  const getAddress = () => {
    try {
      return axios.get(
        `http://api.geonames.org/findNearestAddressJSON?lat=${req.body.latitude}&lng=${req.body.longitude}&username=${GEO_NAME}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const countAddress = async () => {
    const address = getAddress()
      .then(response => {
        if (response.data.message) {
          console.log(`Got ${Object.entries(response.data.message).length}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  getAddress();
});

module.exports = router;
