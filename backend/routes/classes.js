const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// Class Schema
const Class = require('../models/class_schema');
const User = require('../models/user_schema');

// Clodinary File to accept images
const upload = require('../middleware/file-upload');
// To delete images
const cloudinary = require('cloudinary').v2;

// Middleware to check the token
const checkAuth = require('../middleware/check-auth');

// Retrieve all the classes based on phase of the day
router.get('/', async (req, res) => {
    const { phase } = req.query;
    try {
        const classes = await Class.find({ phase });
        res.status(200).json({ classes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch classes', error });
    }
});

// Retrieve all the classes for admin dashboard
router.get('/getAllClasses', checkAuth, async (req, res) => {
    const userRole = req.user.userRole;

    if (!userRole === 'admin') {
        res.status(500).json({ message: 'You are not authorized to perform this action' });
    }
    try {
        const classes = await Class.find({});
        res.status(200).json({ classes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch classes', error });
    }
});

// Join a class
router.post('/join/:classId', checkAuth, async (req, res) => {
    // Class id: class which user is want to join
    const classId = req.params.classId;
    // User id: user who want to join the above class
    const userId = req.user.userId;

    try {
        // Finding the class
        const fitnessClass = await Class.findById(classId);
        if (!fitnessClass) {
            return res.status(404).json({ message: 'Class Not Found | Failed to join the class' });
        }
        // Finding the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found | Failed to join the class' });
        }

        // Check if the user is already enrolled in the class
        if (user.enrolledClasses.includes(classId)) {
            return res.status(400).json({ message: 'User is already enrolled in this class' });
        }

        // Check if the class already has the user enrolled
        if (fitnessClass.enrolledUsers.includes(userId)) {
            return res.status(400).json({ message: 'User is already enrolled in this class' });
        }

        // Add class to user's enrolled classes and user to class's enrolled users
        user.enrolledClasses.push(classId);
        fitnessClass.enrolledUsers.push(userId);

        // Save changes to both documents
        await user.save();
        await fitnessClass.save();

        res.status(200).json({ message: 'Class joined successfully' });
    } catch (error) {
        console.error('Error joining class:', error);
        res.status(500).json({ message: 'Server error | Failed to join the class' });
    }
});


// Create a new class from the admin dashboard
router.post('/create', checkAuth, upload.single('image'), async (req, res) => {
    const { title, description, instructor, time, cost, phase } = req.body;
    // Extracting the Logged in  userRole
    const userRole = req.user.userRole;

    // Debugging
    console.log('New Class Details Body: ', req.body);
    console.log('New Class File req: ', req.file);

    if (!title || !description || !instructor || !time || !cost || !phase || !req.file) {
        return res.status(400).json({ message: 'Please fill at least one field' });
    }

    if (!userRole === 'admin') {
        return res.status(400).json({ message: 'You are not authorized to perform this task' });
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

// Delete a class from the admin dashboard
router.delete('/:classId', checkAuth, async (req, res) => {
    const { classId } = req.params;
    const userRole = req.user.userRole;

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to delete classes' });
    }

    try {
        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete class', error });
    }
});

// Edit a class from the admin dashboard
router.post('/:classId', checkAuth, upload.single('image'), async (req, res) => {
    const { classId } = req.params;
    const { title, description, instructor, time, cost, phase } = req.body;

    try {
        const updateData = { title, description, instructor, time, cost, phase };

        if (req.file) {
            // Assuming req.file contains the uploaded file info from Cloudinary
            updateData.image = req.file.path; // URL or path to the image
            updateData.imagePublicId = req.file.filename; // Cloudinary public ID
        }

        const updatedClass = await Class.findByIdAndUpdate(classId, updateData, { new: true });

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update class', error });
    }
});

// Backend route to get enrolled users for a class from the admin dashboard
router.get('/:id/users', async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id).populate('enrolledUsers', 'username email contactNumber image userRole');
        res.status(200).json({ enrolledUsers: classData.enrolledUsers });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch enrolled users' });
    }
});


module.exports = router; //exporting the routes