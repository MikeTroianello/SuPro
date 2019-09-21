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
  externalFactors: {
    type: String
  },
  journal: {
    type: String
    //Max length will be created on the front end
  },
  latitude: Number,
  longitude: Number,
  city: String,
  state: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },

  time: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
