const express = require("express");
const { createDonation, getDonations } = require("../controllers/donationController");

const router = express.Router();

router.post("/create", createDonation);  // Create a donation
router.get("/all", getDonations);        // Retrieve all donations

module.exports = router;
