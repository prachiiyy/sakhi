const mongoose = require("mongoose");

const AccommodationSchema = new mongoose.Schema({
name: { type: String, required: true },
    contactMethod: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    currentSituation: { type: String, required: true },
    safetyConcerns: { type: String, required: true },
    children: { type: Number, default: 0 },
    legalInformation: { type: String },
    preferredDuration: { type: String, required: true },
    languagePreferences: { type: String },
    transportationNeeds: { type: Boolean, default: false },
    consentToStoreData: { type: Boolean, required: true },
      status: { type: String, enum: ['pending','assigned','resolved'], default: 'pending' },
      assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
    }, { timestamps: true });

module.exports = mongoose.model("Accommodation", AccommodationSchema);
