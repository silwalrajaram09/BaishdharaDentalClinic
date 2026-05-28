require('dotenv').config();
const nodemailer = require("nodemailer");


if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("Missing EMAIL_USER or EMAIL_PASS in .env file");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
  },
});

transporter.verify((error) => {
  if (error) {
    console.error(" Email configuration error:", error.message);
  } else {
    console.log(" Email service ready");
  }
});

const templates = {
  contactNotification: (data) => ({
    subject: `New Contact Message from ${data.name}`,
    html: `
      <div style="font-family:Arial;padding:20px;max-width:600px;margin:auto">
        <h2 style="background:#0b2a4a;color:white;padding:15px;text-align:center">
          New Contact Form Submission
        </h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${data.message}</p>

        <hr/>

        <p style="font-size:12px;color:#666;text-align:center">
          Baishdhara Dental Clinic<br/>
          📞 ${process.env.CLINIC_PHONE || "N/A"}
        </p>
      </div>
    `,
  }),

  appointmentNotification: (data) => ({
    subject: `New Appointment Request - ${data.service}`,
    html: `
      <div style="font-family:Arial;padding:20px;max-width:600px;margin:auto">
        <h2 style="background:#0b2a4a;color:white;padding:15px;text-align:center">
          New Appointment Request
        </h2>

        <p><strong>Patient:</strong> ${data.fullname}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${data.time}</p>

        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}

        <hr/>

        <p><strong>Action Required:</strong> Contact patient to confirm.</p>

        <p style="font-size:12px;color:#666;text-align:center">
          Baishdhara Dental Clinic<br/>
          📞 ${process.env.CLINIC_PHONE || "N/A"}
        </p>
      </div>
    `,
  }),

  autoReply: (data, type) => ({
    subject:
      type === "contact"
        ? "We received your message"
        : "Appointment request received",

    html: `
      <div style="font-family:Arial;padding:20px;max-width:600px;margin:auto">
        <h2 style="background:#0b2a4a;color:white;padding:15px;text-align:center">
          Thank You
        </h2>

        <p>Dear ${data.fullname || "User"},</p>

        <p>
          We have received your ${
            type === "contact" ? "message" : "appointment request"
          }.
        </p>

        <p>
          Our team will respond within 24 hours.
        </p>

        <p>
          For urgent help: 📞 ${process.env.CLINIC_PHONE || "N/A"}
        </p>

        <hr/>

        <p style="font-size:12px;color:#666;text-align:center">
          Baishdhara Dental Clinic Team
        </p>
      </div>
    `,
  }),
};

const sendEmail = async (to, subject, html) => {
  try {
    if (!to || !subject || !html) {
      throw new Error("Missing email parameters");
    }

    const info = await transporter.sendMail({
      from: `"Baishdhara Dental Clinic" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(" Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error(" Email send failed:", error.message);
    return false;
  }
};

module.exports = {
  sendEmail,
  templates,
};
