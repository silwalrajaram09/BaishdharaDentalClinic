import { motion } from "framer-motion";

import bhushalTeeth from "../assets/images/bhushalTeeth.png";

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

// ─── Animation variants ───────────────────────────────────────────────────────
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
// ─────────────────────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-1 sm:py-10 lg:py-10">
      {/* ── Decorative background blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-blue-100/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-sky-100/60 blur-3xl"
      />

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
          

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#0b2a4a] sm:text-4xl lg:text-[2.6rem]">
            Why Choose Us?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Modern Dentistry with Comfort & Care
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 sm:mt-20"
        >
          {/* BACKGROUND GLOW */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200/30 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-cyan-200/20 blur-3xl rounded-full pointer-events-none" />

          {/* MAIN IMAGE WRAPPER */}
          <div
            className="
      group
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-white/20
      bg-white/40
      backdrop-blur-xl
      shadow-[0_20px_70px_-15px_rgba(11,42,74,0.22)]
    "
          >
            {/* IMAGE */}
            <img
              src={bhushalTeeth}
              alt="Bhushal Dental Clinic"
              loading="lazy"
              className="
        w-full

        /* RESPONSIVE HEIGHT */
        h-[240px]
        xs:h-[280px]
        sm:h-[380px]
        md:h-[460px]
        lg:h-[560px]

        /* IMPORTANT */
        object-contain
        bg-[#dceffd]

        /* IMAGE POSITION */
        object-center

        /* SMOOTH EFFECT */
        transition-transform
        duration-700
        ease-out

        group-hover:scale-[1.02]
      "
            />

            {/* OVERLAY */}
            <div
              className="
        absolute
        inset-0
        bg-gradient-to-t
        from-[#0b2a4a]/70
        via-[#0b2a4a]/15
        to-transparent
      "
            />

            {/* SHINE EFFECT */}
            <div
              className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-700
        bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]
        translate-x-[-120%]
        group-hover:translate-x-[120%]
      "
            />

            {/* FLOATING STATS CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
        absolute
        top-3
        right-3
        sm:top-5
        sm:right-5

        grid
        grid-cols-3
        gap-3
        sm:gap-5

        rounded-2xl
        border
        border-white/20
        bg-white/15
        backdrop-blur-xl

        px-4
        py-3
        sm:px-5
        sm:py-4

        shadow-2xl
      "
            >
              {[
                { value: "15+", label: "Years" },
                { value: "12k+", label: "Patients" },
                { value: "98%", label: "Happy" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="
              text-sm
              sm:text-lg
              md:text-xl
              font-bold
              text-white
            "
                  >
                    {stat.value}
                  </p>

                  <p
                    className="
              mt-1
              text-[9px]
              sm:text-[11px]
              uppercase
              tracking-wider
              text-blue-100
            "
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* BOTTOM BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="mt-5 flex justify-center px-3"
          >
            <div
              className="
        inline-flex
        items-center
        gap-3

        rounded-full
        border
        border-gray-200

        bg-white/90
        backdrop-blur-lg

        px-4
        py-2
        sm:px-6
        sm:py-3

        shadow-lg
      "
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>

              <span
                className="
          text-[11px]
          sm:text-sm
          font-medium
          text-gray-600
          text-center
        "
              >
                Accepting new patients — Book your consultation today
              </span>
            </div>
          </motion.div>
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
              <div
                className="
                relative mb-5 flex h-12 w-12 items-center justify-center
                rounded-xl bg-gradient-to-br from-blue-50 to-sky-100
                text-blue-600 ring-1 ring-blue-100
                group-hover:from-blue-100 group-hover:to-sky-200
                transition-colors duration-300
              "
              >
                {choice.icon}
              </div>

              {/* Text */}
              <h3 className="relative mb-2 text-[0.95rem] font-semibold text-[#0b2a4a]">
                {choice.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-gray-500">
                {choice.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Image showcase ── */}
      </div>
    </section>
  );
}
