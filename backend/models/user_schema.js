const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// defined a user schema
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String },
    imagePublicId: { type: String }, // Store Cloudinary public ID
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    userRole: { type: String, default: 'user' }, // Define user roles
    isActive: { type: Boolean, default: true }, // To manage user activation status
    lastLogin: { type: Date },
    contactNumber: { type: String },
    address: { type: String, },
    city: { type: String, },
    state: { type: String, },
    postalcode: { type: Number },
    // Fitness-related fields
    weight: { type: Number }, // User's weight in kg
    height: { type: Number }, // User's height in cm
    age: { type: Number }, // User's age
    gender: { type: String, enum: ['male', 'female', 'other'] }, // User's gender
    goals: { type: String }, // User's fitness goals
    enrolledClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }], // References to classes the user is enrolled in
}, { timestamps: true }); // to add createdAt and updatedAt


const User = mongoose.model('User', userSchema); // creating a mongoose model
module.exports = User; //exporting the model