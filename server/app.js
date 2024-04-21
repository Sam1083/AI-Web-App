const express = require("express");
const cors = require("cors");
const dalleRoutes = require("./dalle.route");

require("dotenv").config(); // Load environment variables from .env file

// Create an instance of the Express application
const app = express();

// Define the port to listen on
const PORT = 4001;

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.json({ limig: "50mb" }))
app.use(cors({
  origin: 'http://localhost:3000' // Replace with the actual origin of your frontend
}));

// Define the API route
app.use("/api/v1/dalle", dalleRoutes);


// Root route handler
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Together.Ai" });
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
