/*/0. In eksemple 1. -1.2  show 2 different way to establish connection to database with Mongoose

//1. we use to require to pull the mongoose -lib from npm dependency-lib
var mongoose = require('mongoose');

//2. Import the mongoose lib with require, we set it promise- rather then using callback-function
mongoose.Promise = global.Promise;

//3. we connect to the mongoose database with same url-link and created our TodoApp-database
mongoose.connect('mongodb://localhost:27017/TodoApp');
/*/

var express = require('express');
var bodyparser = require('body-parser');

//1.1 require the mongoose connection and string from db-directive
var { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
//1.2. we using the require to export our models from the modules directive
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();

app.use(bodyparser.json());

app.post('/todos', (req, res) => {
    var todo1 = new Todo({
        text: req.body.text
    });

    todo1.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // A simple proprty in ObjectId-lib that check if the passed ObjectId is valide.
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((docs)=>{
       if(!docs){
           res.status(404).send();
       }
       res.status(200).send({docs});

    }).catch((e)=>{
        res.status(400).send(e);
    })
    
    //succe-case - 200
    // if todo -send it back
    // if no todo - send back 404 empty body
    //failed-case -400 send empty body back



});




app.listen(3000, () => {
    console.log('Server Up on Port: 3000');
})

module.exports = { app };