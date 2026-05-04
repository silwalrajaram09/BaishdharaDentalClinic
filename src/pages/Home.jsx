import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import Contact from "../components/Contact";
import bg1 from "../assets/images/bg_1.jpg";
import bg2 from "../assets/images/bg_2.jpg";
import ex1 from "../assets/images/cosmetic-dentistry.jpeg";
import ex2 from "../assets/images/orthodontic.jpeg";
import ex3 from "../assets/images/Minor-Oral-Surgery.jpeg";
import ex4 from "../assets/images/rct.jpeg";
import ex5 from "../assets/images/scaling.jpeg";
import ex6 from "../assets/images/Xray.jpeg";
import { motion } from "framer-motion";
import { div, h2, img } from "framer-motion/client";
import { AnimatePresence } from "framer-motion";
import maskey from '../assets/images/maskey.png';
import saroj from "../assets/images/saroj.png";
import salik from "../assets/images/adhikary.png";

const Expertise = [
  { title: "Cosmetic Dentistry", img: ex1, link: "/services" },
  { title: "Orthodontics", img: ex2, link: "/services" },
  { title: "Pediatric Dentistry", img: ex3, link: "/services" },
  { title: "Endodontics", img: ex4, link: "/services" },
  { title: "Periodontics", img: ex5, link: "/services" },
  { title: "Oral Surgery", img: ex6, link: "/services" },
];

const Choices = [
  {
    title: "Experienced Dental Professionals",
    description:
      "We have experienced dentists who provide the best dental care for you and your family.",
  },
  {
    title: "Modern Technology & Equipment",
    description:
      "We use the latest technology to ensure safe, effective, and comfortable treatments.",
  },
  {
    title: "Reasonable Prices",
    description:
      "We offer affordable pricing with discounts and promotions for loyal customers.",
  },
  {
    title: "Friendly & Helpful Team",
    description:
      "Our staff is always ready to assist and make your visit comfortable.",
  },
  {
    title: "Hygienic & Tidy Environment",
    description:
      "We maintain strict hygiene standards and infection control protocols.",
  },
  {
    title: "Flexible Payment Options",
    description: "We accept multiple payment methods for your convenience.",
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
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HappyPatients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
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
        className="max-w-6xl mx-auto -mt-24 relative z-20"
      >
        <div className="w-full px-6 -mt-24 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-xl">
            {/* LEFT HALF */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* EMERGENCY */}
              <div className="bg-teal-500 text-white p-8">
                <h3 className="text-xl font-semibold mb-3">Emergency Cases</h3>
                <p>9803421766</p>
                <p>014962513</p>
              </div>

              {/* OPENING HOURS */}
              <div className="bg-cyan-500 text-white p-8">
                <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>

                <div className="flex justify-between">
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
            <div className="bg-blue-500 text-white p-8">
              <h3 className="text-xl font-semibold mb-6">
                Make an Appointment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select className="p-3 rounded border text-black">
                  <option>Select Services</option>
                  <option>General Checkup</option>
                  <option>Teeth Cleaning</option>
                  <option>Fillings</option>
                  <option>Root Canal</option>
                  <option>Dental Implants</option>
                </select>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 rounded border text-black"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded border text-black"
                />

                <input type="date" className="p-3 rounded border text-black" />
                <input type="time" className="p-3 rounded border text-black" />
                <input
                  type="text"
                  placeholder="Phone"
                  className="p-3 rounded border text-black"
                />

                <button
                  className="sm:col-span-3 bg-blue-700 py-3 border-blue-900 rounded hover:bg-blue-800 transition"
                  onClick={() => navigate("/appointment")}
                >
                  Make Appointment
                </button>
              </div>
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                <span className="text-blue-500 text-xs font-medium">
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
            Excellence in every detail, comfort in every visit
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
        className="bg-gray-100 py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-blue-500 mb-12">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-blue-500"
            >
              ‹
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={() =>
                setActiveIndex((activeIndex + 1) % HappyPatients.length)
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-blue-500"
            >
              ›
            </button>

            {/* SLIDE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="px-10"
              >
                <div className="flex flex-col items-center">
                  {/* Avatar (optional placeholder) */}
                  <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center text-2xl font-bold text-blue-500 mb-4">
                    <img
                      src={HappyPatients[activeIndex].img}
                      alt={HappyPatients[activeIndex].name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-blue-600">
                    {HappyPatients[activeIndex].name}
                  </h3>

                  <p className="text-sm text-gray-500 mb-6">
                    {HappyPatients[activeIndex].work}
                  </p>

                  <p className="text-gray-700 max-w-2xl leading-relaxed">
                    {HappyPatients[activeIndex].opinion}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* DOTS */}
            <div className="flex justify-center gap-2 mt-8">
              {HappyPatients.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-red-500" : "w-4 bg-blue-400"
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
