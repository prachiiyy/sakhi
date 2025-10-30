const Accommodation = require('../models/Accommodation');

exports.submitAccommodationRequest = async (req, res) => {
    try {
        // Coerce types and pick expected fields
        const {
            name, contactMethod, contactNumber, address,
            currentSituation, safetyConcerns, children, legalInformation,
            preferredDuration, languagePreferences, transportationNeeds, consentToStoreData
        } = req.body;

        // basic validation
        if (!name || !contactMethod || !contactNumber || !address || !currentSituation || !safetyConcerns || !preferredDuration) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newRequest = new Accommodation({
            name,
            contactMethod,
            contactNumber,
            address,
            currentSituation,
            safetyConcerns,
            children: children ? Number(children) : 0,
            legalInformation,
            preferredDuration,
            languagePreferences,
            transportationNeeds: Boolean(transportationNeeds),
            consentToStoreData: Boolean(consentToStoreData)
        });

        await newRequest.save();
        res.status(201).json({ message: "Accommodation request submitted successfully", request: newRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error submitting request" });
    }
};

exports.getAllAccommodations = async (req, res) => {
    try {
        const requests = await Accommodation.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching accommodation requests" });
    }
};


exports.getPendingAccommodations = async (req, res) => {
    try {
        const pending = await Accommodation.find({ status: 'pending' });
        res.status(200).json(pending);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching pending accommodations" });
    }
};

exports.assignAccommodationToNgo = async (req, res) => {
    const requestId = req.params.id;
    const ngoId = req.user && req.user._id;
    try {
        const acc = await Accommodation.findById(requestId);
        if (!acc) return res.status(404).json({ error: "Accommodation request not found" });
        if (acc.status !== 'pending') {
            return res.status(400).json({ error: "Request already assigned or resolved" });
        }
        acc.status = 'assigned';
        acc.assignedTo = ngoId;
        await acc.save();
        // return updated document (populate NGO info if needed)
        const populated = await Accommodation.findById(requestId).populate('assignedTo', 'name email');
        res.status(200).json({ message: "Accommodation assigned to NGO", request: populated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error assigning accommodation" });
    }
};
