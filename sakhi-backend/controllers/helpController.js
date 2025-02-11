const HelpRequest = require('../models/HelpRequest');

exports.submitHelpRequest = async (req, res) => {
    try {
        const newRequest = new HelpRequest(req.body);
        await newRequest.save();
        res.status(201).json({ message: "Help request submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error submitting request" });
    }
};

exports.getAllHelpRequests = async (req, res) => {
    try {
        const requests = await HelpRequest.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: "Error fetching requests" });
    }
};
