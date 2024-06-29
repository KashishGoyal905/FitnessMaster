require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const PORT = process.env.POR̥T || 8080;
const db = require('./config/mongoose');
// path
const path = require("path");



app.use(express.urlencoded({ extended: true })); // helps to parse the data
// CORS
app.use(express.json()); // parse the data coming from the frontend fecth
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});

// Images
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

// Routes
app.use('/', require('./routes'));

//listening to the server
app.listen(PORT, function (req, res, err) {
    if (err) {
        console.log(err);
        return (err);
    } else {
        console.log(`Server Listening on Port no: ${PORT}`);
    }
});