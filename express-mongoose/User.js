// The model, where the Schema of the db is defined.

const mongoose = require('mongoose'); // Wrapper for MongoDB - It simplifies the process.

const userSchema = mongoose.Schema({
    // define attributes
    firstName: String,
    lastName: String
});


// define the name of the model, and pass in what properties the schema should have
module.exports = mongoose.model('User', userSchema);
