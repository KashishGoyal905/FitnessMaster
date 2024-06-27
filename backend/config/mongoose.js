const mongoose = require('mongoose'); // importing mongoose library.

require('dotenv').config(); // Load environment variables from .env file
// establishing a connection to the mongoDB database.
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yn1ynmk.mongodb.net/${process.env.DB_NAME}`);
// mongodb+srv://kashishgoyal961:nUsT0GiFBQpsUeVk@cluster0.yn1ynmk.mongodb.net/

const db = mongoose.connection; // storing a reference of the database connection


db.on('error', console.error.bind(console, 'error in connecting to the database')); // event listener for error
db.once('open', function (err) { // event listener for the open event on the database connection.
    console.log("connected to the database");
});

module.exports = db;    // exporting the database