const express = require("express");
const { body } = require("express-validator");
const {
  submitHelpRequest,
  getAllHelpRequests,
  getPendingHelpRequests,
  assignRequestToNgo
} = require("../controllers/helpController");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// Public: submit help
router.post("/submit", [
  body('name').optional().isString(),
  body('contactMethod').notEmpty(),
  body('contactNumber').notEmpty(),
  body('address').notEmpty(),
  body('currentSituation').notEmpty()
], submitHelpRequest);

// Admin or NGO view all (authenticate required)
router.get("/all", authenticate, authorize(['admin','ngo']), getAllHelpRequests);

// NGO view pending
router.get("/pending", authenticate, authorize('ngo'), getPendingHelpRequests);

// NGO assign/take a request
router.post("/:id/take", authenticate, authorize('ngo'), assignRequestToNgo);

module.exports = router;
