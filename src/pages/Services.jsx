import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../Data/services.js";
import HeroSection from "../components/HeroSection.jsx";
import service from "../assets/images/image_4.jpg";

const Services = () => {
  return (
    <>
      <HeroSection
        bgImage={service}
        title="Our Dental Services"
        subtitle="Comprehensive care for your smile"
      />  
   
    <div className="bg-gray-50 min-h-screen py-16">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Our Services</h2>
        <p className="text-gray-600 mt-2">
          Comprehensive dental care for your smile
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 text-center"
          >

            {/* IMAGE */}
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border mb-4">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-blue-700">
              {service.title}
            </h3>

            {/* SHORT DESCRIPTION */}
            <p className="text-sm text-gray-600 mt-2">
              {service.intro}
            </p>

            {/* LINK */}
            <Link to={`/services/${service.id}`}>
              <button className="mt-4 text-blue-600 font-semibold hover:underline">
                Learn More →
              </button>
            </Link>

          </motion.div>
        ))}

      </div>
    </div>
    </>
  );
};

export default Services;