// connects to the online db
const mongoose = require('mongoose');


// Connection URL
const databaseURL = 'mongodb+srv://Hamps:Hampspw@cluster0.sarkc.mongodb.net/myLab3HKR?retryWrites=true&w=majority';

async function main() {
    console.log('Connected to the database!'); // Connects mongoose to Atlas cloud server.

    // params mute CLI warnings
    mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });

    const mgDB = mongoose.connection;

    // on is a listener. Bind connects to <something>.
    // ... So, this states that on "connected", print the String to the console
    mgDB.on('connected', console.log.bind(console, 'MongoDb & Mongoose connected!'));
}

module.exports = main;