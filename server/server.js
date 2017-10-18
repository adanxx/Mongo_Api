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
var{mongoose} = require('./db/mongoose');

//1.2. we using the require to export our models from the modules directive
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyparser.json());

app.post('/todos', (req, res)=>{
  var todo1 = new Todo ({
      text: req.body.text
  });

  todo1.save().then((docs)=>{
    res.send(docs);
  }, (e)=>{
    res.status(400).send(e);
  });

});



app.listen(3000, ()=>{
    console.log('Server Up on Port: 3000');
})



