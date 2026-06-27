import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";
import Heroslider2 from "../components/heroslider2";
import WhyChooseUs from "../components/WhyChooseUs";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import maskey from "../assets/images/maskey.png";
import saroj from "../assets/images/saroj.png";
import salik from "../assets/images/adhikary.png";
import cosmetic from "../assets/images/cosmetic dentistry.PNG";
import braces from "../assets/images/braces and aligners.png";
import crownBridges from "../assets/images/crown bridges and dentures.png";
import dentalImplants from "../assets/images/dental implants.png";
import emergencyCare from "../assets/images/emergency dental care.png";
import genralDentistry from "../assets/images/general dentistry.png";
import gumTreatment from "../assets/images/gum treatment.png";
import rootCanal from "../assets/images/root canal treatment.png";
import pediatricDentistry from "../assets/images/pediatric dentistry.png";
import toothExtraction from "../assets/images/tooth extraction and oral surgery.png";
import { SERVICES_FORM } from "../Data/bookingOptions";
import SEO from "../components/SEO";
import { useAppointmentForm } from "../hooks/useAppointmentForm";

const Expertise = [
  {
    title: "General Dentistry",
    img: genralDentistry,
    link: "/services/general-dentistry",
  },
  {
    title: "Root Canal Treatment",
    img: rootCanal,
    link: "/services/root-canal-treatment",
  },
  {
    title: "Pediatric Dentistry",
    img: pediatricDentistry,
    link: "/services/pediatric-dentistry",
  },
  {
    title: "Gum Treatment",
    img: gumTreatment,
    link: "/services/gum-treatment",
  },
  {
    title: "Tooth extraction &Oral Surgery",
    img: toothExtraction,
    link: "/services/tooth-extraction-oral-surgery",
  },
  {
    title: "Braces & Aligners",
    img: braces,
    link: "/services/braces-aligners",
  },
  {
    title: "Crowns, Bridges & Dentures",
    img: crownBridges,
    link: "/services/crowns-bridges-dentures",
  },
  {
    title: "Dental Implants",
    img: dentalImplants,
    link: "/services/dental-implants",
  },
  {
    title: "Cosmetic Dentistry",
    img: cosmetic,
    link: "/services/cosmetic-dentistry",
  },
  {
    title: "Emergency Care",
    img: emergencyCare,
    link: "/services/emergency-dental-care",
  },
];

const HappyPatients = [
  {
    id: 1,
    name: "Salik Adhikary",
    img: salik,
    work: "Lecturer TU",
    opinion:
      "It is one of best dental clinic with Nepal’s well experienced and skilled dental surgeon.",
  },
  {
    id: 2,
    name: "Julie Maskey",
    img: maskey,
    work: "Freelancer, Ktm",
    opinion: "Great staff and quality care!",
  },
  {
    id: 3,
    name: "Dr Saroj kandel",
    img: saroj,
    work: "Dr USA",
    opinion:
      "I had a great experience at the dental clinic. The staff was friendly and professional, and the dentist was very knowledgeable.I would definitely recommend this clinic to anyone looking for quality dental care",
  },
];

// Animations
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HappyPatients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <SEO
        title="Home | Bsishdhara Dental Clinic"
        description="Professionla dental care in Kathmandu Nepal"
      />

      <div className="bg-gray-50">
        {/* HERO */}
        <Heroslider2 />

        {/* APPOINTMENT STRIP */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="bookModal"
          className="max-w-6xl mx-auto px-4 -mt-10 md:-mt-10 "
        >
          <div className="w-full px-6  relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-secondary  p-8 md:col-span-2">
                  <h3 className="text-2xl text-slate-900 font-semibold mb-6">
                    Why Patients Choose Dr. Dinesh Bhusal?
                  </h3>

                  <div className="grid text-slate-800 grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        🏆
                      </span>
                      <span>10+ Years of Clinical Experience</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        🦷
                      </span>
                      <span>1,000+ Dental Implants Successfully Placed</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        🔩
                      </span>
                      <span>1,000+ Post &amp; Core Restorations Completed</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        ✨
                      </span>
                      <span>Hundreds of Full-Mouth Rehabilitation Cases</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT HALF */}
              <div className="bg-primary text-slate-900 p-8 ">
                <h3 className="text-xl font-semibold mb-6">
                  Make an Appointment
                </h3>

                {/* SUCCESS */}
                {successMessage && (
                  <div
                    className="bg-green-100 text-green-700 p-3 rounded mb-4"
                    role="alert"
                  >
                    {successMessage}
                  </div>
                )}

                {/* ERROR */}
                {errorMessage && (
                  <div
                    className="bg-red-100 text-red-700 p-3 rounded mb-4"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {/* SERVICE */}
                  <select
                    name="service"
                    aria-label="Select Service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`p-3 rounded border text-black ${fieldErrors.service ? "border-red-500" : ""}`}
                  >
                    <option value="">Select Services</option>
                    {SERVICES_FORM.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  {/* FULL NAME */}
                  <input
                    type="text"
                    name="fullname"
                    aria-label="Full Name"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`p-3 rounded border text-black ${fieldErrors.fullname ? "border-red-500" : ""}`}
                  />

                  {/* EMAIL */}
                  <input
                    type="email"
                    name="email"
                    aria-label="Email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`p-3 rounded border text-black ${fieldErrors.email ? "border-red-500" : ""}`}
                  />

                  {/* DATE */}
                  <input
                    type="date"
                    name="date"
                    aria-label="Appointment Date"
                    min={today}
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`p-3 rounded border text-black ${fieldErrors.date ? "border-red-500" : ""}`}
                  />

                  {/* TIME - NOW USING FILTERED TIME SLOTS */}
                  {getAvailableTimeSlots().length > 0 ? (
                    <select
                      name="time"
                      aria-label="Select Time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`p-3 rounded border text-black ${fieldErrors.time ? "border-red-500" : ""}`}
                    >
                      <option value="">Select time</option>
                      {getAvailableTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 rounded border border-amber-300 bg-amber-50 text-amber-700 text-sm w-full">
                      Change the Date
                    </div>
                  )}

                  {/* PHONE */}
                  <input
                    type="tel"
                    name="phone"
                    aria-label="Phone Number"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`p-3 rounded border text-black ${fieldErrors.phone ? "border-red-500" : ""}`}
                  />

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`sm:col-span-3 py-3 rounded border-border transition ${
                      isSubmitting
                        ? "bg-primary cursor-not-allowed"
                        : "bg-primary-dark hover:bg-[#0b3052] text-white"
                    }`}
                  >
                    {isSubmitting ? "Booking..." : "Make Appointment"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        {/* EXPERTISE */}
        <WhyChooseUs />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-6xl mx-auto px-4 py-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0b2a4a]">Our Expertise</h2>
            <p className="text-gray-500 mt-2">
              Specialized dental care for every need
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {Expertise.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(item.link)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={`Service: ${item.title}`}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-[#0b2a4a] font-semibold">{item.title}</h3>
                  <span className="text-primary text-xs font-medium">
                    Learn more →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Happy patients */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-100 py-16 md:py-20"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-black-500 mb-10 md:mb-12">
              Happy Patients
            </h2>

            <div className="relative">
              {/* LEFT ARROW */}
              <button
                onClick={() =>
                  setActiveIndex(
                    (activeIndex - 1 + HappyPatients.length) %
                      HappyPatients.length,
                  )
                }
                aria-label="Previous patient review"
                className="absolute left-0 top-1/2 -translate-y-1/2 
                   text-2xl md:text-3xl text-gray-400 
                   hover:text-blue-500 transition 
                   p-2 md:p-3"
              >
                ‹
              </button>

              {/* RIGHT ARROW */}
              <button
                onClick={() =>
                  setActiveIndex((activeIndex + 1) % HappyPatients.length)
                }
                aria-label="Next patient review"
                className="absolute right-0 top-1/2 -translate-y-1/2 
                   text-2xl md:text-3xl text-gray-400 
                   hover:text-primary transition 
                   p-2 md:p-3"
              >
                ›
              </button>

              {/* SLIDE */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="px-6 md:px-10"
                >
                  <div className="flex flex-col items-center">
                    {/* IMAGE */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-primary overflow-hidden mb-4">
                      <img
                        src={HappyPatients[activeIndex].img}
                        alt={`Patient ${HappyPatients[activeIndex].name}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* NAME */}
                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-1">
                      {HappyPatients[activeIndex].name}
                    </h3>

                    {/* WORK */}
                    <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                      {HappyPatients[activeIndex].work}
                    </p>

                    {/* TEXT */}
                    <p className="text-sm md:text-base text-gray-700 max-w-2xl leading-relaxed px-2">
                      {HappyPatients[activeIndex].opinion}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* DOTS */}
              <div className="flex justify-center gap-2 mt-6 md:mt-8">
                {HappyPatients.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to patient review slide ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIndex ? "w-6 bg-secondary" : "w-2 bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* CONTACT */}
        <Contact />
      </div>
    </>
  );
};

export default Home;
