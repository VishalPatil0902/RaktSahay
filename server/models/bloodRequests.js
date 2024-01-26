const mongoose = require("mongoose");


const bloodRequests = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },
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
        enum: ['Pending', 'Accepted', 'Rejected'],
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
            required: [true, "Email of donor is required"]
        },
        name: {
            type: String,
            required: [true, "Name of donor is required"]
        }
    }

});

const BloodBank = mongoose.model('BloodBank', bloodRequests);

module.exports = BloodBank;
