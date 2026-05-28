const { sendEmail, templates } = require("../utils/emailService");
const { z } = require("zod");

const submitContactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid email"),

  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => !v || /^[0-9+\-\s()]{7,20}$/.test(v),
      "Please enter a valid phone number",
    ),

  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be at most 2000 characters"),
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

// Submit contact form - Email only
const submitContact = async (req, res) => {
  try {
    const parseResult = submitContactSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact form submission",
        errors: toFieldErrors(parseResult.error),
      });
    }

    const { name, email, phone, message } = parseResult.data;

    console.log("Received contact form:", {
      name,
      email,
      phone,
      message,
    });

    // Generate email template
    const notificationTemplate = templates.contactNotification({
      name,
      email,
      phone,
      message,
    });

    // Send email
    await sendEmail(
      process.env.RECIPIENT_EMAIL,
      notificationTemplate.subject,
      notificationTemplate.html,
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

module.exports = {
  submitContact,
};
