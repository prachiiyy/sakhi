const express = require("express");
const { submitAccommodationRequest, getAllAccommodations } = require("../controllers/accommodationController");

const router = express.Router();

router.post("/submit", submitAccommodationRequest); // Submit a new request
router.get("/all", getAllAccommodations); // Retrieve all accommodation requests

module.exports = router;
