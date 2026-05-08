const { sendEmail, templates } = require('../utils/emailService');
const Contact = require('../models/Contact');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    console.log('Received contact form:', {
      name,
      email,
      phone,
    });

    // Save to database
    const contactEntry = new Contact({
      name,
      email,
      phone,
      message,
    });

    await contactEntry.save();

    console.log('Contact saved to database');

    // Generate email template once
    const notificationTemplate = templates.contactNotification({
      name,
      email,
      phone,
      message,
    });

    // Send email to clinic/admin
    const emailSent = await sendEmail(
      process.env.RECIPIENT_EMAIL,
      notificationTemplate.subject,
      notificationTemplate.html
    );

    if (!emailSent) {
      console.error('Failed to send clinic notification email');
    }

    // Optional auto-reply
    /*
    const autoReplyTemplate = templates.autoReply(
      { name },
      'contact'
    );

    await sendEmail(
      email,
      autoReplyTemplate.subject,
      autoReplyTemplate.html
    );
    */

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });

  } catch (error) {
    console.error('Contact form error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
};

// Placeholder endpoints
const getContacts = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'This endpoint is disabled in email-only mode',
    data: [],
  });
};

const markAsRead = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'This endpoint is disabled in email-only mode',
  });
};

module.exports = {
  submitContact,
  getContacts,
  markAsRead,
};