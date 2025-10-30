const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
  name: String,
  contactMethod: String,
  contactNumber: String,
  address: String,
  currentSituation: String,
  safetyConcerns: String,
  children: String,
  historyOfAbuse: String,
  message: String,
  physicalHealth: String,
  contactedBefore: Boolean,
  legalAssistance: Boolean,
  confidentialCounselling: Boolean,
  status: { type: String, enum: ['pending','assigned','resolved'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('HelpRequest', helpSchema);
