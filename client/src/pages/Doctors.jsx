import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doctors } from "../data/doctors.js";
import {
  ArrowLeft,
  BadgeCheck,
  Stethoscope,
  User,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-3 h-3 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const DoctorCard = ({ doc }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#2e7fc1]/40 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
  >
    <Link
      to={`/doctor/${doc.id}`}
      className="flex flex-col flex-1 outline-none"
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] bg-[#eef3f8] overflow-hidden">
        <img
          src={doc.image}
          alt={doc.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: doc.objectPos ?? "center top" }}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />

        {/* Fallback initials */}
        <div
          className="absolute inset-0 hidden items-center justify-center bg-[#ddeaf5]"
          aria-hidden="true"
        >
          <span
            className="text-4xl font-semibold text-[#2e7fc1]/60"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {doc.name
              ?.split(" ")
              .filter((w) => w.startsWith("Dr.") === false)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
        </div>

        {/* Specialty pill */}
        <span className="absolute bottom-2.5 left-2.5 text-[11px] font-medium text-[#2e7fc1] bg-white border border-gray-200 rounded-full px-2.5 py-1 leading-none">
          {doc.title}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <h2
          className="text-lg font-semibold text-[#0b2a4a] leading-snug mb-0.5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {doc.name}
        </h2>
        <p className="text-xs text-gray-400 mb-3">{doc.title}</p>
        
        {doc.nmc && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <BadgeCheck
              size={14}
              className="text-[#2e7fc1] flex-shrink-0"
              strokeWidth={1.8}
            />
            NMC: {doc.nmc}
          </div>
        )}
        {/* {doc.experience && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock
              size={14}
              className="text-[#2e7fc1] flex-shrink-0"
              strokeWidth={1.8}
            />
            {doc.experience}
          </div>
        )} */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
          <Clock
              size={14}
              className="text-[#2e7fc1] flex-shrink-0"
              strokeWidth={1.8}
            />
          {doc.experience && (
            <span className="text-[11px] text-gray-400">{doc.experience}</span>
          )}
        </div>
        {/* <Link
          to={`/doctor/${doc.id}`}
          className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-[#2e7fc1] hover:opacity-70 transition-opacity"
        >
          View profile
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link> */}
      </div>
    </Link>
  </motion.div>
);

const Doctors = () => (
  <div className="bg-[#f4f7fb] min-h-screen">
    {/* Header */}
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
          Meet Our Doctors
        </h1>
        <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-[#2e7fc1]" />
        <p className="mt-4 text-gray-400 max-w-sm mx-auto text-sm">
          Experienced dental specialists committed to your oral health
        </p>
      </motion.div>
    </div>

    {/* Grid */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="max-w-6xl mx-auto px-4 pb-20 pt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} doc={doc} />
      ))}
    </motion.div>
  </div>
);

export default Doctors;
