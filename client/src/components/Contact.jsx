import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CLINIC_INFO, SERVICES_FORM } from "../Data/BookingOptions";
import { useAppointmentForm } from "../hooks/useAppointmentForm";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.314449794758!2d85.29962317554164!3d27.738445576164796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f1fee8d13d%3A0x30058cbbf8bc3d57!2sBaishdhara%20Dental%20Clinic!5e0!3m2!1sen!2snp!4v1786189220726!5m2!1sen!2snp";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Baishdhara+Dental+Clinic,+Kathmandu";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  children,
}) {
  const describedBy = error ? `${name}-error` : undefined;
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#263b4d]"
      >
        {label}
      </label>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full rounded-xl border bg-[#fbfdfe] px-4 py-3.5 text-sm text-[#102b45] outline-none transition placeholder:text-[#9aa9b4] focus:bg-white focus:ring-2 ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-[#dfe8ee] focus:border-[#3b7dbd] focus:ring-[#3b7dbd]/15"
          }`}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const {
    formData,
    isSubmitting,
    successMessage,
    errorMessage,
    fieldErrors,
    handleChange,
    handleSubmit,
    getAvailableTimeSlots,
  } = useAppointmentForm();

  const today = new Date().toISOString().split("T")[0];
  const status = successMessage
    ? { type: "success", message: successMessage }
    : { type: "error", message: errorMessage };

  return (
    <section className="relative overflow-hidden bg-[#f4f8fb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#d9eef5]/65 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#e6eefa]/80 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-[#0b2a4a] sm:text-5xl">
            Contact Us
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-[#86c7dc]" />
          <p className="mt-4 text-sm leading-7 text-[#627281] sm:text-base">
            Book a visit, ask a question, or get directions to Baishdhara Dental
            Clinic in Kathmandu.
          </p>
        </motion.header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={fadeUp}
            className="rounded-[1.5rem] border border-[#e1eaf0] bg-white p-5 shadow-[0_18px_42px_-30px_rgba(11,42,74,0.5)] sm:rounded-[2rem] sm:p-8"
          >
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3b7dbd]">
                Book your visit
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-[#0b2a4a] sm:text-3xl">
                Make an appointment
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#71808c]">
                Choose your service, preferred date, and a convenient time.
              </p>
            </div>

            {status.message && (
              <div
                role="status"
                className={`mb-5 rounded-xl border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <Field
                label="Full name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                error={fieldErrors.fullname}
                placeholder="Enter your full name"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={fieldErrors.email}
                  placeholder="you@example.com"
                />
                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={fieldErrors.phone}
                  placeholder="+977 98..."
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Dental service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  error={fieldErrors.service}
                >
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.service)}
                    className={`w-full rounded-xl border bg-[#fbfdfe] px-4 py-3.5 text-sm text-[#102b45] outline-none transition focus:bg-white focus:ring-2 ${fieldErrors.service ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-[#dfe8ee] focus:border-[#3b7dbd] focus:ring-[#3b7dbd]/15"}`}
                  >
                    <option value="">Select a service</option>
                    {SERVICES_FORM.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Preferred date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={fieldErrors.date}
                >
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    aria-invalid={Boolean(fieldErrors.date)}
                    className={`w-full rounded-xl border bg-[#fbfdfe] px-4 py-3.5 text-sm text-[#102b45] outline-none transition focus:bg-white focus:ring-2 ${fieldErrors.date ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-[#dfe8ee] focus:border-[#3b7dbd] focus:ring-[#3b7dbd]/15"}`}
                  />
                </Field>
              </div>
              <Field
                label="Preferred time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                error={fieldErrors.time}
              >
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors.time)}
                  className={`w-full rounded-xl border bg-[#fbfdfe] px-4 py-3.5 text-sm text-[#102b45] outline-none transition focus:bg-white focus:ring-2 ${fieldErrors.time ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-[#dfe8ee] focus:border-[#3b7dbd] focus:ring-[#3b7dbd]/15"}`}
                >
                  <option value="">
                    {formData.date && getAvailableTimeSlots().length === 0
                      ? "No times available for this date"
                      : "Select a time"}
                  </option>
                  {getAvailableTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b2a4a] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0b2a4a]/15 transition hover:-translate-y-0.5 hover:bg-[#173f65] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b7dbd] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Booking appointment..." : "Book appointment"}
                {!isSubmitting && <Send size={16} aria-hidden="true" />}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={fadeUp}
            className="space-y-6 "
          >
            <div className="rounded-[1.5rem] border border-[#e1eaf0]  p-5   bg-primary shadow-[0_18px_42px_-30px_rgba(11,42,74,0.72)] sm:rounded-[2rem] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86d7e9]">
                Visit the clinic
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white tracking-[-0.035em] sm:text-2xl">
                Contact details
              </h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Baishdhara+Dental+Clinic,+Kathmandu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-blue-100 transition hover:text-white"
                >
                  <MapPin
                    size={19}
                    className="mt-0.5 shrink-0 text-[#86d7e9]"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block text-white">Address</strong>
                    <span className="mt-1 block leading-6">
                      Tarun Marga, Bypass, Balaju, Kathmandu, Nepal
                    </span>
                  </span>
                </a>
                <a
                  href={`tel:${CLINIC_INFO.phonePrimary.tel}`}
                  className="flex items-start gap-3 text-sm text-blue-100 transition hover:text-white"
                >
                  <Phone
                    size={19}
                    className="mt-0.5 shrink-0 text-[#86d7e9]"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block text-white">Call us</strong>
                    <span className="mt-1 block">
                      {CLINIC_INFO.phonePrimary.display}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="flex items-start gap-3 text-sm text-blue-100 transition hover:text-white"
                >
                  <Mail
                    size={19}
                    className="mt-0.5 shrink-0 text-[#86d7e9]"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block text-white">Email</strong>
                    <span className="mt-1 block break-all">
                      {CLINIC_INFO.email}
                    </span>
                  </span>
                </a>
                <div className="flex items-start gap-3 text-sm text-blue-100">
                  <Clock3
                    size={19}
                    className="mt-0.5 shrink-0 text-[#86d7e9]"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block text-white">Opening hours</strong>
                    <span className="mt-1 block">
                      {CLINIC_INFO.hours.days}: {CLINIC_INFO.hours.time}
                    </span>
                    <span className="block text-blue-200">
                      {CLINIC_INFO.hours.closed}: Closed
                    </span>
                  </span>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-3 border-t border-white/15 pt-6">
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${CLINIC_INFO.whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
                >
                  <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp us
                </a>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#0b2a4a]"
                >
                  <MapPin size={16} aria-hidden="true" /> Get directions
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeUp}
          className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#dfe8ee] bg-white shadow-[0_18px_42px_-30px_rgba(11,42,74,0.5)] sm:mt-8 sm:rounded-[2rem]"
        >
          {/* <div className="flex items-center justify-between gap-4 px-5 pb-4 pt-5 sm:px-7 sm:pt-7">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3b7dbd]">Find us easily</p><h2 className="mt-1 text-xl font-bold text-[#0b2a4a] sm:text-2xl">Our location</h2></div>
            <MessageCircle className="hidden text-[#b4d8e5] sm:block" size={30} aria-hidden="true" />
          </div> */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eaf2f6] sm:aspect-[16/8] lg:aspect-[16/6.5]">
            <iframe
              title="Baishdhara Dental Clinic location map"
              src={MAP_EMBED_URL}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-7">
            <p className="text-xs leading-5 text-[#71808c]">
              Tap the map to explore the clinic location.
            </p>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-bold text-[#2e78a7] hover:text-[#0b2a4a]"
            >
              Open in Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
