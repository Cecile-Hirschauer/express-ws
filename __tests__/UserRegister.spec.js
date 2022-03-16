const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

beforeAll(() => {
  sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user6',
        email: 'user6@email.com',
        password: 'password',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('returns success message when request signup is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user6',
        email: 'user6@email.com',
        password: 'password',
      })
      .then((response) => {
        expect(response.body.message).toBe('User created');
        done();
      });
  });

  it('saves the user in the database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user6',
        email: 'user6@email.com',
        password: 'password',
      })
      .then(() => {
        User.findAll().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });

  it('saves username and email in database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user6',
        email: 'user6@email.com',
        password: 'password',
      })
      .then(() => {
        User.findAll().then((userList) => {
          const userSaved = userList[0];
          expect(userSaved.username).toBe('user6');
          expect(userSaved.email).toBe('user6@email.com');
          done();
        });
      });
  });
});
