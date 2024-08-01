const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a class schema
const classSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    time: { type: String, required: true }, // You might want to use a more specific date/time type
    cost: { type: Number, required: true },
    phase: { type: String, enum: ['morning', 'afternoon', 'evening'], required: true }, // Phase of the day
    image: { type: String }, // URL or path to the image
    imagePublicId: { type: String }, // Store Cloudinary public ID if using Cloudinary
    enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // References to users enrolled in this class
}, { timestamps: true }); // Add createdAt and updatedAt


const Class = mongoose.model('Class', classSchema); // Create a mongoose model for Class
module.exports = Class; // Export the model
