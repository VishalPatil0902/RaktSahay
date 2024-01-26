const mongoose = require("mongoose");

const emergencyBloodRequests = new mongoose.Schema({

  postedBy: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  unitsRequested: {
    type: Number,
    required: true,
  },
  hospital: {
    type: String,
    required: [true, "Hospital Name is required"]
  },
  requestStatus: {
    type: String,
    enum: ["Pending", "Accepted", "Completed"],
    default: "Pending",
  },
  fullfilled: {
    type: Boolean,
    default: false,
  },
  fullfilledBy: {
    email: {
      type: String,
      required: [false, "Email of donor is required"],
    },
    name: {
      type: String,
      required: [false, "Name of donor is required"],
    },
  },
  isTaken: {
    type: Boolean,
    default: false,
  },
  takenBy: {
    email: {
      type: String,
      required: [false, "Email of donor is required"],
    },
    name: {
      type: String,
      required: [false, "Name of donor is required"],
    },
    contact_no: {
      type: String,
      required: [false, "Contact of donor is required"],
    }
  },
});

const EmergecyRequests = mongoose.model(
  "EmergecyRequests",
  emergencyBloodRequests
);

module.exports = EmergecyRequests;
