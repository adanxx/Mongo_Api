//const MongoClient = require('mongodb').MongoClient;

//The statement is the same as previous, except this allow more flexbility as your are using 
// a de-structuring instead of require-statment. with restructering it easier to use different
// require-attribute without having to rewrite the samme command-line as line-1. The fallowing in

const { MongoClient, ObjectID } = require('mongodb');

/*/
// line-7 gives you the access to 2 Mongo-library attribute. In f.eks. below: we can test ObejctID FROM the 
// MongoDb library to print object-id like MongoDB-database for testing-consol.log or application-use.

var obj = new ObjectID();
console.log(obj);

/*/

// Connecting to the Monogdb with createde database TodoApps and testing the connection
// with a callback function with the 2 fallowing statement -wheter the connection as succede or not?
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if (err) {
        return Console.log('Unable to Connect to Server: Mongo')
    }
    console.log('Connect to MongoDB Server')
    console.log();

    // The fallowing statement are used when deleting data on MongoDb-database
    // The different variation on each delete-combo is selfexplaintory: 


    /*/deleteMany - delete doc with similiar content value as set by the parameter-property.
    db.collection('Todos').deleteMany({text: 'this is sparta'}).then((result)=>{

        console.log(result);
    }, (err)=>{
        console.log('Unable to DeleteMany doc with:'+text);
    });
    /*/
    
    //deleteOne - as suggested finds and deletes the passed identifyr of the doc
    // being deleted- !Notice the then-function is not necessary..use RoboMon if 
    // if you need to further verfiy of data-deleted.
    /*/
    db.collection('Todos').deleteOne({text: 'the matrix'})
    /*/


    //findOneAndDelete - The Most secures- The FindOne-Command return the value
    // and content of deleted doc back, dobblecheck the correct data was removed.
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to DeleteOne doc with:' + text);
    });



    // db.close();

});