const express = require('express');
const app = express(); // open app as express server
const PORT = process.env.PORT || 1337;
const User = require('./User');
const connection = require('./connection');

// Use connection
connection();

// establish middleware
app.use(express.json()); //allows use of json


app.post('/user', (req, res) => {
    const data = new User(req.body);
    data.save()
        .then(user => {
            console.log('user saved');
            res.json({
                success: true,
                user
            });
        })
        .catch(err => {
            console.log(err);
        });

});














// Event Listener
app.listen(PORT, () => {
    console.log(`app now listening on port ${PORT}. See http://localhost:${PORT}.`);
});
