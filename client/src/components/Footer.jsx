import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "../assets/images/logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gray-100 border-t"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* COLUMN 1 */}
        <motion.div variants={itemVariants}>
          <Link to="/" className="flex items-center space-x-3 mb-3">
            <img src={Logo} alt="logo" className="h-14" />

            <div className="flex flex-col leading-tight">
              <span className="font-bold text-xl text-blue-600">
                BAISHDHARA
              </span>

              <span className="text-sm text-gray-500">Dental Clinic</span>
            </div>
          </Link>

          <p className="text-sm text-gray-500 leading-relaxed">
            Your family dentist since 2021
            <br />
            Balaju, Kathmandu
          </p>
        </motion.div>

        {/* COLUMN 2 */}
        <motion.div variants={itemVariants}>
          <h6 className="font-semibold mb-3 text-gray-800">Quick Links</h6>

          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <Link className="hover:text-blue-600 transition" to="/">
              Home
            </Link>

            <Link className="hover:text-blue-600 transition" to="/about">
              About
            </Link>

            <Link className="hover:text-blue-600 transition" to="/doctors">
              Doctors
            </Link>

            <Link className="hover:text-blue-600 transition" to="/services">
              Services
            </Link>

            <Link className="hover:text-blue-600 transition" to="/pricing">
              Pricing
            </Link>

            <Link className="hover:text-blue-600 transition" to="/my-teeth">
              मेरो दाँत
            </Link>
          </div>
        </motion.div>

        {/* COLUMN 3 */}
        <motion.div variants={itemVariants}>
          <h6 className="font-semibold mb-3 text-gray-800">Contact</h6>

          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              Balaju, Kathmandu
            </p>

            <p className="flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              +977-9803421766
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              info@baishdharadental.com
            </p>
          </div>
        </motion.div>

        {/* COLUMN 4 */}
        <motion.div variants={itemVariants}>
          <h6 className="font-semibold mb-3 text-gray-800">Follow Us</h6>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 mb-5">
            <motion.a
              whileHover={{ scale: 1.15 }}
              href="#"
              className="p-2 bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              <FaFacebookF />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15 }}
              href="#"
              className="p-2 bg-gray-200 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15 }}
              href="#"
              className="p-2 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              <FaYoutube />
            </motion.a>
          </div>

          {/* NEWSLETTER */}
          <h6 className="font-semibold mb-2 text-gray-800">Newsletter</h6>

          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Subscribe
          </motion.button>
        </motion.div>
      </div>

      {/* BOTTOM */}
      <motion.div
        variants={itemVariants}
        className="border-t py-4 text-center text-sm text-gray-500"
      >
        © 2025 Baishdhara Dental Clinic. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
