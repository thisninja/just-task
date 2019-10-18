const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Express configuration
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 8081);

// Mongoose configuration
mongoose.connect('mongodb://localhost:27017/project');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', (callback) => {
  console.log('Connection Succeeded');
});

// Handlers
app.get('/', (req, res) => {
  res.send({
    msg: 'up and running',
  });
});