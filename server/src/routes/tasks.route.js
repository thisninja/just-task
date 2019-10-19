const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { Task } = require('../models/task.model');
const { ObjectID } = require('mongodb');

const NO_TASK_FOUND_ERROR_MSG = 'No task found';

router.post('/', auth, (req, res) => {
  const task = new Task({
    text: req.body.text,
    _author: req.user._id,
    dueDate: new Date(req.body.dueDate).getTime()
  });

  task.save().then((document) => {
    res.send(document);
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

router.patch('/:id', auth, (req, res) => {
  const id = req.params.id;
  const { text, completed, dueDate } = req.body;
  const body = { text, completed, dueDate };

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (typeof body.completed === 'boolean' && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Task.findOneAndUpdate(
    { _id: id, _author: req.user._id },
    { $set: body },
    { new: true }
  ).then((task) => {
    if (!task) {
      return res.status(404).send(NO_TASK_FOUND_ERROR_MSG);
    }

    res.send({ task });
  }).catch((e) => {
    res.status(400).send(e);
  })
});

router.delete('/:id', auth, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Task.findOneAndRemove({
    _id: id,
    _author: req.user._id
  })
    .then((task) => {
      if (!task) {
        return res.status(404).send(NO_TASK_FOUND_ERROR_MSG);
      }

      res.send({ task });
    }).catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = router;
