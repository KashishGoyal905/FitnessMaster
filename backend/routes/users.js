const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// userSchema
const User = require('../models/user_schema');

// Clodinary File to accept images
const upload = require('../middleware/file-upload');

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

module.exports = router; //exporting the routes