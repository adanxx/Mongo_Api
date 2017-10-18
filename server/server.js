var mongoose = require('mongoose');

//1. Import the mongoose lib with require, we set it promise- rather then using callback-function
mongoose.Promise = global.Promise;

//1.1. we connect to the mongoose database with same url-link and created our TodoApp-database
mongoose.connect('mongodb://localhost:27017/TodoApp');

//2. Create a model just like in java, with the attributes we like to store in the object and classify
// what type data or property each fields/attributes can store. 
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedApp: {
        type: Number
    }
});

//3. we test our model by instance and insert data, and with simple save-statement..we have saved the data
// into the Todo collection in our TodoApps-database 
var newTodo = new Todo({
   text: 'This is sparta',
   completed: false
});
newTodo.save().then((doc)=>{
  console.log('Save to Todos-database', doc);
}, (err)=>{
   console.log('Unable to Save ', err);
});