/*/0. In eksemple 1. -1.2  show 2 different way to establish connection to database with Mongoose

//1. we use to require to pull the mongoose -lib from npm dependency-lib
var mongoose = require('mongoose');

//2. Import the mongoose lib with require, we set it promise- rather then using callback-function
mongoose.Promise = global.Promise;

//3. we connect to the mongoose database with same url-link and created our TodoApp-database
mongoose.connect('mongodb://localhost:27017/TodoApp');
/*/

const express = require('express');
const bodyparser = require('body-parser');
const lodash = require('lodash');
const underscore = require('underscore'); //Not used- provides similiar depencies as lodash

//1.1 require from the mongoose connection and string from db-directive
var {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
//1.2. we are using the require to export our models from the modules directive
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();

app.use(bodyparser.json());

// A simpe post.request that recives collection-doc from postman
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

//A get-request that send the collection of Todo.database collaction back to postman request.
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // A simple proprtiy in ObjectId-lib that check if the passed ObjectId is valide.
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.status(200).send({ todo });

    }).catch((e) => {
        res.status(400).send(e);
    });

});
// Delete api function - more reference/idees look up -> mongoose-remove-js
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    // A simple proprty in ObjectId-lib that check if the passed ObjectId is valide.
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.status(200).send({ todo });

    }).catch((e) => {
        res.status(400).send(e);
    });
})
// update api collection data in Todo-database 
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // The 'lodash-lib' allows us to update request data-stored in the body
    // we then use the 'pick-metod' and pass on the body of request-data.. 
    //finally we pullout the wanted data to update "if the data exsist!!"
    //With 'pick' we also restrict the type of data we want the user to update:
    var body = lodash.pick(req.body, ['text', 'completed']);

    // A simple proprty in ObjectId-lib that check if the passed ObjectId is valide.
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // We updated body.property depanding on the boolean-state and then updated.
    if (lodash.isBoolean(body.completed) && body.completed) {
        body.completedApp = new Date().getTime();  // !! remove toString() if cause for errors
    } else {
        body.completed = false
        body.completedApp = null;
    }
    //Lastly we update our Todo-database - which is selfexplaintory - review mongoose-update.js for 
    //further information - Link : mongoosejs.com
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});

    }).catch((e) => {
        res.status(400).send(e);
    });


});

app.listen(3000, () => {
    console.log('Server Up on Port: 3000');
})

module.exports = { app };