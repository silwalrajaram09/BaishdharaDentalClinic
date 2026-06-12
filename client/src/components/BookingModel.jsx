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

/**
 * BookingModal
 *
 * Self-contained appointment modal. Extracted from Header.jsx, which
 * previously owned ~250 lines of form state/validation/submission logic —
 * a navigation component has no business knowing how appointments are booked.
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 */
const BookingModal = ({ open, onClose }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // ── Open/close side-effects: body scroll lock + focus management ──
  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      // Focus the close button once the modal has mounted
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      // Return focus to whatever opened the modal
      lastFocusedRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ── Escape to close + Tab focus trap ──
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

  // ── Auto-clear status messages ──
  useEffect(() => {
    if (!status.msg) return;
    const t = setTimeout(() => setStatus({ type: "", msg: "" }), 4000);
    return () => clearTimeout(t);
  }, [status.msg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.msg) setStatus({ type: "", msg: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const required = ["service", "fullname", "email", "date", "time", "phone"];
    if (required.some((k) => !form[k])) {
      setStatus({ type: "error", msg: "Please fill in all required fields." });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus({ type: "error", msg: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", msg: "" });

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
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to book appointment");

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

  const inputCls =
    "w-full p-3 rounded-lg border border-gray-300 text-sm text-black " +
    "focus:outline-none focus:ring-2 focus:ring-[#2e7fc1] focus:border-transparent transition";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";
  const today = new Date().toISOString().split("T")[0];

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
                  required
                  className={inputCls + " cursor-pointer"}
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
                  required
                  autoComplete="name"
                  className={inputCls}
                />
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
                  required
                  autoComplete="email"
                  className={inputCls}
                />
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
                  required
                  autoComplete="tel"
                  className={inputCls}
                />
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
                  required
                  className={inputCls}
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="modal-time" className={labelCls}>
                  Preferred Time *
                </label>
                <select
                  id="modal-time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className={inputCls + " cursor-pointer"}
                >
                  <option value="" disabled>
                    Select a time…
                  </option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
                  className={inputCls + " resize-none"}
                />
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
