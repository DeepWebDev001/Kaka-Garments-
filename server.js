require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Express
app.get("/test", (req, res) => {
    res.send("Express is working!");
});

// MongoDB connection
connectDB();

// Product routes
app.use("/api/products", productRoutes);

// Main test route
app.get("/", (req, res) => {
    res.send("Kaka Garments Backend is Working!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});