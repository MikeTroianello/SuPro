const express = require('express');
const router = express.Router();

const User = require('../models/User');
const ensureLogin = require('connect-ensure-login');

module.exports = router;
