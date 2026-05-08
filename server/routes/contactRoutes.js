const express = require('express');

const router = express.Router();
const {
  submitContact,
  getContacts,
  markAsRead,
} = require('../controllers/contactController');

// Make sure these functions exist in your controller
router.post('/submit', submitContact);
// router.get('/all', getContacts);
// router.put('/:id/read', markAsRead);

module.exports = router;