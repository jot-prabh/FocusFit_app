const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Payment Route
app.post("/pay", (req, res) => {

    const { name, email, phone, amount } = req.body;

    console.log("Payment Details Received:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Amount:", amount);

    // Temporary response
    res.json({
        status: "success",
        message: "Payment request received."
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});