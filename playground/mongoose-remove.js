const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');


var id = '59e7ef452987c6a4236cd0b0';

// A simple proprty in ObjectId-lib that check if the passed ObjectId is valide.
if(!ObjectID.isValid(id)){
    console.log('Validator: ID is not valid');
}

/*/ Deletes the entire content or collection in Todo-database
Todo.remove({}).then((result)=>{
    console.log(result)
});
/*/ 

//FindOneIdAndRemove works in similarty to FindbyAndRemove, the difference is object-id is passed in parameter.
Todo.findOneAndRemove({_id: '59e951d0ee4792ce805243ba'}).then((result)=>{
    console.log(result);
});

Todo.findByIdAndRemove('59e951d0ee4792ce805243ba').then((result)=>{
    console.log(result)
})
