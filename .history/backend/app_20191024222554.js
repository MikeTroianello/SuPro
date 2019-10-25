require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

// const flash = require('connect-flash');
// const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');

require('./configs/passport');

// require('./configs/passport');

mongoose
  .connect('mongodb://localhost/SuPro', { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//Session

app.use(
  session({
    secret: 'our-passport-local-strategy-app',
    resave: true,
    saveUninitialized: true
  })
);

// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

//CORS
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, origin && origin.startsWith('http://localhost:'));
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);

const index = require('./routes/index');
app.use('/', index);

const log = require('./routes/log');
app.use('/log', log);

const apiRoutes = require('./routes/apiRoutes');
app.use('/apiRoutes', apiRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);
// app.use('/api', authRoutes);

module.exports = app;
