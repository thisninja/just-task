const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', console.log.bind(console, 'Connection Succeeded'));

module.exports = { mongoose };