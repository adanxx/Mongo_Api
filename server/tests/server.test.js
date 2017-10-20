const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID,
    text: 'Test: First something..'
}]

const todos2 = [{
    _id: new ObjectID,
    text: 'Test: First something..'
}, {
    _id: new ObjectID(),
    text: ' Test: Second something todo'
}]


//with beforeach statament, we remove all data from the database after each request.
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => {
        done();
    })
});

describe('POST /todos', () => {

    it('it should create new Todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1); //The Number of collection in todo-database is expect to be 1

                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });

    });

    it('Should not create todos with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)

            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    done();
                }).catch((e) => done(e));

            });
    });

});

describe('GET /todos', () => {
    it('should get/return all data on the todos database', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1); //The Number of collection in todo-database is expect to be 1
            })
            .end(done);

    });
});

describe('Get: /todos/:id', () => {

    it('Should return todo/id: doc', (done) => {

        request(app)
            .get('/todos/' + todos[0]._id.toHexString())    // May need to change the todo.id parameter to ('todos/${todo[0].toHexString}')
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });


    it(' It should return 404 if todo is not found', (done) => {

        var hexId = new ObjectID().toHexString();

        //console.log(JSON.stringify(hexId,undefined,2))

        request(app)
            .get('/todos/' + hexId)
            .expect(404)
            .end(done)
    });

    it(' It should return 404 for non-object ids', (done) => {

        request(app)
            .get('/todos/abc')
            .expect(404)
            .end(done)

    });

});

describe('Delete /todos/id', (done) => {

    it('it should remove by id', (done) => {

        var hexid = todos[0]._id.toHexString();

        request(app)
            .delete('/todos/' + hexid)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexid);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.findById(hexid).then((todos) => {
                    expect(todos).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });



    it('it should return 404 if todo is not find', (done) => {

        var hexId = new ObjectID().toHexString();

        //console.log(JSON.stringify(hexId,undefined,2))

        request(app)
            .delete('/todos/' + hexId)
            .expect(404)
            .end(done)

    });

    it('should return 404 insert id is unfound', (done) => {

        request(app)
        .delete('/todos/abc')
        .expect(404)
        .end(done)

    });




});