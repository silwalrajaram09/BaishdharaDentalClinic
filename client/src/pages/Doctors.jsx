import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doctors } from "../data/doctors.js";
import HeroSection from "../components/HeroSection";
import doctor from "../assets/images/doctor.PNG";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const DoctorCard = ({ doc }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 flex flex-col"
  >
    {/* ── Avatar Photo Section ── */}
    <div className="relative pt-8 px-6 pb-4 bg-gradient-to-b from-[#eef3f8] to-[#f5f8fb]">
      {/* Rounded Avatar Container - like professional ID photo */}
      <div className="relative w-36 h-36 mx-auto">
        {/* Decorative ring on hover */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#2e7fc1] to-[#5ba3d9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

        {/* Image container with rounded corners */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white">
          <img
            src={doc.image}
            alt={`Dr. ${doc.name}`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/fallback-avatar.jpg";
              e.target.onerror = null;
            }}
          />
        </div>

      </div>
    </div>

    {/* ── Info ── */}
    <div className="flex flex-col flex-1 p-6 pt-8 bg-white text-center">
      <h2
        className="text-xl font-bold text-[#0b2a4a] leading-tight mb-1"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
       {doc.name}
      </h2>

      <p className="text-sm text-[#2e7fc1] font-medium mb-4">{doc.title}</p>

      {/* Rating stars (optional) */}
      {doc.rating && (
        <div className="flex justify-center gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < doc.rating ? "text-yellow-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4">
        <Link
          to={`/doctor/${doc.id}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0b2a4a] text-white text-sm font-semibold hover:bg-[#2e7fc1] transition-all duration-200 group/btn w-full"
        >
          <span>View Profile</span>
          <span className="inline-block translate-x-0 group-hover/btn:translate-x-1 transition-all duration-200">
            →
          </span>
        </Link>
      </div>
    </div>
  </motion.div>
);

const Doctors = () => {
  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      {/* Hero */}
      {/* <HeroSection
        bgImage={doctor}
        title="Your Smile, Our Priority."
        subtitle="Comfortable, modern, and personalized dental care"
      /> */}

      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#2e7fc1] mb-3">
            Our Specialists
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#0b2a4a]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Meet Our Doctors
          </h1>
          <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-[#2e7fc1]" />
          <p className="mt-4 text-gray-500 max-w-md mx-auto text-base">
            A team of experienced dental specialists committed to your oral
            health
          </p>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-6xl mx-auto px-4 pb-20 pt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doc={doc} />
        ))}
      </motion.div>
    </div>
  );
};

export default Doctors;
