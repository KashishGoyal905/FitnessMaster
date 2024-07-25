const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// userSchema
const User = require('../models/user_schema');

// Clodinary File to accept images
const upload = require('../middleware/file-upload');
// To delete images
const cloudinary = require('cloudinary').v2;

// To hash the pass
const bcrypt = require('bcryptjs');
// JWT for token
const jwt = require('jsonwebtoken');

// Register | SignUp
router.post('/signup', upload.single('image'), async function (req, res) {
    const { username, email, password } = req.body;
    console.log('SignUp User Details Body: ', req.body);
    console.log('SignUp Usre File req: ', req.file);

    // Checking if all the fields exists or not
    if (!username || !email || !password) {
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
            { userId: savedUser._id, email: savedUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }
        );
        console.log('Token for SignUp: ', token);

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
            { userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }
        );

        user.isActive = true;
        return res.status(200).json({ message: 'Logged in successfully', user: user, token: token });
    } catch (error) {
        console.log('Error loggin in the user|Backend: ', error);
        return res.status(500).json({ message: 'Failed to Login', error });
    }
});

// User Details Update
router.post('/update/:id', upload.single('image'), async function (req, res) {
    // Finding the user 
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

// Get all the users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users });
    } catch (error) {
        console.log('Backend', error);
        res.status(500).json({ message: 'Failed to retrieve the users', error });
    }
});

module.exports = router; //exporting the routes