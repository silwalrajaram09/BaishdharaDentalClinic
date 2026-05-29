require("dotenv").config();
const nodemailer = require("nodemailer");

// ─── Env Validation ───────────────────────────────────────────────────────────
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env file");
  process.exit(1);
}

// ─── Transporter ─────────────────────────────────────────────────────────────
const createTransporter = () => {
  if (process.env.EMAIL_HOST) {
    console.log("📧 Using cPanel email configuration");
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 465,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });
  }
  console.log("📧 Using Gmail configuration (not recommended for production)");
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const transporter = createTransporter();

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email configuration error:", error.message);
  } else {
    console.log(
      "✅ Email service ready — Using:",
      process.env.EMAIL_HOST || "Gmail",
    );
  }
});

// ─── Shared Layout ────────────────────────────────────────────────────────────
const CLINIC_NAME = "Baishdhara Dental Clinic";
const CLINIC_PHONE = process.env.CLINIC_PHONE || "N/A";
const BRAND_COLOR = "#0b2a4a";
const ACCENT_COLOR = "#2e7fc1";

const emailWrapper = (bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${CLINIC_NAME}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:${BRAND_COLOR};padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#7ec8f4;font-weight:600;">
                Dental Care
              </p>
              <h1 style="margin:6px 0 0;font-size:26px;color:#ffffff;font-weight:700;letter-spacing:0.5px;">
                ${CLINIC_NAME}
              </h1>
              <div style="margin:14px auto 0;width:40px;height:3px;background:${ACCENT_COLOR};border-radius:2px;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#e8edf3;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;background:#f9fbfd;">
              <p style="margin:0 0 6px;font-size:13px;color:#6b7280;font-weight:600;">${CLINIC_NAME}</p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                📞 ${CLINIC_PHONE}
              </p>
              <p style="margin:10px 0 0;font-size:11px;color:#c0c7d0;">
                This is an automated email. Please do not reply directly to this message.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

const infoRow = (label, value) =>
  value
    ? `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f4f8;vertical-align:top;">
      <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;">${label}</span><br/>
      <span style="font-size:15px;color:#1f2937;margin-top:3px;display:inline-block;">${value}</span>
    </td>
  </tr>`
    : "";


const sectionHeading = (text) => `
  <h2 style="margin:0 0 24px;font-size:20px;color:${BRAND_COLOR};font-weight:700;border-left:4px solid ${ACCENT_COLOR};padding-left:12px;">
    ${text}
  </h2>
`;

const alertBadge = (text) => `
  <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:12px 16px;margin-top:24px;">
    <p style="margin:0;font-size:13px;color:#c2410c;font-weight:600;">⚠️ ${text}</p>
  </div>
`;


const templates = {
  // 1. Contact notification (sent to clinic)
  contactNotification: (data) => ({
    subject: `📩 New Contact Message from ${data.name}`,
    html: emailWrapper(`
      ${sectionHeading("New Contact Form Submission")}
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Name", data.name)}
        ${infoRow("Email", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};text-decoration:none;">${data.email}</a>`)}
        ${infoRow("Phone", data.phone || "Not provided")}
        ${infoRow("Message", `<span style="white-space:pre-line;">${data.message}</span>`)}
      </table>
      ${alertBadge("Please respond to this patient at your earliest convenience.")}
    `),
  }),

  // 2. Appointment notification (sent to clinic)
  appointmentNotification: (data) => ({
    subject: ` New Appointment Request — ${data.service}`,
    html: emailWrapper(`
      ${sectionHeading("New Appointment Request")}
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Patient", data.fullname)}
        ${infoRow("Email", `<a href="mailto:${data.email}" style="color:${ACCENT_COLOR};text-decoration:none;">${data.email}</a>`)}
        ${infoRow("Phone", data.phone)}
        ${infoRow("Service", data.service)}
        ${infoRow("Preferred Date", new Date(data.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
        ${infoRow("Preferred Time", data.time)}
        ${data.notes ? infoRow("Notes", data.notes) : ""}
      </table>
      ${alertBadge("Action required: Contact the patient to confirm this appointment.")}
    `),
  }),

  // 3. Auto-reply (sent to patient)
  autoReply: (data, type) => {
    const isContact = type === "contact";
    const patientName = data.fullname || data.name || "Valued Patient";

    return {
      subject: isContact
        ? `✅ We received your message — ${CLINIC_NAME}`
        : `✅ Appointment request received — ${CLINIC_NAME}`,

      html: emailWrapper(`
        ${sectionHeading(isContact ? "Message Received" : "Appointment Request Received")}

        <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
          Dear <strong>${patientName}</strong>,
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
          Thank you for reaching out to <strong>${CLINIC_NAME}</strong>.
          We have successfully received your ${isContact ? "message" : "appointment request"}
          and our team will get back to you within <strong>24 hours</strong>.
        </p>

        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;">
          For urgent assistance, please contact us directly:
        </p>

        <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px 20px;display:inline-block;">
          <p style="margin:0;font-size:15px;color:${BRAND_COLOR};font-weight:600;">
            📞 ${CLINIC_PHONE}
          </p>
        </div>

        <p style="margin:28px 0 0;font-size:14px;color:#6b7280;line-height:1.7;">
          We appreciate your trust in us and look forward to taking care of your smile.
        </p>

        <p style="margin:8px 0 0;font-size:14px;color:#374151;font-weight:600;">
          Warm regards,<br/>
          <span style="color:${BRAND_COLOR};">${CLINIC_NAME} Team</span>
        </p>
      `),
    };
  },
};


const sendEmail = async (to, subject, html) => {
  try {
    if (!to || !subject || !html) {
      throw new Error(
        "Missing required email parameters: to, subject, or html",
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("🔧 DEV MODE — Email would be sent:");
      console.log("  To     :", to);
      console.log("  Subject:", subject);

      if (!to.includes("test") && !process.env.FORCE_REAL_EMAIL) {
        console.log("⚠️  Blocked in dev. Set FORCE_REAL_EMAIL=true to send.");
        return { messageId: "dev-mode-blocked", devMode: true };
      }
    }

    const info = await transporter.sendMail({
      from: `"${CLINIC_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail, templates };
