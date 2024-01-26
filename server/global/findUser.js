const Hospital = require("../models/hospital");
const BloodBank = require("../models/bloodBank");
const User = require("../models/users");



async function findUser(email) {
    var person = await User.findOne({ email }).exec();

    if (person) {
        try {
            person._doc.role = "USER";
        } catch (error) {
        }
        person = { ...person, role: 'USER' };
        return person
    }

    if (!person) {
        person = await BloodBank.findOne({ email }).exec();
    }

    if (person) {
        try {
            person._doc.role = "BLOODBANK";
        } catch (error) {
        }
        person = { ...person, role: 'BLOODBANK' };
        return person
    }

    if (!person) {
        person = await Hospital.findOne({ email }).exec();
    }

    if (person) {
        try {
            person._doc.role = "HOSPITAL";
        } catch (error) {
        }
        person = { ...person, role: 'HOSPITAL' };
        return person
    }

    return person;
}

module.exports = findUser;