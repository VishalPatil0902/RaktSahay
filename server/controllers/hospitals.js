const Hospital = require("../models/hospital");

const findNearestHospitals = async (req, res) => {
    try {
        const { latitude, longitude } = req.body.location;

        const listOfHospitals = await Hospital.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: 10000, // 10 kilometers
                },
            },
        }).limit(10);

        return res.status(200).json({ success: true, data: listOfHospitals });
    } catch (error) {
        console.error(`${error.message} (error)`);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};


const searchHospitalByName = async (req, res) => {
    try {
        const hospitalName = req.query.name; // /search-hospital?name=AB

        if (!hospitalName) {
            return res.status(400).json({ success: false, msg: "Hospital name is required for search" });
        }

        const regex = new RegExp(hospitalName, 'i');

        const matchingHospitals = await Hospital.find({ name: regex });

        return res.status(200).json({ success: true, data: matchingHospitals });
    } catch (error) {
        console.error(`${error.message} (error)`);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

const getAllHospitals = async (req, res) => {

    try {

        const reqQuery = { ...req.query };
        if (reqQuery.hospital){
            reqQuery.hospital = deslugify(reqQuery.hospital);
        }
        const removeFields = ['select', 'sort', 'limit', 'page'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        query = Hospital.find(JSON.parse(queryStr));

        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Hospital.countDocuments(query);

        query = query.skip(startIndex).limit(limit);
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        const hospitals = await query;
        if (!hospitals) {
            return res.status(401).json({ success: false, msg: "There are no Hospitals" });
        }
        return res.status(200).json({ success: true, count: total, pagination, data: hospitals });

    } catch (error) {
        console.log(`${error.message} (error)`.red);
        return res.status(400).json({ success: false, msg: error.message });
    }

};

module.exports = {
    findNearestHospitals,
    searchHospitalByName,
    getAllHospitals
}