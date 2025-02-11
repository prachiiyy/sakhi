const Accommodation = require('../models/Accommodation');

exports.submitAccommodationRequest = async (req, res) => {
    try {
        const newRequest = new Accommodation(req.body);
        await newRequest.save();
        res.status(201).json({ message: "Accommodation request submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error submitting request" });
    }
};

exports.getAllAccommodations = async (req, res) => {
    try {
        const requests = await Accommodation.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: "Error fetching requests" });
    }
};
