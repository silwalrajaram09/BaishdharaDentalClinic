
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";

import bishwo from "../assets/images/bishwo.jpg";
import dinesh from "../assets/images/dinesh.jpg";
import merina from "../assets/images/merina.jpg";
import about from "../assets/images/about.jpg";
import logo from "../assets/images/logo.png";


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

      {/* HERO */}
      <HeroSlider />

      {/* about*/}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        {/* IMAGE */}
        <motion.div
          variants={fadeLeft}
          whileHover={{ scale: 1.03 }}
          className="w-full h-105 bg-cover bg-center rounded-2xl shadow-xl"
          style={{ backgroundImage: `url(${about})` }}
        />

        {/* TEXT */}
        <motion.div variants={fadeRight}>
          <h2 className="text-4xl font-bold text-[#0b2a4a] mb-5">
            About Us
          </h2>

          <p className="text-gray-600 leading-relaxed text-justify">
            Welcome to Baishdhara Dental Clinic, where smiles are crafted with
            care and confidence. Our clinic blends expertise, innovation, and
            personalized care to ensure every patient feels comfortable.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed text-justify">
            From routine check-ups to advanced smile transformations, we are
            committed to delivering a brighter, healthier, and more confident
            smile.
          </p>
        </motion.div>
      </motion.div>

      {/* doctors */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#0b2a4a]">
            Meet Our Doctors
          </h2>
          <p className="text-gray-500 mt-2">
            Experienced professionals dedicated to your smile
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {[
            {
              name: "Dr. Bishwo Prachanda Sedhain",
              role: "Oral Surgeon",
              img: bishwo,
              link: "/doctor/bishwo",
            },
            {
              name: "Dr. Dinesh Sharma Bhusal",
              role: "Prosthodontist",
              img: dinesh,
              link: "/doctor/dinesh",
            },
            {
              name: "Dr. Merina Joshi",
              role: "Orthodontist",
              img: merina,
              link: "/doctor/merina",
            },
          ].map((doc, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition text-center"
            >
              <div
                className="w-36 h-36 mx-auto rounded-full bg-cover bg-center shadow-lg border-4 border-white"
                style={{ backgroundImage: `url(${doc.img})` }}
              />

              <h3 className="mt-5 font-semibold text-[#0b2a4a]">
                {doc.name}
              </h3>

              <p className="text-gray-500 text-sm">{doc.role}</p>

              <Link
                to={doc.link}
                className="inline-block mt-3 text-blue-500 text-sm hover:underline"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

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
              <p className="text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;