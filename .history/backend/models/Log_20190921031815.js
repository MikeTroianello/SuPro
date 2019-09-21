const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = newSchema({
  mood: {
    type: Number,
    min: 1,
    max: 5
  },
  productivity: {
    type: Number,
    min: 1,
    max: 5
  },
  weather: {
    type: String
  },
  location: {},
  externalFactors: {},
  journal: {
    type: String,
    max
  },
  lat: String,
  lon: String,
  city: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },

  time: { type: Date, default: Date.now }
});

module.exports = router;
