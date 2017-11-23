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

    // By using the findOneAndUpdate we update the Todos doc with the specified _id and change 
    //the completed-true statement with the "$set" operator with "false". for futher information
    // Google: mongodb updated operator - Click on the link with url: the docs.mongodb.com/..
    /*/
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('59e687ea9bfc8fd1c9cf0d1e')
    }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then((result)=>{
            console.log(result);
        }, (err)=>{
            console.log('Unable to Update data');
        })
     /*/

        db.collection('Users').findOneAndUpdate({
            _id: 123
        }, {
                $inc: {
                    age: 100
                }
            }, {
                returnOriginal: false
            }).then((result)=>{
                console.log(result);
            }, (err)=>{
                console.log('Unable to Update data');
            })
    

    // db.close();

});