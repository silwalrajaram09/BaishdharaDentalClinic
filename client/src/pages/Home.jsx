import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";
import Heroslider2 from "../components/heroslider2";
import WhyChooseUs from "../components/WhyChooseUs";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { SERVICES_FORM } from "../Data/BookingOptions";
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

  const today = new Date().toISOString().split("T")[0];
const [currentPatient, setCurrentPatient] = useState(0);

const nextPatient = () => {
  setCurrentPatient((prev) => (prev + 1) % HappyPatients.length);
};

const prevPatient = () => {
  setCurrentPatient(
    (prev) => (prev - 1 + HappyPatients.length) % HappyPatients.length
  );
};

  return (
    <>
      <SEO
  title="Best Dental Clinic in Kathmandu | Baishdhara Dental Clinic"
  description="Baishdhara Dental Clinic in Kathmandu offers advanced care, including dental implants, root canal treatments, and complete oral health services."
  keywords="best dental clinic in Kathmandu, dentist in Kathmandu, dental clinic Kathmandu, dental implants Kathmandu, braces Kathmandu, root canal treatment Kathmandu, teeth whitening, oral health care"
/>
      <div className="bg-gray-50">
        <h1 className="sr-only">
          Baishdhara Dental Clinic - Professional Dental Care in Kathmandu
        </h1>
        {/* HERO */}
        <Heroslider2 />

        {/* APPOINTMENT STRIP */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="bookModal"
          className="max-w-6xl mx-auto px-2 -mt-10 md:-mt-10 "
        >
          <div className="w-full px-4 sm:px-6  relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-secondary  p-8 md:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-bold font-playfair text-[#0b2a4a] leading-tight mb-6">
                    Why Patients Choose Dr. Dinesh Bhusal?
                  </h2>

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
              <div className=" bg-primary p-8 md:p-10 flex flex-col justify-center">
                <div className="">
                  <h2 className="text-2xl md:text-3xl font-bold font-playfair text-black leading-tight mb-6">
                    Book Your Visit
                </h2>

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
                  className="grid grid-cols-1 sm:grid-cols-3 gap-5"
                >
                  {/* SERVICE */}
                  <select
                    name="service"
                    aria-label="Select Service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`p-3 rounded-lg border  text-black ${fieldErrors.service ? "border-red-500" : ""}`}
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
                    className={`p-3 rounded-lg border text-black ${fieldErrors.fullname ? "border-red-500" : ""}`}
                  />

                  {/* EMAIL */}
                  <input
                    type="email"
                    name="email"
                    aria-label="Email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`p-3 rounded-xl border text-black ${fieldErrors.email ? "border-red-500" : ""}`}
                  />
                  {/* PHONE */}
                  <input
                    type="tel"
                    name="phone"
                    aria-label="Phone Number"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`p-3 rounded-xl border text-black ${fieldErrors.phone ? "border-red-500" : ""}`}
                  />

                  {/* DATE */}
                  <input
                   placeholder="Appointment Date"
                    type="date"
                    name="date"
                    aria-label="Appointment Date"
                    min={today}
                   
                    value={formData.date}
                    onChange={handleChange}
                    className={`p-3 rounded-xl border text-black ${fieldErrors.date ? "border-red-500" : ""}`}
                  />

                  {/* TIME - NOW USING FILTERED TIME SLOTS */}
                  {getAvailableTimeSlots().length > 0 ? (
                    <select
                      name="time"
                      aria-label="Select Time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`p-3 rounded-xl border text-black ${fieldErrors.time ? "border-red-500" : ""}`}
                    >
                      <option value="">Select time</option>
                      {getAvailableTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 rounded-xl border border-amber-300 text-amber-700 text-sm w-full">
                      Change the Date
                    </div>
                  )}

                  
                  {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`sm:col-span-3 py-3 mt-5 rounded-xl font-semibold transition-all  duration-300 ${
                          isSubmitting
                            ? "bg-white/70 text-gray-500 cursor-not-allowed"
                            : "bg-transparent text-black hover:text-primary hover:bg-gray-100 hover:scale-[1.02] hover:font-bold border-black hover:border-primary border transition-all duration-300 shadow-lg shadow-black"
                        }`}
                      >
                        {isSubmitting ? "Booking..." : "Make Appointment"}
                      </button>
                </form>
              </div>
            </div>
          </div>
          </div>
        </motion.section>
<hr className=" mt-5 border-0.5 border-gray-200 mx-auto max-w-6xl" />
        {/* EXPERTISE */}
        <WhyChooseUs />
<hr className=" mt-5 border-0.5 border-gray-200 mx-auto max-w-6xl" style={{
  borderRadius: "0 0 50% 50% / 0 0 100% 100%",
}}/>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-6xl mx-auto px-4 py-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-[#0b2a4a] leading-tight">
              Our Expertise
            </h2>
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
                className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
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
        {/* Happy Patients */}
<div className="relative">
  {/* Top Wave */}
  <svg
    className="w-full h-16 md:h-20 text-secondary"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
  >
    <path
      fill="currentColor"
      d="M0,64 C320,150 1120,0 1440,64 L1440,120 L0,120 Z"
    />
  </svg>

  <motion.section
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-secondary py-6 md:py-10"
  >
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0b2a4a] text-center mb-8 md:mb-12">
        Happy Patients
      </h2>

      <div className="md:hidden">
        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-primary overflow-hidden mb-4">
            <img
              src={HappyPatients[currentPatient].img}
              alt={HappyPatients[currentPatient].name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-xl font-semibold">
            {HappyPatients[currentPatient].name}
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            {HappyPatients[currentPatient].work}
          </p>

          <p className="text-gray-700 italic leading-relaxed">
            "{HappyPatients[currentPatient].opinion}"
          </p>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevPatient}
              className="bg-primary text-white p-3 rounded-full hover:scale-105 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-medium text-gray-500">
              {currentPatient + 1} / {HappyPatients.length}
            </span>

            <button
              onClick={nextPatient}
              className="bg-primary text-white p-3 rounded-full hover:scale-105 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

     
      <div className="hidden md:grid grid-cols-3 gap-8">
        {HappyPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden mb-4">
              <img
                src={patient.img}
                alt={patient.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold text-black mb-1">
              {patient.name}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              {patient.work}
            </p>

            <p className="text-gray-700 italic leading-relaxed">
              "{patient.opinion}"
            </p>
          </div>
        ))}
      </div>
    </div>
  </motion.section>

  {/* Bottom Wave */}
  <svg
    className="w-full h-16 md:h-20 text-secondary rotate-180"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
  >
    <path
      fill="currentColor"
      d="M0,64 C320,150 1120,0 1440,64 L1440,120 L0,120 Z"
    />
  </svg>
</div>
 {/* <hr className="border-0.5 border-gray-200 mx-auto max-w-6xl" /> */}
        {/* CONTACT */}
        <Contact />
      </div>
    </>
  );
};

export default Home;
