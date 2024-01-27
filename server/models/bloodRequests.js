const mongoose = require("mongoose");


const bloodRequests = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    unitsRequested: {
        type: Number,
        required: true,
    },
    requestStatus: {
        type: String,
        enum: ['Pending', 'Accepted'],
        default: 'Pending',
    },
    fullfilled: {
        type: Boolean,
        default: false
    },
    fullfilledBy: {
        type: Boolean,
        required: false
    },
    isTaken: {
        type: Boolean,
        default: false
    },
    takenBy: {
        email: {
            type: String,
            required: [false, "Email of donor is required"]
        },
        name: {
            type: String,
            required: [false, "Name of donor is required"]
        }
    }

});

const BloodBank = mongoose.model('BloodBank', bloodRequests);

module.exports = BloodBank;
