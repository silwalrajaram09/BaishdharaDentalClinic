import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SERVICES_FORM, TIME_SLOTS, CLINIC_INFO } from "../data/bookingOptions";

const APP_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const EMPTY_FORM = {
  service: "",
  fullname: "",
  email: "",
  date: "",
  time: "",
  phone: "",
  notes: "",
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const BookingModal = ({ open, onClose }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";

      lastFocusedRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables =
          dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!status.msg) return;
    const t = setTimeout(() => setStatus({ type: "", msg: "" }), 4000);
    return () => clearTimeout(t);
  }, [status.msg]);

  useEffect(() => {
    if (!open) {
      setForm(EMPTY_FORM);
      setFieldErrors({});
      setStatus({ type: "", msg: "" });
      setSubmitting(false);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (status.msg) setStatus({ type: "", msg: "" });
  };

  const validateLocally = () => {
    const errors = {};
    const required = ["service", "fullname", "email", "date", "time", "phone"];

    required.forEach((k) => {
      if (!form[k]) errors[k] = "This field is required.";
    });

    // Email validation
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Date validation - prevent past dates
    if (form.date) {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.date = "Date cannot be in the past.";
      }

      // Check if date is Saturday (clinic closed)
      const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 6) {
        errors.date =
          "The clinic is closed on Saturdays. Please select another day.";
      }
    }

    // Time validation - prevent past times for today
    if (form.date && form.time) {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Only check time if the date is today
      if (selectedDate.getTime() === today.getTime()) {
        const now = new Date();

        // Parse time in format "9:00 AM"
        const match = form.time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
        if (match) {
          let hours = parseInt(match[1]);
          const minutes = parseInt(match[2]);
          const meridian = match[3].toUpperCase();

          if (meridian === "PM" && hours !== 12) hours += 12;
          if (meridian === "AM" && hours === 12) hours = 0;

          if (!isNaN(hours) && !isNaN(minutes)) {
            const selectedMinutes = hours * 60 + minutes;
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            // Add 30-minute buffer
            const bufferMinutes = 30;
            if (selectedMinutes <= currentMinutes + bufferMinutes) {
              errors.time =
                "This time slot has passed. Please select a future time.";
            }
          }
        }
      }
    }

    return errors;
  };

  // FIXED: Add this function to filter time slots based on current time
  const getAvailableTimeSlots = () => {
    const today = new Date();
    const selectedDate = form.date ? new Date(form.date) : null;

    if (!selectedDate) return TIME_SLOTS;

    // Create a new date object for today at midnight for comparison
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    // Create a new date object for selected date at midnight for comparison
    const selectedMidnight = new Date(selectedDate);
    selectedMidnight.setHours(0, 0, 0, 0);

    const isToday = selectedMidnight.getTime() === todayMidnight.getTime();

    if (!isToday) return TIME_SLOTS;

    // Use the current time for filtering
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return TIME_SLOTS.filter((timeSlot) => {
      const match = timeSlot.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
      if (!match) return true;

      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const meridian = match[3].toUpperCase();

      if (meridian === "PM" && hours !== 12) hours += 12;
      if (meridian === "AM" && hours === 12) hours = 0;

      const slotMinutes = hours * 60 + minutes;

      // Allow time slots that are at least 30 minutes in the future
      return slotMinutes > currentMinutes + 30;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const localErrors = validateLocally();
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setStatus({ type: "error", msg: "Please fix the highlighted fields." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", msg: "" });
    setFieldErrors({});

    try {
      const res = await fetch(`${APP_URL}/api/appointments/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok || !data.success) {
        // Surface the per-field validation errors the backend returns
        if (data.errors) setFieldErrors(data.errors);
        throw new Error(data.message || "Failed to book appointment");
      }

      setStatus({
        type: "success",
        msg: data.message || "Appointment booked! We'll contact you soon.",
      });
      setForm(EMPTY_FORM);
      setTimeout(onClose, 1800);
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const baseInputCls =
    "w-full p-3 rounded-lg border text-sm text-black " +
    "focus:outline-none focus:ring-2 focus:ring-[#2e7fc1] focus:border-transparent transition";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";
  const errorTextCls = "text-red-600 text-xs mt-1";
  const today = new Date().toISOString().split("T")[0];

  const inputCls = (name) =>
    `${baseInputCls} ${fieldErrors[name] ? "border-red-400" : "border-gray-300"}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="bg-white text-black p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.94, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 40, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-between items-center mb-5">
              <h3
                id="booking-modal-title"
                className="text-xl font-semibold text-[#0b2a4a]"
              >
                Make an Appointment
              </h3>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close booking form"
                className="flex items-center justify-center w-9 h-9 rounded-full
                           text-gray-500 hover:text-gray-700 hover:bg-gray-100
                           transition-colors focus-visible:ring-2 focus-visible:ring-[#2e7fc1]"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Status */}
            <AnimatePresence>
              {status.msg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role="alert"
                  aria-live="assertive"
                  className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                    status.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status.msg}
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Service */}
              <div className="sm:col-span-2">
                <label htmlFor="modal-service" className={labelCls}>
                  Select Service *
                </label>
                <select
                  id="modal-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.service}
                  className={inputCls("service") + " cursor-pointer"}
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICES_FORM.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {fieldErrors.service && (
                  <p className={errorTextCls}>{fieldErrors.service}</p>
                )}
              </div>

              {/* Full name */}
              <div>
                <label htmlFor="modal-fullname" className={labelCls}>
                  Full Name *
                </label>
                <input
                  id="modal-fullname"
                  name="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.fullname}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-invalid={!!fieldErrors.fullname}
                  className={inputCls("fullname")}
                />
                {fieldErrors.fullname && (
                  <p className={errorTextCls}>{fieldErrors.fullname}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="modal-email" className={labelCls}>
                  Email *
                </label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-invalid={!!fieldErrors.email}
                  className={inputCls("email")}
                />
                {fieldErrors.email && (
                  <p className={errorTextCls}>{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="modal-phone" className={labelCls}>
                  Phone *
                </label>
                <input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  aria-invalid={!!fieldErrors.phone}
                  className={inputCls("phone")}
                />
                {fieldErrors.phone && (
                  <p className={errorTextCls}>{fieldErrors.phone}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="modal-date" className={labelCls}>
                  Preferred Date *
                </label>
                <input
                  id="modal-date"
                  name="date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.date}
                  className={inputCls("date")}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Open Sunday–Friday, 9:00 AM – 6:00 PM (Closed Saturdays)
                </p>
                {fieldErrors.date && (
                  <p className={errorTextCls}>{fieldErrors.date}</p>
                )}
              </div>

              {/* Time */}
              {/* Time */}
              <div>
                <label htmlFor="modal-time" className={labelCls}>
                  Preferred Time *
                </label>
                {getAvailableTimeSlots().length > 0 ? (
                  <select
                    id="modal-time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.time}
                    className={inputCls("time") + " cursor-pointer"}
                  >
                    <option value="" disabled>
                      Select a time…
                    </option>
                    {getAvailableTimeSlots().map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full p-3 rounded-lg border border-amber-300 bg-amber-50 text-amber-700 text-sm">
                    <p className="flex items-center gap-2">
                      No time slots available for today. Please select another
                      date.
                    </p>
                  </div>
                )}
                {fieldErrors.time && (
                  <p className={errorTextCls}>{fieldErrors.time}</p>
                )}
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label htmlFor="modal-notes" className={labelCls}>
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="modal-notes"
                  name="notes"
                  rows="3"
                  placeholder="Any special requests or information…"
                  value={form.notes}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.notes}
                  className={inputCls("notes") + " resize-none"}
                />
                {fieldErrors.notes && (
                  <p className={errorTextCls}>{fieldErrors.notes}</p>
                )}
              </div>

              {/* Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#2e7fc1] text-white py-3 rounded-lg font-semibold
                             hover:bg-[#3a92d9] active:scale-[0.99] transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed
                             focus-visible:ring-2 focus-visible:ring-[#2e7fc1] focus-visible:ring-offset-2"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking…
                    </span>
                  ) : (
                    "Make Appointment"
                  )}
                </button>
                <p className="text-center text-gray-400 text-xs mt-3">
                  Or call us directly:{" "}
                  <a
                    href={`tel:${CLINIC_INFO.phonePrimary.tel}`}
                    className="text-[#2e7fc1] hover:underline font-medium"
                  >
                    {CLINIC_INFO.phonePrimary.display}
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
