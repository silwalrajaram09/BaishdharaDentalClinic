import { motion } from "framer-motion";
// import HeroSection from "../components/HeroSection";
// import doctor from "../assets/images/doctor.PNG";
import about from "../assets/images/about.jpg";
import logo from "../assets/images/logo.png";

import TeamSection from "../components/TeamSection";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7 },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const About = () => {
  return (
    <div className="bg-gray-50 overflow-hidden">
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        {/* TOP HEADING */}
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className="text-5xl font-bold text-[#0b2a4a]">About Us</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Creating confident smiles with modern dental care and a personal
            touch.
          </p>
        </motion.div>

        {/* IMAGE + TEXT */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <motion.div
            variants={fadeLeft}
            whileHover={{ scale: 1.03 }}
            className="w-full h-[450px] bg-cover bg-center rounded-3xl shadow-2xl"
            style={{ backgroundImage: `url(${about})` }}
          />

          {/* TEXT */}
          <motion.div variants={fadeRight}>
            <h3 className="text-3xl font-semibold text-[#0b2a4a] mb-5">
              Welcome to Baishdhara Dental Clinic
            </h3>

            <p className="text-gray-600 leading-relaxed text-justify">
              Welcome to Baishdhara Dental Clinic, where smiles are crafted with
              care and confidence. Our clinic blends expertise, innovation, and
              personalized care to ensure every patient feels comfortable.
            </p>

            <p className="text-gray-600 mt-5 leading-relaxed text-justify">
              From routine check-ups to advanced smile transformations, we are
              committed to delivering a brighter, healthier, and more confident
              smile for every patient and family.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* doctors */}

      <TeamSection />
      {/* story*/}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 bg-[#f8f9fb]"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* TOP */}
          <motion.div
            variants={fadeUp}
            className="grid md:grid-cols-2 items-center mb-14"
          >
            <div>
              <h2 className="text-5xl font-semibold text-[#1a2a3a]">
                Our Story
              </h2>
              <p className="text-xl text-gray-500 mt-2">
                Your Family Dentist Since 2021
              </p>
            </div>

            <div className="text-center mt-8 md:mt-0">
              <motion.img
                src={logo}
                alt="logo"
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="w-40 mx-auto rounded-full border-4 border-blue-500 p-2 shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-3">
                Inspired by the historic Baishdhara heritage.
              </p>
            </div>
          </motion.div>

          {/* TEXT BLOCKS */}
          {[
            {
              title: "Welcome to Baishdhara Dental Clinic",
              text: "We provide expert care with a personal touch. Located in Balaju, Kathmandu, we deliver high-quality, affordable dental services for every family.",
            },
            {
              title: "What We Specialize In",
              text: "Dental Implants, Cosmetic Dentistry, and Oral Surgery performed with modern technology and patient comfort.",
            },
            {
              title: "Our Legacy",
              text: "Inspired by Baishdhara’s heritage, we continue a tradition of care, precision, and service to the community.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="max-w-4xl mx-auto mb-10"
            >
              <h3 className="text-2xl font-semibold text-[#1a2a3a] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
