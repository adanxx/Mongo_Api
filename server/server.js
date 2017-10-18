var mongoose = require('mongoose');

//1. Import the mongoose lib with require, we set it promise- rather then using callback-function
mongoose.Promise = global.Promise;

//1.1. we connect to the mongoose database with same url-link and created our TodoApp-database
mongoose.connect('mongodb://localhost:27017/TodoApp');

//2. Create a model just like in java, with the attributes we like to store in the object and classify
// what type data or property each fields/attributes can store. 
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,  // with required: a string is not allowed to be empty
        minlength: 1,    // String length > 1
        trim: true       // trim removes withspace in the begin or end in string value
    },
    completed: {
        type: Boolean,
        default: false      // set it completed to false be default
    },
    completedApp: {
        type: String,
        default: null
    }
});

var Users = mongoose.model('User', {
    /*/
    name: {
        type: String,
        required: true,  // with required: a string is not allowed to be empty
        minlength: 1,
        trim: true 
    },
    /*/
    email: {
        type: String,
        required: true,  // with required: a string is not allowed to be empty
        minlength: 1,
        trim: true       // trim removes withspace in the begin or end in string value
    },
});



//3. we test our model by instance and insert data, and with simple save-statement..
var user1 = new Users({
  email: 'AdamJones@hotmail.com'
});

var newTodo = new Todo({
   text: 'This is sparta',
   completed: false
});

//4.we have saved the data into the Todo collection in our TodoApps-database 
user1.save().then((docs)=>{
   console.log('Saved the new User',docs );
});


/*/
newTodo.save().then((doc)=>{
  console.log('Save to Todos-database', doc);
}, (err)=>{
   console.log('Unable to Save ', err);
});

/*/
/*/-------------------------------------Insert Second Data-type with new Model newTodo2
var newTodo2 = new Todo({
    text: 'Space the final frontier',
    completed: true,
    completedApp: JSON.stringify(new Date())
   
 });

 newTodo2.save().then((doc)=>{
   console.log(JSON.stringify(doc, undefined,2 ));
 }, (err)=>{
    console.log('Unable to Save ', err);
 });

/*/



