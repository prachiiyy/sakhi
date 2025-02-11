const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactMethod: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    currentSituation: { type: String, required: true },
    safetyConcerns: { type: String, required: true },
    children: { type: Number, default: 0 },
    historyOfAbuse: { type: String },
    message: { type: String },
    physicalHealth: { type: String },
    contactedBefore: { type: Boolean, default: false },
    legalAssistance: { type: Boolean, default: false },
    confidentialCounselling: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);
