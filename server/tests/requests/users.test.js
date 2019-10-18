const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../src/app');
const { User } = require('../../src/models/user.model');
const { users, populatedUsers, populatedTasks } = require('../__mocks__/dataMock');

const origin = process.env.ORIGIN || 'http://localhost:8000';
const password = 'donttellanyone';

beforeEach(populatedTasks);
beforeEach(populatedUsers);

describe('GET /users', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users')
      .set('x-access-token', users[0].tokens[0].token)
      .set('Origin', origin)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users')
      .set('Origin', origin)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    const email = 'test100@test.com';

    request(app)
      .post('/users')
      .set('Origin', origin)
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-access-token']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/users')
      .set('Origin', origin)
      .send({
        email: 'foo@bar',
        password,
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .set('Origin', origin)
      .send({
        email: users[0].email,
        password,
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .set('Origin', origin)
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-access-token']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-access-token']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .set('Origin', origin)
      .send({
        email: users[1].email,
        password: `${users[1].password}.`
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-access-token']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('DELETE /users/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/token')
      .set('Origin', origin)
      .set('x-access-token', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
