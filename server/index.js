const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Start server ONLY after DB connects
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `📧 Email notifications will be sent to: ${process.env.RECIPIENT_EMAIL}`,
      );
      console.log(
        `🌐 CORS enabled for: http://localhost:3000, http://localhost:5173`,
      );
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5000",  // Added your backend port
      "http://127.0.0.1:5000",  // Added your backend port
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to BaishDhara Dental Clinic API!",
    timestamp: new Date(),
  });
});

// Routes
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is working!",
    timestamp: new Date(),
  });
});

app.use("/api/contact", contactRoutes);
app.use("/api/appointments", appointmentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});
