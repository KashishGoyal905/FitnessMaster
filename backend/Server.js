require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const PORT = process.env.POR̥T || 8080;
const db = require('./config/mongoose');


app.use(express.urlencoded({ extended: true })); // helps to parse the data


//listening to the server
app.listen(PORT, function (req, res, err) {
    if (err) {
        console.log(err);
        return (err);
    } else {
        console.log(`Server Listening on Port no: ${PORT}`);
    }
});