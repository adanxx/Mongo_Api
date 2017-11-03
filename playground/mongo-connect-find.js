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

    //In this Section we are trying to retrive our collection-data from the TodoApps-database   
    //1.With the find-command and cusor/methods that points at the TodoApp 'Todos' Collection docs
    // by using different commands to manipulet data in specific directiv/Collection
    //2. with the toArray, we retrive the data as an Array of obejct with the set attributes and propeties.
    //3.We then use a then-call to write the data to screen and a callback-function in case of error.

    db.collection('Todos').find({ completed: false }).toArray().then((docs) => {

        //.4 The find-command we show what type data we want return by passing in property
        // in the parameter. By leaving the find-empty we retrive all the data. By f.eks
        //below we testing by retriving object/collection with property:'completed set to false.


        console.log('Todos: with false-statement');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {
        console.log('unable fetch the data', err);
    });

    //In the eksemple below we are retriving the wanted object/data by using the id with ObjectDB with required attribute
    // in the MongoDB-lib 
    db.collection('Todos').find({
        _id: new ObjectID('59e648b3b9ffb0410e032f0d')    
    }).toArray().then((docs) => {

        console.log('Todos- with id: 59e648b3b9ffb0410e032f0d');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {
        console.log('unable fetch the data', err);
    });

 //In the eksemple below we are using the count-function to return the number of Collection retrived from todoApps-database. 
    db.collection('Todos').find().count().then((count) => {
        console.log('Todos Counts: '+count);
    }, (err) => {
        console.log('unable fetch the count', err);
    });


    // db.close();

});