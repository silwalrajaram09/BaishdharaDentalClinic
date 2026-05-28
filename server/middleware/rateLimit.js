const rateLimit = require("express-rate-limit");

/* GLOBAL LIMIT */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: "Too many requests, please try again later.",
});

/* CONTACT FORM LIMIT */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many contact submissions. Try again later.",
});

/* APPOINTMENT LIMIT */
const appointmentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many appointment requests. Try again later.",
});

module.exports = {
  globalLimiter,
  contactLimiter,
  appointmentLimiter,
};
