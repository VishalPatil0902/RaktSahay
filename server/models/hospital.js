const mongoose = require('mongoose');

const bloodGroupSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    stored: {
        type: Number,
        default: 0,
    },
    required: {
        type: Number,
        default: 0,
    },
});

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hospital name is required"],
    },
    email: {
        type: String,
        required: [true, "E-mail is mandatory"],
    },
    location: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    hospitalId: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    },
    currentBlood: [bloodGroupSchema],
    bloodRequirements: [bloodGroupSchema],
    completeDonations: [
        {
            donor: {
                type: String,
                required: true
            },
            receiver: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                default: Date.now
            },
            bloodGroup: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            }
        },
    ],
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
