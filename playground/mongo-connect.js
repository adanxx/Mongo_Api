//const MongoClient = require('mongodb').MongoClient;

//The statement is the same as previous, except this allow more flexbility as your are using 
// a de-structuring instead of require-statment. with restructering it easier to use different
// require-attribute without having to rewrite the same command-line as line-1. The fallowing in

const {MongoClient, ObjectID} = require('mongodb');

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

   /*/
    // Adding  test data/row/Collection to the TodoApp database and testing with a callback funtion
    // wheter the data was insert succefully or not into the TodoApp Todos row/Collection.
    db.collection('Todos').insertOne({
        text: 'Testing The TodoApp database',
        completed: false

    }, (err, result) => {

        if (err) {
            return console.log('Unable to insert TodoApp-database: Todos Collection', err)
        }
        //ops attribute store docs that where insert ->insertOne, insert one object/document
        console.log(JSON.stringify(result.ops, undefined, 2))
    });
   /*/
   /*/
    db.collection('Users').insertOne({
        Name: 'John Doe',
        age: 25,
        Location: 'New Metropolis'

    }, (err, result2) => {
        if (err) {
            return console.log('Unable to insert TodoApp-database: User-Collectio', err)
        }
        //ops attribute allow you to pull docs that where insert ->insertOne, insert one object/document
        // Think Arrays: under the console we retriving data from Users-Collection - property: fx - Id and Name
        console.log( result2.ops[0]._id);
        console.log( result2.ops[0].Name);
        // Time-stamp function show time of doc/Collection was created
        console.log( result2.ops[0]._id.getTimestamp());
    });
   /*/


    db.close();
});