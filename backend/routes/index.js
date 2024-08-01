const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// Import user routes
const userRoutes = require('./users');
router.use('/user', userRoutes);

// Import Classes routes
const classesRoutes = require('./classes');
router.use('/class', classesRoutes);


module.exports = router; //exporting the routes