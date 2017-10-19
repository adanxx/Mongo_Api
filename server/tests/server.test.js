const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
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
                    expect(todos.length).toBe(1);
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
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));

            });
    });

});

describe('GET /todos', () => {
    it('should get/return all data on the todos database', (done) =>{

        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    
    });
});

describe('Get : /todos/:id', ()=>{
   
    it('Should return todo/id: doc', (done)=>{

        var ids = todos[0]._id.toHexString();
        request(app)
        .get('/todos/'+ids)    // May need to change the todo.id parameter to ('todos/${todo[0].toHexString}')
        .expect(200)
        //.expect((res) => {
          //   expect(res.body.todos.text).toBe(todos[0].text);
       // })
        .end(done);               
    });
    
});