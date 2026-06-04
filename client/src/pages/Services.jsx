import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../Data/services.js";
import Gallery from "../components/Gallery.jsx";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/services/${service.slug}`)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer
                 shadow-md hover:shadow-2xl transition-all duration-300 group"
      role="button"
      tabIndex={0}
      aria-label={`View ${service.title}`}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/services/${service.slug}`)
      }
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0b2a4a] to-[#1a4a7a]">
        <img
          src={service.heroImage}
          alt={service.title}
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: service.objectPos || "center" }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"></div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3
          className="text-[#0b2a4a] font-bold text-lg mb-2 line-clamp-2 min-h-14"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {service.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.intro}</p>

        <span className="inline-flex items-center gap-2 text-[#2e7fc1] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="bg-liniear-to-b from-[#f4f7fb] to-white min-h-screen">
      {/* Hero Section */}

      <div className="max-w-6xl mx-auto px-4 pt-20 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-[#2e7fc1] mb-3">
            Our Specialists
          </span>
          <h1
            className="text md:text-3xl font-bold text-[#0b2a4a]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Dental Services
          </h1>
          <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-[#2e7fc1]" />
          <p className="mt-4 text-gray-400 max-w-sm mx-auto text-sm">
            Comprehensive dental care with advanced technology and personalized
            attention for your perfect smile
          </p>
        </motion.div>
      </div>

      {/* Services Grid - 3 items per row */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>

      {/* <Gallery /> */}
    </div>
  );
};

export default Services;
