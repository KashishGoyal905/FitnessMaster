const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// Class Schema
const Class = require('../models/class_schema');

// Clodinary File to accept images
const upload = require('../middleware/file-upload');
// To delete images
const cloudinary = require('cloudinary').v2;

// Middleware to check the token
const checkAuth = require('../middleware/check-auth');


router.get('/', async (req, res) => {
    const { phase } = req.query;
    try {
        const classes = await Class.find({ phase });
        res.status(200).json({ classes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch classes', error });
    }
});

// Create a new class
router.post('/create', checkAuth, upload.single('image'), async (req, res) => {
    const { title, description, instructor, time, cost, phase } = req.body;

    // Debugging
    console.log('New Class Details Body: ', req.body);
    console.log('New Class File req: ', req.file);

    if (!title || !description || !instructor || !time || !cost || !phase || !req.file) {
        return res.status(400).json({ message: 'Please fill at least one field' });
    }

    let newClass;
    try {
        newClass = new Class({
            title,
            description,
            instructor,
            time,
            cost,
            phase,
            image: req.file ? req.file.path : null, // Save the filename
            imagePublicId: req.file ? req.file.filename : undefined // save the unique public id
        });
        console.log('Created Class', newClass);
        const savedClass = await newClass.save();

        res.status(200).json({ message: 'Class created successfully', class: savedClass });
    } catch (error) {
        console.log('Failed to create a new class|Backend', error);
        res.status(500).json({ message: 'Failed to Create a new Class', error });
    }
});


module.exports = router; //exporting the routes