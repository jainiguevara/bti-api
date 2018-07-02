const expect = require('expect');
const request = require('supertest');
const http = require('http');

const { app } = require('./../../server/server');
const { User } = require('./../data/models/user');
const { users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);

describe('POST /user/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .post('/user/me')
      .set('x-auth', users[0].tokens[0].token)            
      .expect(200)
      .expect(res => {
        expect(res.body.user._id).toBe(users[0]._id.toHexString());
        expect(res.body.user.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .post('/user/me')
      .expect(404)
      .set('x-auth', users[0].tokens[0].token + 'hack')  
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /user', () => {
  it('should create a user', (done) => {
    const email = 'jaini-test@mail.com';
    const password = 'some password';
    request(app)
      .post('/user')
      .send({
        email,
        password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body.email).toBe(email);
        expect(res.body._id).toBeTruthy();
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({email}).then(user => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch(e => done(e));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    const email = 'jaini.test2---mail.com';
    const password = 'so';
    request(app)
      .post('/user')
      .send({
        email,
        password
      })
      .expect(400)
      .end(err => {
        if (err) {
          return done(err);
        }
        request(app)
          .post('/user')
          .send({})
          .expect(400)
          .end(done);
      });
      
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/user')
      .send({
        email: users[0].email,
        password: 'some password'
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /user/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then(user => {
          expect(user.toObject().tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch(e => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: users[1].email,
        password: users[1].password + 1
      })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then(user => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch(e => done(e));
      });
  });
});

describe('DELETE /user/me/toksen', () => {
  it('should remove auth token on logout', done => {
    request(app)
      .delete('/user/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[0]._id).then(user => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch(e => done(e));
      });
  });
});
