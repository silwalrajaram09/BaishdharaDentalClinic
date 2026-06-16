const { sendEmail, templates } = require("../utils/emailService");
const { z } = require("zod");

// Helper to convert time to minutes for comparison
const timeToMinutes = (timeStr) => {
  // Handle format like "9:00 AM", "12:30 PM", etc.
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (!match) return null;

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const meridian = match[3].toUpperCase();

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
};

// Check if time is in the allowed time slots
const isValidTimeSlot = (timeStr) => {
  const allowedSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];
  return allowedSlots.includes(timeStr);
};

const submitAppointmentSchema = z
  .object({
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
      .min(1, "Date is required")
      .refine(
        (v) => !Number.isNaN(Date.parse(v)),
        "Please provide a valid date",
      )
      .refine((v) => {
        const selectedDate = new Date(v);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, "Date cannot be in the past")
      .refine((v) => {
        const selectedDate = new Date(v);
        const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
        return dayOfWeek !== 6; // Not Saturday
      }, "The clinic is closed on Saturdays. Please select another day."),

    time: z
      .string({ required_error: "Time is required" })
      .trim()
      .min(1, "Time is required")
      .refine((v) => isValidTimeSlot(v), "Please select a valid time slot"),

    notes: z
      .string()
      .optional()
      .or(z.literal(""))
      .transform((v) => (v === "" ? undefined : v))
      .refine(
        (v) => !v || v.length <= 2000,
        "Notes must be at most 2000 characters",
      ),
  })
  // Cross-field validation: Check if time is not in the past for today's date
  .superRefine((data, ctx) => {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Only check time if the date is today
    if (selectedDate.getTime() === today.getTime()) {
      const timeInMinutes = timeToMinutes(data.time);
      if (timeInMinutes === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid time format",
          path: ["time"],
        });
        return;
      }

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Check if the time is in the future (not past)
      // Removed the 30-minute buffer for testing, but you can add it back
      if (timeInMinutes < currentMinutes) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "This time slot has already passed today. Please select a future time.",
          path: ["time"],
        });
      }
    }
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
