const { sendEmail, templates } = require("../utils/emailService");
const { z } = require("zod");

const submitAppointmentSchema = z.object({
  fullname: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name must be at most 120 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid email"),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(7, "Phone number is required")
    .max(25)
    .refine(
      (v) => /^[0-9+\-\s()]{7,20}$/.test(v),
      "Please enter a valid phone number",
    ),

  service: z
    .string({ required_error: "Service is required" })
    .trim()
    .min(2, "Service is required")
    .max(100, "Service must be at most 100 characters"),

  date: z
    .string({ required_error: "Date is required" })
    .trim()
    .min(1)
    .refine((v) => !Number.isNaN(Date.parse(v)), "Please provide a valid date"),

  time: z
    .string({ required_error: "Time is required" })
    .trim()
    .min(1)
    .max(20)
    .refine(
      (v) =>
        /^\d{1,2}:\d{2}$/.test(v) ||
        /^[0-9]{1,2}(am|pm)$/i.test(v) ||
        /^\d{1,2}:\d{2}\s?(am|pm)$/i.test(v),
      "Please provide a valid time",
    ),

  notes: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => !v || v.length <= 2000,
      "Notes must be at most 2000 characters",
    ),
});

const toFieldErrors = (zodError) => {
  const errors = {};

  for (const issue of zodError.issues) {
    const path = issue.path?.[0];

    if (path) {
      errors[path] = issue.message;
    }
  }

  return errors;
};

// Submit appointment - Email only
const submitAppointment = async (req, res) => {
  try {
    const parseResult = submitAppointmentSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment submission",
        errors: toFieldErrors(parseResult.error),
      });
    }

    const { fullname, email, phone, service, date, time, notes } =
      parseResult.data;

    console.log("Received appointment form:", {
      fullname,
      email,
      phone,
      service,
      date,
      time,
      notes,
    });

    // Send email to clinic
    const notification = templates.appointmentNotification({
      fullname,
      email,
      phone,
      service,
      date,
      time,
      notes,
    });

    await sendEmail(
      process.env.RECIPIENT_EMAIL,
      notification.subject,
      notification.html,
    );

    res.status(200).json({
      success: true,
      message: "Appointment request sent successfully!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
};

module.exports = {
  submitAppointment,
};
