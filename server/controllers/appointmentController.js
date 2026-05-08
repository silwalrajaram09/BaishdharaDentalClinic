const { sendEmail, templates } = require('../utils/emailService');
const Appointment = require("../models/Appointment");
// Submit appointment - Send email only
const submitAppointment = async (req, res) => {
  try {
    const { fullname, email, phone, service, date, time, notes } = req.body;

    // Send email to clinic
    await sendEmail(
      process.env.RECIPIENT_EMAIL,
      templates.appointmentNotification({ fullname, email, phone, service, date, time, notes }).subject,
      templates.appointmentNotification({ fullname, email, phone, service, date, time, notes }).html
    );

    // Send auto-reply to customer
    await sendEmail(
      email,
      templates.autoReply({ fullname }, 'appointment').subject,
      templates.autoReply({ fullname }, 'appointment').html
    );

    res.status(200).json({
      success: true,
      message: 'Appointment request sent successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
    });
  }
};

// Remove other functions (confirmAppointment, getAppointments, cancelAppointment)
// since you don't need them

module.exports = {
  submitAppointment,
};