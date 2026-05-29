import { motion } from "framer-motion";

import bishwo from "../assets/images/drSedhain.jpeg";
import dinesh from "../assets/images/drDinesh.jpeg";
import merina from "../assets/images/drMerina.jpeg";
import staff1 from "../assets/images/staff1.jpeg";
import staff2 from "../assets/images/staff2.jpeg";

const team = [
  {
    name: "Dr. Bishwo Prachanda Sedhain",
    role: "Oral Surgeon",
    img: bishwo,
  },
  {
    name: "Dr. Dinesh Sharma Bhusal",
    role: "Prosthodontist",
    img: dinesh,
  },
  {
    name: "Dr. Merina Joshi",
    role: "Orthodontist",
    img: merina,
  },
  {
    name: "name name ",
    role: "General Dentist",
    img: staff1,
  },
  {
    name: "name name ",
    role: "Dental Hygienist",
    img: staff2,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const TeamSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[#f0f5fa]">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#c8dff5] rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b8d4ee] rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#2e7fc1] mb-3">
            Our Specialists
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0b2a4a] leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Meet Our Team
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#2e7fc1]" />
          <p className="mt-4 text-gray-500 text-base max-w-md mx-auto">
            Experienced professionals dedicated to your smile
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex flex-col items-center"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500">
                {/* Photo */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Bottom gradient + info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a]/80 via-[#0b2a4a]/10 to-transparent" />

                {/* Name & Role pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p
                    className="text-white font-semibold text-sm leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {member.name}
                  </p>
                  <span className="inline-block mt-1 text-[#7ec8f4] text-xs font-medium tracking-wide">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Thin accent line below card */}
              <div className="mt-3 w-8 h-0.5 rounded-full bg-[#2e7fc1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
