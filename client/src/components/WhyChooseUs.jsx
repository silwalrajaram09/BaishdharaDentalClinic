import { motion } from "framer-motion";

import aboutTeeth from "../assets/images/aboutTeeth.jpg";
import { Link } from "react-router-dom";
import changeImage from "../assets/images/teethImage.jpg";

const Choices = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2a7 7 0 0 1 7 7c0 4-3.5 8-7 11C8.5 17 5 13 5 9a7 7 0 0 1 7-7z" />
        <path d="M12 9v.01" />
      </svg>
    ),
    title: "Experience Dental Team",
    description:
      "Skilled professionals focused on safe, precise, and personalized treatment",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Advanced Technology",
    description:
      "Modern equipment and digital dentistry for accurate and comfortable care.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 17h7M17 14v7" />
      </svg>
    ),
    title: "Clean & Safe Environment",
    description:
      "Strict sterilization and hygiene protocols for your safety and peace of mind.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M12 12h.01" />
        <path d="M8 12h.01M16 12h.01" />
      </svg>
    ),
    title: "Comfortable & Patients Experience",
    description:
      "Gentle care and a supportive team to make every visit stress-free.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Transparent & Affordable Care",
    description:
      "Quality dental treatments with fair pricing and flexible payment options.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Conprehensice Dental Services",
    description:
      "From routine checkups to advanced smile restoration — all in one place.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-1  sm:py-10 lg:py-5">
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-120 w-[480px] rounded-full bg-blue-100/50 blur-3xl"
      /> */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-100 w-100 rounded-full bg-sky-100/60 blur-3xl"
      /> */}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mb-14 text-center sm:mb-16"
        >
          {/* Badge */}

          <h2 className="mt-3 text-2xl md:text-3xl font-bold font-playfair leading-tight tracking-tight text-[#0b2a4a]">
            Why Choose Us?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Modern Dentistry with Comfort & Care
          </p>
        </motion.div>

        
        {/* ── Feature cards ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 py-5 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
        >
          {Choices.map((choice, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{
                y: -5,
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              className="
                group relative overflow-hidden
                rounded-2xl border border-gray-100
                bg-white p-6
                shadow-[0_2px_16px_-4px_rgba(11,42,74,0.07)]
                hover:shadow-[0_8px_32px_-6px_rgba(11,42,74,0.13)]
                transition-shadow duration-300
              "
            >
              {/* Subtle hover shimmer overlay */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0 rounded-2xl
                  bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0
                  group-hover:from-blue-50/60 group-hover:to-sky-50/40
                  transition-all duration-500
                "
              />

              {/* Icon container */}
              <div className="flex gap-5">
                {/* <div
                  className="
                relative mb-5 flex h-12 w-12 items-center justify-center
                rounded-xl bg-gradient-to-br from-blue-50 to-sky-100
                text-blue-600 ring-1 ring-blue-100
                group-hover:from-blue-100 group-hover:to-sky-200
                transition-colors duration-300
              "
                >
                  {choice.icon}
                </div> */}

                {/* Text */}
                <h3 className="relative mb-2 text-[0.95rem] font-semibold text-[#0b2a4a]">
                  {choice.title}
                </h3>
              </div>

              <p className="relative text-sm leading-relaxed text-gray-500">
                {choice.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
