import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import Contact from "../components/Contact";
import bg1 from "../assets/images/bg_1.jpg";
import bg2 from "../assets/images/bg_2.jpg";
import { HugeiconsIcon } from "@hugeicons/react";
import { TelephoneIcon } from "@hugeicons/core-free-icons";
import { FaWhatsapp } from "react-icons/fa";

import { motion } from "framer-motion";
// import { div, h2, img } from "framer-motion/client";
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

const Expertise = [
  { title: "General Dentistry", img: genralDentistry, link: "/services" },
  { title: "Root Canal Treatment", img: rootCanal, link: "/services" },
  { title: "Pediatric Dentistry", img: pediatricDentistry, link: "/services" },
  { title: "Gum Treatment", img: gumTreatment, link: "/services" },
  {
    title: "Tooth extraction &Oral Surgery",
    img: toothExtraction,
    link: "/services",
  },
  { title: "Braces & Aligners", img: braces, link: "/services" },
  { title: "Crowns, Bridges & Dentures", img: crownBridges, link: "/services" },
  { title: "Dental Implants", img: dentalImplants, link: "/services" },
  { title: "Cosmetic Dentistry", img: cosmetic, link: "/services" },
  { title: "Emergency Care", img: emergencyCare, link: "/services" },
];

const Choices = [
  {
    title: "Experienced Dental Team",
    description:
      "Skilled professionals focused on safe, precise, and personalized treatment.",
  },
  {
    title: "Advanced Technology",
    description:
      "Modern equipment and digital dentistry for accurate and comfortable care.",
  },
  {
    title: "Clean & Safe Environment",
    description:
      "Strict sterilization and hygiene protocols for your safety and peace of mind.",
  },
  {
    title: "Comfortable and Patient Experience",
    description:
      "Gentle care and a supportive team to make every visite stress-fee.",
  },
  {
    title: "Transparent & Affordable Care",
    description:
      "Quality dental treatments with fair pricing and flexible payment options.",
  },
  {
    title: "Comprehensive Dental Services ",
    description:
      "From routine checkups to advanced smile restoration - all in one place.",
  },
];

const slides = [
  {
    bgImage: bg1,
    title: "Because Your Smile Deserves The Best.",
    subtitle: "From Advanced Implantology To Complete Oral Care",
  },
  {
    bgImage: bg2,
    title: "Healthy Smile, Happy Life.",
    subtitle: "Modern dental care with comfort and trust",
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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HappyPatients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const APP_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [formData, setFormData] = useState({
    service: "",
    fullname: "",
    email: "",
    date: "",
    time: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);
  /* HANDLE INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages while typing
    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  /* HANDLE FORM SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (isSubmitting) return;

    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (
      !formData.service ||
      !formData.fullname ||
      !formData.email ||
      !formData.date ||
      !formData.time ||
      !formData.phone
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${APP_URL}/api/appointments/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle invalid JSON response
      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      // Handle backend errors
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to book appointment");
      }

      // Success
      setSuccessMessage(data.message || "Appointment booked successfully!");

      // Reset form
      setFormData({
        service: "",
        fullname: "",
        email: "",
        date: "",
        time: "",
        phone: "",
      });
    } catch (error) {
      console.error("Appointment Error:", error);

      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <HeroSlider slides={slides} />
      {/* APPOINTMENT STRIP */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 -mt-16 md:-mt-6"
      >
        <div className="w-full px-6 -mt-24 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border rounded-xl overflow-hidden shadow-xl">
            {/* LEFT HALF */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* EMERGENCY */}
              <div className="bg-accent text-white p-8">
                <h3 className="text-xl font-semibold mb-3">Emergency Cases</h3>
                <p
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <FaWhatsapp size={16} />
                  <a
                    href="https://wa.me/9779803421766"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +9779803421766
                  </a>
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "8px",
                  }}
                >
                  <HugeiconsIcon icon={TelephoneIcon} />
                  <a href="tel:+977014962513" rel="noopener noreferrer">
                    014962513
                  </a>
                </p>
              </div>

              {/* OPENING HOURS */}
              <div className="bg-secondary text-white p-8">
                <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>

                <div className="flex  justify-between">
                  <span>Sunday - Friday</span>
                  <span>10:00 - 6:00</span>
                </div>

                <div className="flex justify-between mt-2">
                  <span>Saturday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* RIGHT HALF */}
            <div className="bg-primary text-white p-8 ">
              <h3 className="text-xl font-semibold mb-6">
                Make an Appointment
              </h3>

              {/* SUCCESS */}
              {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                  {successMessage}
                </div>
              )}

              {/* ERROR */}
              {errorMessage && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
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
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="p-3 rounded border text-black"
                >
                  <option value="">Select Services</option>

                  <option value="Teeth Whitening">Teeth Whitening</option>

                  <option value="Teeth Cleaning">Teeth Cleaning</option>

                  <option value="Quality Brackets">Quality Brackets</option>

                  <option value="Modern Anesthetic">Modern Anesthetic</option>

                  <option value="Consultation / Checkup">
                    Consultation / Checkup
                  </option>

                  <option value="Fillings / Root Canal">
                    Fillings / Root Canal
                  </option>

                  <option value="Tooth Extraction">Tooth Extraction</option>

                  <option value="Implants / Crowns">Implants / Crowns</option>

                  <option value="Braces / Orthodontics">
                    Braces / Orthodontics
                  </option>

                  <option value="Kids Dentistry">Kids Dentistry</option>

                  <option value="Emergency Care">Emergency Care</option>
                </select>

                {/* FULL NAME */}
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="p-3 rounded border text-black"
                />

                {/* EMAIL */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-3 rounded border text-black"
                />

                {/* DATE */}
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="p-3 rounded border text-black"
                />

                {/* TIME */}
                <select
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="p-3 rounded border text-black"
                >
                  <option value="">select time </option>
                  <option value="9:00">9:00 AM</option>
                  <option value="9:30">9:30 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 ApM</option>
                  <option value="1:00">1:00 PM</option>
                  <option value="2:00">2:00 PM</option>
                </select>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-3 rounded border text-black"
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
                alt={item.title}
                className="h-40 w-full object-cover"
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

      {/* WHY CHOOSE US */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0b2a4a]">Why Choose Us?</h2>
          <p className="text-gray-500 mt-2">
            Modern Dentistry with Comfort & Care
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Choices.map((choice, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-[#0b2a4a] font-semibold mb-2">
                {choice.title}
              </h3>
              <p className="text-gray-600 text-sm">{choice.description}</p>
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
                      alt={HappyPatients[activeIndex].name}
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
  );
};

export default Home;
