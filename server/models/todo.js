//1. requiring the mongoose-lib and connect to MongoDB database:
var mongoose = require('mongoose');

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

module.exports = {Todo};


/*/3. we test our model by instance and insert data, and with simple save-statement..
  var newTodo = new Todo({
     text: 'This is sparta',
     completed: false
  });
//4.we have saved the data into the Todo collection in our TodoApps-database 
  newTodo.save().then((doc)=>{
    console.log('Save to Todos-database', doc);
  }, (err)=>{
     console.log('Unable to Save ', err);
  });
/*/