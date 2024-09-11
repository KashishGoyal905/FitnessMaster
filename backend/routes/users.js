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

// password reset
const nodemailer = require('nodemailer');
const crypto = require('crypto');



// Get User Details for the context --Done
router.get('/me', checkAuth, async (req, res) => {
    // Extracting form the checkAuth middleware
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

// Logout -- Done
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


// Attendance
router.post('/mark-attendance/:userId', checkAuth, async (req, res) => {
    const { userId } = req.params;
    const { date, status } = req.body;

    try {
        const user = await User.findById(userId);

        // Check if attendance for today is already marked
        const existingAttendance = user.attendance.find(att => new Date(att.date).toDateString() === new Date(date).toDateString());

        if (!existingAttendance) {
            user.attendance.push({ date, status });
        } else {
            return res.status(400).json({ message: 'Attendance for today is already marked' });
        }

        await user.save();
        return res.status(200).json({ date, status });
    } catch (err) {
        return res.status(500).json({ message: 'Error marking attendance' });
    }
});

router.get('/attendance/:userId', checkAuth, async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const attendance = user.attendance;

        // const startDate = new Date(user.createdAt);
        // const today = new Date();
        // today.setHours(0, 0, 0, 0); // Reset time to 00:00 to match the comparison in the loop.
        // for (let d = new Date(startDate); d < today; d.setDate(d.getDate() + 1)) {
        //     const existingAttendance = attendance.find(att => new Date(att.date).toDateString() === d.toDateString());
        //     if (!existingAttendance) {
        //         attendance.push({ date: new Date(d), status: 'absent' });
        //     }
        // }
        // await user.save();

        res.status(200).json({ attendance });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching attendance' });
    }
});

//* NodeMailer || Forgot Password
router.post('/forgot-password', async (req, res) => {
    // Extracting email from the body
    const { email } = req.body;
    // Debugging
    console.log('Body of Update Password: ', req.body);

    try {
        const user = await User.findOne({ email: email });

        // checking if user exists or not
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Generate a random token for reset
        const token = crypto.randomBytes(32).toString('hex');

        // Set token and expiration on the user
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // email service
            auth: {
                user: 'resetpass905@gmail.com', // email service id
                pass: process.env.NODEMAILER_EMAIL_PASSWORD, // email service Password(App Password)
            },
            host: 'smtp.gmail.com',
            secure: false
        });

        const mailOptions = {
            to: user.email,
            from: 'resetpass905@gmail.com',
            subject: 'Password Reset',
            text: ` Hello ${user.username},

            We received a request to reset the password for your account.
            
            To reset your password, please click the link below or copy and paste it into your browser:
            ${process.env.REACT_APP_FRONTEND_URL}/reset-password/${token}
            
            If you did not request a password reset, please ignore this email or contact support if you have any questions.
            
            Thank you,
            The Fitness Master Team
            
            For support, contact us at supportService@gmail.com`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Error sending email: ', err);
                return res.status(500).send({ message: 'Error sending email' });
            }
            return res.status(200).send({ message: 'Password reset email sent' });
        });

    } catch (err) {
        console.error('Error processing request: ', err);
        return res.status(500).send({ message: 'Error processing request' });
    }
});

//* UPDATE || Forgot the password
router.post('/reset-password/:token', async (req, res) => {
    // Extracting token and password from URL and the body
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Finding the user with the help of token if the time has not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        // if time expired or user not found
        if (!user) {
            return res.status(400).send({ message: 'Password reset token is invalid or has expired' });
        }

        // Update the user's password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).send({ message: 'Password has been reset' });
    } catch (err) {
        console.error('Error resetting password: ', err);
        return res.status(400).send({ message: 'Error resetting password' });
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

// Get specific user Details
router.get('/:userId', checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('attendance')
            .populate('enrolledClasses', 'title'); // Populate enrolledClasses with the title field

        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
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