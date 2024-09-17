const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define user schema
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String },
    imagePublicId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    userRole: { type: String, default: 'user' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    contactNumber: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalcode: { type: Number },
    
    // Fitness-related fields
    weight: { type: Number }, // User's weight in kg
    height: { type: Number }, // User's height in cm
    age: { type: Number }, // User's age
    gender: { type: String, enum: ['male', 'female', 'other'] },
    goals: { type: String },
    waistSize: { type: Number }, // Waist size in cm
    chestSize: { type: Number }, // Chest size in cm
    thighSize: { type: Number }, // Thigh size in cm
    enrolledClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    attendance: [{ date: Date, status: { type: String, enum: ['present', 'absent'] } }],
    fitnessMetrics: [{
        date: { type: Date, default: Date.now },
        waistSize: { type: Number },
        chestSize: { type: Number },
        thighSize: { type: Number },
        weight: { type: Number }, // Store daily weight
        height: { type: Number }, // Height can be stored or left static
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
