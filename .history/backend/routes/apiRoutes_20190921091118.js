require('dotenv').config();

const express = require('Express');
const router = express.Router();

const axios = require('axios');

router.post('/api', (req, res, next) => {
  console.log('Started from the bottom');
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
