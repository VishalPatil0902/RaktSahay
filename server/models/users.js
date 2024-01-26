const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  profilePicture: {
    type: String,
    required: false,
  },
  sub_id: {
    type: String,
    required: false,
  },
  contact_no: {
    type: String,
    required: [true, "Contact no is Required"],
  },
  email: {
    type: String,
    required: [true, "E-mail is mandatory"],
    unique: true,
  },
  healthIssues: [{ type: String }],
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
  idCardNumber: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  isDonor: {
    type: Boolean,
    default: false,
  },
  donations: [
    {
      date: {
        type: Date,
      },
      location: {
        type: String,
        required: false,
      },
    },
  ],
  isRecipient: {
    type: Boolean,
    default: false,
  },
  receivingAt: {
    hospital: {
      type: String,
      required: [false, "Hospital email is required"],
    },
    hospitalName: {
      type: String,
      required: [false, "Hospital Name is required"],
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
