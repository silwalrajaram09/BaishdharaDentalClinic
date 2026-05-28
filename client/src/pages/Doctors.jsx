import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";
import { doctors } from "../data/doctors.js";

const Doctors = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* HERO */}
      <HeroSlider />

      {/* TITLE */}
      <div className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Doctors
        </h1>
        <p className="text-gray-500 mt-2">
          Meet our experienced dental specialists
        </p>
      </div>

      {/* DOCTOR CARDS */}
      <div className="max-w-6xl mx-auto px-4 pb-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="h-56 overflow-hidden">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">
              <h2 className="text-lg font-bold text-gray-800">
                {doc.name}
              </h2>

              <p className="text-sm text-blue-600 mt-1">
                {doc.title}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                {doc.specialization}
              </p>

              {/* BUTTON */}
              <Link to={`/doctor/${doc.id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition">
                  View Profile
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;