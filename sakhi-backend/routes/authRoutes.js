const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login, approveNgo, getPendingNgos } = require("../controllers/authController");
const { authenticate, authorize } = require("../middleware/auth");

// Register (NGO by default)
router.post("/register", [
    body("name").notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
], register);

// Login
router.post("/login", [
    body("email").isEmail(),
    body("password").notEmpty()
], login);


const { getAllNgos } = require("../controllers/authController");

// Admin only: view all NGOs
router.get("/all-ngos", authenticate, authorize('admin'), getAllNgos);

// Admin-only: list pending NGOs
router.get("/pending-ngos", authenticate, authorize("admin"), getPendingNgos);

// Admin-only: approve NGO
router.post("/approve/:id", authenticate, authorize("admin"), approveNgo);

module.exports = router;
