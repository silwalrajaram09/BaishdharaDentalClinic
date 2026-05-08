const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // Remove spaces from password
  },
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email service ready');
  }
});

// Email templates
const templates = {
  contactNotification: (data) => ({
    subject: `New Contact Message from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0b2a4a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0b2a4a; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div>${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div>${data.phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div>${data.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>Baishdhara Dental Clinic</p>
            <p>📞 ${process.env.CLINIC_PHONE}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  appointmentNotification: (data) => ({
    subject: `New Appointment Request - ${data.service}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0b2a4a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0b2a4a; }
          .status-pending { background: #ffc107; color: #000; padding: 5px 10px; border-radius: 5px; display: inline-block; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Appointment Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Patient Name:</div>
              <div>${data.fullname}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div>${data.phone}</div>
            </div>
            <div class="field">
              <div class="label">Service:</div>
              <div>${data.service}</div>
            </div>
            <div class="field">
              <div class="label">Preferred Date:</div>
              <div>${new Date(data.date).toLocaleDateString()}</div>
            </div>
            <div class="field">
              <div class="label">Preferred Time:</div>
              <div>${data.time}</div>
            </div>
            ${data.notes ? `
            <div class="field">
              <div class="label">Additional Notes:</div>
              <div>${data.notes}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Baishdhara Dental Clinic | 📞 ${process.env.CLINIC_PHONE}</p>
            <p><strong>Action Required:</strong> Please contact the patient to confirm this appointment.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  autoReply: (data, type) => ({
    subject: type === 'contact' ? 'We received your message - Baishdhara Dental' : 'Appointment request received - Baishdhara Dental',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0b2a4a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Contacting Us!</h2>
          </div>
          <div class="content">
            <p>Dear ${data.fullname},</p>
            <p>Thank you for reaching out to Baishdhara Dental Clinic. We have received your ${type === 'contact' ? 'message' : 'appointment request'}.</p>
            ${type === 'appointment' ? '<p>Our team will review your request and contact you within 24 hours to confirm your appointment.</p>' : '<p>Our team will get back to you within 24 hours.</p>'}
            <p>For urgent matters, please call us directly at ${process.env.CLINIC_PHONE}.</p>
            <hr/>
            <p><strong>Clinic Hours:</strong><br/>
            Monday-Friday: 9:00 AM - 6:00 PM<br/>
            Saturday: 10:00 AM - 3:00 PM<br/>
            Sunday: Closed</p>
          </div>
          <div class="footer">
            <p>Best regards,<br/>Baishdhara Dental Clinic Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// Send email function
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Baishdhara Dental Clinic" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully to:", to);

    return true;
  } catch (error) {
    console.error("Email error details:", error.message);

    return false;
  }
};

module.exports = { sendEmail, templates };

