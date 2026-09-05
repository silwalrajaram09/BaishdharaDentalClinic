import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doctors } from "../data/doctors.js";
import { BadgeCheck, Clock } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


const DoctorCard = ({ doc }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#2e7fc1]/40 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
  >
    <Link
      to={`/doctor/${doc.id}`}
      aria-label={`View profile of Dr. ${doc.name}`}
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
        {/* <span className="absolute bottom-2.5 left-2.5 text-[11px] font-medium text-[#2e7fc1] bg-white border border-gray-200 rounded-full px-2.5 py-1 leading-none">
          {doc.title}
        </span> */}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-lg md:text-xl font-semibold font-playfair text-[#0b2a4a] leading-snug mb-0.5">
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

const MeetOurDoctors = () => (
  <>
    <section aria-labelledby="meet-doctors-heading" className="bg-[#f4f7fb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Header */}
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3b7dbd] sm:text-xs">Our specialists</p>
          <h2 id="meet-doctors-heading" className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-[#0b2a4a] sm:text-4xl">
            Meet Our Doctors
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-[#86c7dc]" />
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#71808c]">
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
        className="mx-auto mt-9 grid max-w-5xl grid-cols-2 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3 md:gap-6"
      >
        {doctors.map((doc, index) => (
          <div key={doc.id} className={index === doctors.length - 1 && doctors.length % 2 === 1 ? "col-span-2 mx-auto w-[calc(50%-0.5rem)] md:col-span-1 md:mx-0 md:w-auto" : ""}>
            <DoctorCard doc={doc} />
          </div>
        ))}
      </motion.div>
    </section>
  </>
);

export default MeetOurDoctors;
