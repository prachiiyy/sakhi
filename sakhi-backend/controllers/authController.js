const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const { name, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already registered" });
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashed, role: role || "ngo" });
        await user.save();
        res.status(201).json({ message: "Registered successfully, pending admin approval for NGOs" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during registration" });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Invalid credentials" });
        if (user.role === "ngo" && !user.isApproved) {
            return res.status(403).json({ error: "NGO not approved by admin yet" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secretkey", { expiresIn: "7d" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during login" });
    }
};

exports.approveNgo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        if (user.role !== "ngo") return res.status(400).json({ error: "User is not an NGO" });
        user.isApproved = true;
        await user.save();
        res.json({ message: "NGO approved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error approving NGO" });
    }
};

exports.getPendingNgos = async (req, res) => {
    try {
        const ngos = await User.find({ role: "ngo", isApproved: false }).select("-password");
        res.json(ngos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error fetching pending NGOs" });
    }
};

// Get all NGOs (approved + unapproved)
exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await User.find({ role: 'ngo' }).select('-password');
    res.status(200).json({ success: true, ngos });
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    res.status(500).json({ success: false, message: "Error fetching NGOs", error: error.message });
  }
};
