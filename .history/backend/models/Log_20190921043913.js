const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
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
  privateJournal: {
    type: Boolean,
    default: true
  },
  latitude: Number,
  longitude: Number,
  city: String,
  state: String,
  zip: Number,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  hideCreator: {
    type: Boolean,
    default: true
  },
  time: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
