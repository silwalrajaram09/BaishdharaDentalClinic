const express = require('express');
const router = express.Router();
const {
  submitAppointment,
  confirmAppointment,
  getAppointments,
  cancelAppointment,
} = require('../controllers/appointmentController');

router.post('/submit', submitAppointment);
// router.put('/:id/confirm', confirmAppointment);
// router.put('/:id/cancel', cancelAppointment);
// router.get('/all', getAppointments);

module.exports = router;