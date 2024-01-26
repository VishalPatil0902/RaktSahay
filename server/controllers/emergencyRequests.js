const EmergencyBloodRequests = require("../models/emergencyRequests");


const getAllEmergencyRequests = async (req, res) => {

    try {

        const reqQuery = { ...req.query };
        if (reqQuery.hospital){
            reqQuery.hospital = deslugify(reqQuery.hospital);
        }
        const removeFields = ['select', 'sort', 'limit', 'page'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        query = EmergencyBloodRequests.find(JSON.parse(queryStr));

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
        const total = await EmergencyBloodRequests.countDocuments(query);

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
        const emergencyRequests = await query;
        if (!emergencyRequests) {
            return res.status(401).json({ success: false, msg: "There are no Emergency Requests" });
        }
        return res.status(200).json({ success: true, count: total, pagination, data: emergencyRequests });

    } catch (error) {
        console.log(`${error.message} (error)`.red);
        return res.status(400).json({ success: false, msg: error.message });
    }

};

const postEmergencyRequest = async (req, res) => {

    try {
        var data = req.body;
        console.log(data);
        const emergencyRequest = new EmergencyBloodRequests(data);
        await emergencyRequest.save();
        return res.status(200).json({ success: true, msg: "Requested Posted SuccessFully" });
    } catch (error) {
        console.log(`${error.message} (error)`.red);
        return res.status(400).json({ success: false, msg: error.message });
    }

};

const deleteEmergencyRequest = async (req, res) => {
    try {
        const requestId = req.body._id;
        console.log(requestId)
        const deletedRequest = await EmergencyBloodRequests.findByIdAndDelete({_id: requestId});

        if (!deletedRequest) {
            return res.status(404).json({ success: false, msg: "Request not found" });
        }

        return res.status(200).json({ success: true, msg: "Request deleted successfully" });
    } catch (error) {
        console.error(`${error.message} (error)`);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};



module.exports = {
    getAllEmergencyRequests,
    postEmergencyRequest,
    deleteEmergencyRequest
}