const mongoose = require('mongoose');

const bloodGroupSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    unitsAvailable: {
        type: Number,
        default: 0,
    },
});

const bloodBankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Blood Bank name is required"],
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
    bloodInventory: [bloodGroupSchema],
    
});

const BloodBank = mongoose.model('BloodBank', bloodBankSchema);

module.exports = BloodBank;
