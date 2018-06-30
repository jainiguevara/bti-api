const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateTodos); 
beforeEach(populateUsers);

describe('POST /todo', () => {
    it('should create a new todo', (done) => {
        var text = 'Todo test';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                return expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done(); 
                }).catch((e) => done(e));
            });          
    });
});

describe('GET /todos', function()  {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body.todos.length).toBe(2);
                done();
            });
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 400 if todo not found', (done) => {
        const hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(400)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res )=> {
                if (err) {
                    return done(err);
                }
                Todo.findById(res._id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch(e => done(e));
                
            });
    });

    it('should return 400 if todo not found', (done) => {
        const hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(400)
            .end(done);
    });
    
    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/abc123')
            .expect(404)
            .end(done);
    });
});
describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        const hexId = todos[0]._id.toHexString();
        const text = `This should be the updated todo as of ${new Date().toDateString()}`;

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });
    
    it('should clear completedAt when todo is not completed', (done) => {
        const hexId = todos[1]._id.toHexString();
        const text = `This is the on-going todo as of ${new Date().toDateString}`;
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: false
            })
            .expect(res => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });

});

describe('POST /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .post('/users/me')
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
            .post('/users/me')
            .expect(404)
            .set('x-auth', users[0].tokens[0].token + 'hack')  
            .expect(res => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        const email = 'jaini-test@mail.com';
        const password = 'some password';
        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(200)
            .expect(res => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body.email).toBe(email);
                expect(res.body._id).toExist();
            })
            .end(err => {
                if (err) {
                    return done(err);
                }

                User.findOne({email}).then(user => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            });
    });

    it('should return validation errors if request invalid', (done) => {
        const email = 'jaini.test2---mail.com';
        const password = 'so';
        request(app)
            .post('/users')
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
                    .post('/users')
                    .send({})
                    .expect(400)
                    .end(done);
            });
        
    });

    it('should not create user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: 'some password'
            })
            .expect(400)
            .end(done);
    });
});
