const express = require('express');
const router = express.Router();
const {
  submitAppointment,
  confirmAppointment,
  getAppointments,
  cancelAppointment,
} = require('../controllers/appointmentController');

router.post('/submit', submitAppointment);

module.exports = router;