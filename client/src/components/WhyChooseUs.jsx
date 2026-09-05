import { motion } from "framer-motion";

const CHOICES = [
  {
    title: "Experienced Dental Team",
    description:
      "Skilled professionals focused on safe, precise, and personalized treatment.",
    icon: (
      <>
        <path d="M12 3a5 5 0 0 0-5 5c0 3 2.2 5.2 5 8 2.8-2.8 5-5 5-8a5 5 0 0 0-5-5Z" />
        <path d="M12 16v5M9 21h6M8 10H5a2 2 0 0 0-2 2v3M16 10h3a2 2 0 0 1 2 2v3" />
        <circle cx="12" cy="8" r="1" />
      </>
    ),
  },
  {
    title: "Advanced Technology",
    description:
      "Modern equipment and digital dentistry for accurate and comfortable care.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M7 21h10M9 17v4M15 17v4M7 8h10M7 11h6" />
        <circle cx="18" cy="11" r="1" />
      </>
    ),
  },
  {
    title: "Clean & Safe Environment",
    description:
      "Strict sterilization and hygiene protocols for your safety and peace of mind.",
    icon: (
      <>
        <path d="M12 21s8-3.7 8-10V5l-8-3-8 3v6c0 6.3 8 10 8 10Z" />
        <path d="m8.5 12 2.3 2.3 4.8-5" />
      </>
    ),
  },
  {
    title: "Comfortable Patient Experience",
    description:
      "Gentle care and a supportive team to make every visit stress-free.",
    icon: (
      <>
        <path d="M5 14v-2a7 7 0 0 1 14 0v2" />
        <path d="M5 14H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2v-4ZM19 14h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2v-4Z" />
        <path d="M8 20h8M12 18v2" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
      </>
    ),
  },
  {
    title: "Transparent & Affordable Care",
    description:
      "Quality dental treatments with fair pricing and flexible payment options.",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" />
        <circle cx="17" cy="15" r="1" />
      </>
    ),
  },
  {
    title: "Comprehensive Dental Services",
    description:
      "From routine checkups to advanced smile restoration — all in one place.",
    icon: (
      <>
        <path d="M12 3c-3-2-7 0-7 4 0 5 2 6 3 11 .4 1.8 1.4 3 2.5 3 1.3 0 1.4-3 1.5-5h2c.1 2 .2 5 1.5 5 1.1 0 2.1-1.2 2.5-3 1-5 3-6 3-11 0-4-4-6-7-4Z" />
        <path d="M12 3v13" />
        <path d="M9 8h6" />
      </>
    ),
  },
];

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

function ChoiceIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 sm:h-8 sm:w-8"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="relative overflow-hidden bg-[#f5f8fa] px-4 py-3 sm:px-3 sm:py-3 lg:px-8 lg:py-2"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-[#d9eef5]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#e4eefa]/75 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardMotion}
          className="mx-auto max-w-2xl text-center"
        >
          {/* <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3b7dbd] sm:text-xs">
            The Baishdhara difference
          </p> */}
          <h2
            id="why-choose-us-heading"
            className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-[#0b2a4a] sm:text-4xl lg:text-5xl"
          >
            Why Choose Us?
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-[#86c7dc]" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#647581] sm:text-base">
            Modern dentistry with comfort, care, and confidence at every visit.
          </p>
        </motion.header>

        <motion.div
          variants={gridMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-9 grid grid-cols-2 items-start gap-3 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {CHOICES.map((choice, index) => (
            <motion.article
              key={choice.title}
              variants={cardMotion}
              whileHover={{ y: -5 }}
              className={`group h-full ${index % 2 === 1 ? "mt-5 sm:mt-0" : ""}`}
            >
              <div className="flex h-full min-h-[190px] flex-col rounded-[1.25rem] border border-[#e1ebf0] bg-white p-4 text-left shadow-[0_14px_30px_-23px_rgba(11,42,74,0.6)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#b8d9e6] hover:bg-[#fcfeff] hover:shadow-[0_22px_42px_-24px_rgba(11,42,74,0.45)] sm:min-h-[205px] sm:rounded-[1.75rem] sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[0.92rem] font-bold leading-tight tracking-[-0.025em] text-[#0b2a4a] sm:text-xl">
                    {choice.title}
                  </h3>
                  <ChoiceIcon>{choice.icon}</ChoiceIcon>
                </div>
                <p className="mt-3 text-[0.78rem] leading-5 text-[#687985] sm:text-sm sm:leading-6">
                  {choice.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
