/**
 * bookingOptions.js
 *
 * Single source of truth for the appointment form, used by both
 * the Header's BookingModal and the homepage inline appointment form.
 *
 * Previously these lists were duplicated in two places and had drifted —
 * the modal had 7 time slots (with a "12:00 ApM" typo), the homepage had 11.
 */

export const SERVICES_FORM = [
  "Consultation / Checkup",
  "Teeth Cleaning",
  "Teeth Whitening",
  "Fillings / Root Canal",
  "Tooth Extraction",
  "Implants / Crowns",
  "Braces / Orthodontics",
  "Kids Dentistry",
  "Emergency Care",
  "Quality Brackets",
  "Modern Anaesthetic",
];

export const TIME_SLOTS = [
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

export const CLINIC_INFO = {
  phonePrimary: { display: "+977 980-3421766", tel: "+9779803421766" },
  phoneLandline: { display: "01-4962513", tel: "+97714962513" },
  email: "baishdharadental@gmail.com",
  whatsappNumber: "9779803421766",
  whatsappMessage: encodeURIComponent(
    "Hello, I'd like to book a dental appointment at Baishdhara Dental Clinic.",
  ),
  hours: { days: "Sun–Fri", time: "9:00 AM – 6:00 PM", closed: "Saturday" },
};
