const Donation = require("../models/Donation");

const createDonation = async (req, res) => {
    try {
        const { cardholderName, expirationMonth, expirationYear, amount } = req.body;

        const donation = new Donation({
            cardholderName,
            expirationMonth,
            expirationYear,
            amount
        });

        await donation.save();

        res.status(201).json({
            success: true,
            message: "Donation recorded successfully!",
            donation
        });
    } catch (error) {
        console.error("Error processing donation:", error);
        res.status(500).json({ success: false, message: "Error processing donation", error: error.message });
    }
};

const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find(); // Retrieve donations from the database
        res.status(200).json({ success: true, donations });
    } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({ success: false, message: "Error fetching donations", error: error.message });
    }
};

module.exports = { createDonation,getDonations };
