const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        const user = await User.findById(payload.id).select("-password");
        if (!user) return res.status(401).json({ error: "User not found" });
        // if NGO, ensure approved
        if (user.role === "ngo" && !user.isApproved) {
            return res.status(403).json({ error: "NGO not approved by admin yet" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

exports.authorize = (roles = []) => {
    if (typeof roles === "string") roles = [roles];
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: "Not authenticated" });
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden: insufficient role" });
        }
        next();
    };
};
