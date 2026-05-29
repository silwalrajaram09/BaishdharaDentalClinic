const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const {
  globalLimiter,
  contactLimiter,
  appointmentLimiter,
} = require("./middleware/rateLimit");
/* ROUTES */
const contactRoutes = require("./routes/contactRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();
console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING");
const app = express();

app.set("trust proxy", 1);

app.use(globalLimiter);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://baishdharadental.com",
      "https://www.baishdharadental.com",
      "https://test1.baishdharadental.com",
      "https://www.test1.baishdharadental.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactLimiter);
app.use("/api/appointments", appointmentLimiter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to BaishDhara Dental Clinic API!",
    timestamp: new Date(),
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is working!",
    timestamp: new Date(),
  });
});

app.use("/api/contact", contactRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email recipient: ${process.env.RECIPIENT_EMAIL}`);
});
