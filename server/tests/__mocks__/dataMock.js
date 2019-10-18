const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Task } = require('../../src/models/task.model');
const { User } = require('../../src/models/user.model');

const firstUserId = new ObjectID();
const secondUserId = new ObjectID();
const users = [{
  _id: firstUserId,
  email: 'test02@test.com',
  password: '123asdQ!',
  tokens: [{
    access: 'auth',
    token: jwt.sign(
      {
        _id: firstUserId,
        access: 'auth'
      }
      , process.env.SECRET
    ).toString()
  }]
}, {
  _id: secondUserId,
  email: 'test20@test.com',
  password: '123asdQ!',
  tokens: [{
    access: 'auth',
    token: jwt.sign(
    {
      _id: secondUserId,
      access: 'auth'
    }, process.env.SECRET).toString()
  }]
}];

const tasks = [{
  _id: new ObjectID(),
  text: 'Do someting 1st time',
  dueDate: 1572123600000,
  _author: firstUserId
}, {
  _id: new ObjectID(),
  text: 'Do someting 2nd time',
  completed: true,
  dueDate: 1572300000000,
  completedAt: 1570395600000,
  _author: secondUserId
}];

const populatedTasks = (done) => {
  Task.remove({}).then(() => {
    return Task.insertMany(tasks);
  }).then((arg) => {
    done();
  });
};

const populatedUsers = (done) => {
  User.remove({}).then(() => {
    const firstUser = new User(users[0]).save();
    const secondUser = new User(users[1]).save();

    return Promise.all([firstUser, secondUser])
  }).then(() => done());
};

module.exports = { tasks, populatedTasks, users, populatedUsers };
