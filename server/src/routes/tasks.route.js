const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { Task } = require('../models/task.model');

router.post('/', auth, (req, res) => {
  const task = new Task({
    text: req.body.text,
    _author: req.user._id,
    dueDate: new Date(req.body.dueDate).getTime(),
  });

  task.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/', auth, (req, res) => {
  Task.find({
    _author: req.user._id
  }).then((tasks) => {
    res.send({ tasks });
  }, (e) => {
    res.status(400).send(e);
  });
});

module.exports = router;
