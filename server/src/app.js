require('./config/config');

const path = require('path');
const publicPath = path.join(__dirname, '/../');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('../db/db');

const app = express();

const usersRoutes = require('./routes/users.route');

const whitelist = ['http://localhost:8000'];
const CORS_ERR_MSG = 'Not allowed by CORS';
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(CORS_ERR_MSG))
    }
  },
  exposedHeaders: [
    'x-access-token',
    'expiresIn'
  ]
};

app.all('*', cors(corsOptions));
app.use(express.static(publicPath));
app.use(bodyParser.json());

app.use('/users', usersRoutes);

const port = process.env.PORT || 8282;
app.listen(port, () => {
  console.log(`The server listening on port ${port}`);
});

module.exports = { app };