require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

// Import routes
const helpRoutes = require("./routes/helpRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const donationRoutes = require("./routes/donationRoutes");

// Use Routes
app.use("/api/help", helpRoutes);
app.use("/api/accommodation", accommodationRoutes);
app.use("/api/donation", donationRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));