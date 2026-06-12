import { motion } from "framer-motion";
import about from "../assets/images/about.jpg";
import logo from "../assets/images/logo.png";
import nextLogo from "../assets/images/nextLogo.PNG";
import { Pointer as PointerIcon } from "lucide-react";

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
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h1
            className="text md:text-3xl font-bold text-[#0b2a4a]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            About Us
          </h1>
          <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-[#2e7fc1]" />
          <p className="mt-4 text-gray-500 max-w-md mx-auto text-base">
            Creating confident smiles with modern dental care and a personal
            touch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeLeft}
            whileHover={{ scale: 1.03 }}
            className="w-full aspect-[4/3] md:aspect-[16/9] min-h-[260px] bg-cover bg-center rounded-3xl shadow-2xl"
            style={{ backgroundImage: `url(${about})` }}
          />

          {/* TEXT */}
          <motion.div variants={fadeRight} className="space-y-5">
            <div className="flex items-start gap-3">
              <PointerIcon className="w-5 h-5 text-[#0b2a4a] rotate-90 mt-1 flex-shrink-0" />
              <p className="text-gray-600 leading-relaxed text-justify">
                At Baishdhara Dental Clinic, we create healthy, confident smiles
                through expert care and a personal touch. Located in Balaju,
                Kathmandu, we combine modern dental technology with genuine
                compassion to deliver precise, comfortable, and trusted
                treatment for every patient.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <PointerIcon className="w-5 h-5 text-[#0b2a4a] rotate-90 mt-1 flex-shrink-0" />
              <p className="text-gray-600 leading-relaxed text-justify">
                Founded in 2021 and inspired by the heritage of Baishdhara, our
                mission is simple — make high-quality, ethical, and affordable
                dental care accessible to every family. From routine checkups to
                advanced implants and smile transformations, every treatment is
                designed with accuracy, transparency, and long-term oral health
                in mind.
              </p>
            </div>

            <div className="flex items-start  gap-3">
              <PointerIcon className="w-5 h-5 text-[#0b2a4a] rotate-90 mt-1 flex-shrink-0" />
              <p className="text-gray-600 leading-relaxed text-justify">
                Our Promise: Expert care, Honest guidance, Lasting confidence.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

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

          <div className="max-w-6xl mx-auto px-4  pb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              
              <h1
                className="text md:text-3xl font-bold text-[#0b2a4a]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Story
              </h1>
              <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-[#2e7fc1]" />
              <p className="mt-4 text-gray-400 max-w-sm mx-auto text-sm">
               Your family Dentist Since 2021
              </p>
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            className=" md:grid-cols-2 items-center mb-14"
          >
          
            <div className="text-center mt-8 md:mt-0">
              <motion.img
                src={nextLogo}
                alt="logo"
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="w-40 mx-auto rounded-full  p-2 shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-3">
                Inspired by the historic Baishdhara heritage.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
