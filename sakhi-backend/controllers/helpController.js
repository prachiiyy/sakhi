const { validationResult } = require("express-validator");
const HelpRequest = require('../models/HelpRequest');

exports.submitHelpRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const newRequest = new HelpRequest(req.body);
        await newRequest.save();
        res.status(201).json({ message: "Help request submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error submitting request" });
    }
};

exports.getAllHelpRequests = async (req, res) => {
    try {
        const requests = await HelpRequest.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching requests" });
    }
};


exports.getPendingHelpRequests = async (req, res) => {
    try {
        const pending = await HelpRequest.find({ status: 'pending' });
        res.status(200).json(pending);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching pending requests" });
    }
};

exports.assignRequestToNgo = async (req, res) => {
    const requestId = req.params.id;
    const ngoId = req.user && req.user._id; // assuming NGO is authenticated user
    try {
        const helpReq = await HelpRequest.findById(requestId);
        if (!helpReq) return res.status(404).json({ error: "Help request not found" });
        if (helpReq.status !== 'pending') {
            return res.status(400).json({ error: "Request already assigned or resolved" });
        }
        helpReq.status = 'assigned';
        helpReq.assignedTo = ngoId;
        await helpReq.save();
        // Optionally: notify other NGOs or update logic
        res.status(200).json({ message: "Request assigned to NGO", request: helpReq });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error assigning request" });
    }
};
