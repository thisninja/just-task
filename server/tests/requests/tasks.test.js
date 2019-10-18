const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../src/app');
const { Task } = require('../../src/models/task.model');
const { users, tasks, populatedTasks, populatedUsers } = require('../__mocks__/dataMock');
const origin = process.env.ORIGIN || 'http://localhost:8000';

beforeEach(populatedTasks);
beforeEach(populatedUsers);

describe('POST /tasks', () => {
  it('should create a new task', (done) => {
    const text = 'Test task';
    const dueDate = 1572300000000;
    request(app)
      .post('/tasks')
      .set('x-access-token', users[0].tokens[0].token)
      .set('Origin', origin)
      .send({ text, dueDate })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Task.find({ text }).then((tasks) => {
          expect(tasks.length).toBe(1);
          expect(tasks[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create task with invalid body data', (done) => {
    request(app)
      .post('/tasks')
      .set('x-access-token', users[0].tokens[0].token)
      .set('Origin', origin)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Task.find().then((tasks) => {
          expect(tasks.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /tasks', () => {
  it('should get all tasks', (done) => {
    request(app)
      .get('/tasks')
      .set('x-access-token', users[0].tokens[0].token)
      .set('Origin', origin)
      .expect(200)
      .expect((res) => {
        expect(res.body.tasks.length).toBe(1);
      })
      .end(done);
  });
});

describe('PATCH /tasks/:id', () => {
  it('should update the task', (done) => {
    const hexId = tasks[0]._id.toHexString();
    const text = 'Updated task';

    request(app)
      .patch(`/tasks/${hexId}`)
      .set('x-access-token', users[0].tokens[0].token)
      .set('Origin', origin)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.task.text).toBe(text);
        expect(res.body.task.completed).toBe(true);
        expect(typeof res.body.task.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should not update the task created by other user', (done) => {
    const hexId = tasks[0]._id.toHexString();
    const text = 'Updated tast text';

    request(app)
      .patch(`/tasks/${hexId}`)
      .set('x-access-token', users[1].tokens[0].token)
      .set('Origin', origin)
      .send({
        completed: true,
        text
      })
      .expect(404)
      .end(done);
  });

  it('should clear completedAt when task is not completed', (done) => {
    const hexId = tasks[1]._id.toHexString();
    const text = 'This should be the new text!!';

    request(app)
      .patch(`/tasks/${hexId}`)
      .set('x-access-token', users[1].tokens[0].token)
      .set('Origin', origin)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.task.text).toBe(text);
        expect(res.body.task.completed).toBe(false);
        expect(res.body.task.completedAt).toBeFalsy();
      })
      .end(done);
  });
});

describe('DELETE /tasks/:id', () => {
  it('should remove a task', (done) => {
    const hexId = tasks[1]._id.toHexString();

    request(app)
      .delete(`/tasks/${hexId}`)
      .set('x-access-token', users[1].tokens[0].token)
      .set('Origin', origin)
      .expect(200)
      .expect((res) => {
        expect(res.body.task._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Task.findById(hexId).then((task) => {
          expect(task).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not remove a task', (done) => {
    const hexId = tasks[0]._id.toHexString();

    request(app)
      .delete(`/tasks/${hexId}`)
      .set('x-access-token', users[1].tokens[0].token)
      .set('Origin', origin)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Task.findById(hexId).then((task) => {
          expect(task).toBeTruthy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if task not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/tasks/${hexId}`)
      .set('x-access-token', users[1].tokens[0].token)
      .set('Origin', origin)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/tasks/123asdQ!')
      .set('x-access-token', users[1].tokens[0].token)
      .set('Origin', origin)
      .expect(404)
      .end(done);
  });
});

