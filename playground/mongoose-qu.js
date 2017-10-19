const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

/*/
var id = '59e7ef452987c6a4236cd0b011';

if(!ObjectID.isValid(id)){
    console.log('Validator: ID is not valid');
}
/*/

/*/
Todo.find({
    _id: id
}).then((docs)=>{
    console.log('Todos:',docs);
});


Todo.findOne({
    _id: id
}).then((docs)=>{
    console.log('Todo:',docs);
});
/*/
Todo.findById(id).then((docs)=>{
  
    if(!docs){
        return console.log('Unable to execute FindById');
    }
    console.log('Todo By Id:',docs);
}).catch((e)=>{
    console.log('Error in Id', e);
})

