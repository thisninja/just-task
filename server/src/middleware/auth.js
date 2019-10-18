const { User } = require('../models/user.model');
const REJECT_MESSAGE = 'Access denied. No token provided.';
const USER_NOT_FOUND_MSG = 'User not found.';

const auth = (req, res, next) => {
  const token = req.header('x-access-token');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(USER_NOT_FOUND_MSG);
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(REJECT_MESSAGE);
  });
};

module.exports = { auth };
