const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { auth } = require('../middleware/auth');

const ERROR_STATUS_MESSAGE = 'check your login info';

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const body = { email, password };
  const user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-access-token', token).header('expiresIn', 3600).send(user);
  }).catch((e) => {
    res.statusMessage = ERROR_STATUS_MESSAGE;
    res.status(401).end();
  })
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const body = { email, password };

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-access-token', token).header('expiresIn', 3600).send(user);
    });
  }).catch((e) => {
    res.statusMessage = ERROR_STATUS_MESSAGE;
    res.status(401).end();
  });
});

router.get('/', auth, (req, res) => {
  res.send(req.user);
});

router.delete('/token', auth, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;
