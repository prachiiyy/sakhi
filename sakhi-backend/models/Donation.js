const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    cardholderName: { type: String, required: true },
    expirationMonth: { type: Number, required: true },
    expirationYear: { type: Number, required: true },
    amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Donation", DonationSchema);
