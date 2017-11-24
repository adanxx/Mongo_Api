
//1. requiring the mongoose-lib and connect to MongoDB database:
var mongoose = require('mongoose');


//2. New model called User with email property and validors. this creates a new table called Users in TodoApp-database
var User= mongoose.model('User', {
    
    name: {
        type: String,
        required: true,  // with required: a string is not allowed to be empty
        minlength: 1,
        trim: true 
    },
    
    email: {
        type: String,
        required: true,  // with required: a string is not allowed to be empty
        minlength: 1,
        trim: true       // trim removes withspace in the begin or end in string value
    },
});

/*/
//3. we test our model by instance and insert data, and with simple save-statement..
var user1 = new User({
    email: 'AdamJones@hotmail.com'
  });
  
  
  //4.we have saved the data into the Todo collection in our TodoApps-database 
  user1.save().then((docs)=>{
     console.log('Saved the new User',docs );
  });
  
 /*/

//the module.export statement allows us to export the model-user to other directive in application
module.exports = {User};

