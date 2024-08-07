const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// userSchema
const User = require('../models/user_schema');
const Class = require('../models/class_schema');

// Clodinary File to accept images
const upload = require('../middleware/file-upload');
// To delete images
const cloudinary = require('cloudinary').v2;

// To hash the pass
const bcrypt = require('bcryptjs');
// JWT for token
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');



// Get User Details for the context
router.get('/me', checkAuth, async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        console.log('Backend', error);
        res.status(500).json({ message: 'Failed to retrieve the user Details', error });
    }
})

// Register | SignUp
router.post('/signup', upload.single('image'), async function (req, res) {
    const { username, email, password } = req.body;
    console.log('SignUp User Details Body: ', req.body);
    console.log('SignUp Usre File req: ', req.file);

    // Checking if all the fields exists or not
    if (!username || !email || !password || !req.file) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // extra vallidation for the password
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    let user;
    try {
        // Checking if user already exists or not
        user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // hashing the password
        let hashedPassword;
        hashedPassword = await bcrypt.hash(password, 12);

        user = new User({
            username,
            email,
            password: hashedPassword,
            image: req.file ? req.file.path : null, // Save the filename
            imagePublicId: req.file ? req.file.filename : undefined // save the unique public id
        });
        console.log('Created User', user);
        const savedUser = await user.save();

        // Creating Token
        let token;
        token = jwt.sign(
            { userId: savedUser._id, email: savedUser.email, userRole: savedUser.userRole }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }
        );
        console.log('Token for SignUp: ', token);

        // To handle the isActive and lastLogin functionality
        user.isActive = true;
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ message: 'Account created successfully', user: savedUser, token: token });
    } catch (error) {
        console.log('Backend', error);
        res.status(500).json({ message: 'Failed to Sign Up', error });
    }
});

// Login
router.post('/login', async function (req, res) {
    const { email, password } = req.body;
    // Debugging
    console.log('Login Req Body:Backend ', req.body);

    // Checking if all the fields exists or not
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let user;
    try {
        user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User Does Not Exists!' });
        }

        // Password Checking
        let isValidPas = false;
        isValidPas = await bcrypt.compare(password, user.password);
        if (!isValidPas) {
            return res.status(400).json({ message: 'Invalid Credentails' });
        }

        // Creating Token
        let token;
        token = jwt.sign(
            { userId: user._id, email: user.email, userRole: user.userRole }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }
        );

        // To handle the isActive and lastLogin functionality
        user.isActive = true;
        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({ message: 'Logged in successfully', user: user, token: token });
    } catch (error) {
        console.log('Error loggin in the user|Backend: ', error);
        return res.status(500).json({ message: 'Failed to Login', error });
    }
});

// Logout
router.post('/logout', checkAuth, async function (req, res) {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = false;
        await user.save();

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error logging out the user|Backend: ', error);
        return res.status(500).json({ message: 'Failed to Logout', error });
    }
});


// User Details Update
router.post('/update/:id', checkAuth, upload.single('image'), async function (req, res) {
    // Finding the user whose details need to be updated
    const user = await User.findById(req.params.id);

    // Debugging
    console.log('Updated User Body: ', req.body);
    console.log('Updated User File: ', req.file);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const { username, contactNumber, address, city, state, postalcode, weight, height, age, gender, goals } = req.body;

    // Checking if not a single value is sent
    if (!username && !contactNumber && !address && !city && !state && !postalcode && !weight && !height && !age && !gender && !goals && !req.file) {
        return res.status(400).json({ message: 'Please fill at least one field' });
    }

    // Update user information
    if (username) {
        user.username = username;
    }
    if (contactNumber) {
        user.contactNumber = contactNumber;
    }
    if (address) {
        user.address = address;
    }
    if (contactNumber) {
        user.contactNumber = contactNumber;
    }
    if (city) {
        user.city = city;
    }
    if (state) {
        user.state = state;
    }
    if (postalcode) {
        user.postalcode = postalcode;
    }
    if (weight) {
        user.weight = weight;
    }
    if (height) {
        user.height = height;
    }
    if (age) {
        user.age = age;
    }
    if (gender) {
        user.gender = gender;
    }
    if (goals) {
        user.goals = goals;
    }

    if (req.file) {
        // Delete previous image from Cloudinary if it exists
        if (user.imagePublicId) {
            cloudinary.uploader.destroy(user.imagePublicId, (error, result) => {
                if (error) {
                    console.log('Error in deleting previous Profile Pic from Cloudinary: ', error);
                } else {
                    console.log('Previous Profile Pic deleted successfully from Cloudinary: ', result);
                }
            });
        }

        // Update with new image information from Cloudinary
        user.image = req.file.path;
        user.imagePublicId = req.file.filename;
    }

    // Debugging
    console.log('Updated User: ', user);

    try {
        const savedUser = await user.save();
        return res.status(200).json({ message: 'User Updated Succesfully', user: savedUser });
    } catch (error) {
        return res.status(400).json({ message: 'Failed to Update the user', error });
    }
});

// Fetch enrolled classes
router.get('/enrolled-classes', checkAuth, async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId).populate('enrolledClasses');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ enrolledClasses: user.enrolledClasses });
    } catch (error) {
        console.error('Error fetching enrolled classes:', error);
        return res.status(500).json({ message: 'Server Error | Failed to fetch enrolled classes' });
    }
});


// Unenroll from the class
router.post('/Unenroll/:classId', checkAuth, async (req, res) => {
    const enrolledClassId = req.params.classId;
    const enrolledUserId = req.user.userId;

    const enrolledClass = await Class.findById(enrolledClassId);
    const enrolledUser = await User.findById(enrolledUserId);

    try {
        if (!enrolledUser || !enrolledClass) {
            return res.status(404).json({ message: 'Class or User not found' });
        }

        // Remove user from the class's enrolledUsers array
        enrolledClass.enrolledUsers = enrolledClass.enrolledUsers.filter(
            userId => !userId.equals(enrolledUserId)
        );

        // Remove class from the user's enrolledClasses array
        enrolledUser.enrolledClasses = enrolledUser.enrolledClasses.filter(
            classId => !classId.equals(enrolledClassId)
        );

        // Save the updates
        await enrolledClass.save();
        await enrolledUser.save();

        res.status(200).json({ message: 'Successfully unenrolled from the class' });

    } catch (error) {
        console.error('Failed to Uneroll from the class:', error);
        return res.status(500).json({ message: 'Server Error | Failed to Uneroll from the class' });
    }
});



//! Admin
// Get all the users
router.get('/users', checkAuth, async (req, res) => {
    const loggedUserRole = req.user.userRole;
    try {
        const users = await User.find({});
        if (loggedUserRole === 'admin') {
            res.status(200).json({ userdata: users });
        } else {
            res.status(500).json({ message: 'You are not authorized to perform this task!' });
        }

    } catch (error) {
        console.log('Backend', error);
        res.status(500).json({ message: 'Failed to retrieve the users', error });
    }
});

// Delete the user
router.delete('/delete/:userId', checkAuth, async (req, res) => {
    // Extracting id
    const userId = req.params.userId;
    // extracting id of the logged in user
    const loggedUserId = req.user.userId;

    // Debugging
    // console.log('userId of the user: ', userId);

    try {
        const user = await User.findById(userId);
        const loggedUser = await User.findById(loggedUserId);

        // Checking if User exists
        if (!user) {
            return res.status(404).json({ message: 'Failed to find the user' });
        }

        // Delete image from Cloudinary
        if (user.avatar && user.avatarPublicId) {
            cloudinary.uploader.destroy(user.avatarPublicId, (error, result) => {
                if (error) {
                    console.log('Error deleting user avatar from Cloudinary:', error);
                } else {
                    console.log('user avatar deleted from Cloudinary:', result);
                }
            });
        }

        // Checking if the user is Admin
        if (loggedUser.userRole == 'admin') {
            // Deleting the user...
            await User.findByIdAndDelete(userId);
        } else {
            return res.status(404).json({ message: 'You are not authorized to perform this task' });
        }

        return res.status(200).json({ message: 'User Deleted Successfully' });
    } catch (error) {
        console.log('Failed to delete the user|Backend', error);
        res.status(500).json({ message: 'Failed to delete the user', error });
    }
});

// Change the role of the user
router.post('/changeRole/:userId', checkAuth, async (req, res) => {
    // Extracting id of the user whose role needs to be changed
    const userId = req.params.userId;
    // extracting id of the logged in user
    const loggedUserId = req.user.userId;

    // Debugging
    // console.log('userId of the user: ', userId);

    try {
        const user = await User.findById(userId);
        const loggedUser = await User.findById(loggedUserId);

        // Checking if User exists
        if (!user) {
            return res.status(404).json({ message: 'Failed to find the user' });
        }

        if (loggedUser.userRole == 'admin') {
            // Toggle the user role
            user.userRole = user.userRole === 'admin' ? 'user' : 'admin';
            await user.save();
        } else {
            return res.status(404).json({ message: 'You are not authorized to perform this task' });
        }

        return res.status(200).json({ message: 'User Role Changed Successfully' });
    } catch (error) {
        console.log('Failed to Update the role of the user|Backend', error);
        res.status(500).json({ message: 'Failed to Update the role of the user', error });
    }
});

module.exports = router; //exporting the routes