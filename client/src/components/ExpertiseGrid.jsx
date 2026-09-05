import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const svgProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

// General Dentistry
function GeneralDentistryIcon() {
  return (
    <svg {...svgProps}>
      <path d="M19 14c4-3 8-2 13 1 5-3 9-4 13-1 7 5 6 13 3 20-2 5-4 14-8 14-4 0-4-9-8-9s-4 9-8 9c-4 0-6-9-8-14-3-7-4-15 3-20Z" />
      <path d="M27 20c2-2 4-3 5-3s3 1 5 3" />
      <path d="M45 10v8" />
      <path d="M41 14h8" />
    </svg>
  );
}

// Dental Implant
function ImplantIcon() {
  return (
    <svg {...svgProps}>
      <path d="M21 19c0-6 5-10 11-10s11 4 11 10c0 6-5 10-11 10s-11-4-11-10Z" />
      <path d="M26 29v7h12v-7" />
      <path d="M27 36l3 19" />
      <path d="M37 36l-3 19" />
      <path d="M29 41h7" />
      <path d="M28 46h8" />
      <path d="M29 51h6" />
      <path d="M30 55h4" />
      <circle cx="32" cy="19" r="2" />
    </svg>
  );
}

// Orthodontics
function OrthodonticsIcon() {
  return (
    <svg {...svgProps}>
      <path d="M13 25c5-3 11-3 19 0 8-3 14-3 19 0" />

      <path d="M15 25v9c0 5 3 8 7 8" />
      <path d="M49 25v9c0 5-3 8-7 8" />

      {/* Braces wire */}
      <path d="M15 31c10 4 24 4 34 0" />

      {/* Brackets */}
      <rect x="18" y="28" width="7" height="7" rx="1" />
      <rect x="28.5" y="29" width="7" height="7" rx="1" />
      <rect x="39" y="28" width="7" height="7" rx="1" />

      {/* Alignment arrows */}
      <path d="M25 49h14" />
      <path d="M28 46l-3 3 3 3" />
      <path d="M36 46l3 3-3 3" />
    </svg>
  );
}

// Preventive Care
function PreventiveCareIcon() {
  return (
    <svg {...svgProps}>
      <path d="M18 16c4-4 9-3 14 0 5-3 10-4 14 0 6 5 5 13 2 20-2 5-4 12-8 12-4 0-4-8-8-8s-4 8-8 8c-4 0-6-7-8-12-3-7-4-15 2-20Z" />

      {/* Protection shield */}
      <path d="M43 36l7 3v5c0 6-4 9-7 11-3-2-7-5-7-11v-5l7-3Z" />

      <path d="M40 44l2 2 4-5" />
    </svg>
  );
}

// Root Canal
function RootCanalIcon() {
  return (
    <svg {...svgProps}>
      <path d="M20 15c4-4 8-3 12 0 4-3 8-4 12 0 6 5 5 13 2 20-2 5-4 13-8 13-4 0-4-8-6-8s-2 8-6 8c-4 0-6-8-8-13-3-7-4-15 2-20Z" />

      {/* Root canal instrument */}
      <path d="M32 27v23" />

      <path d="M28 30h8" />
      <path d="M28 34h8" />
      <path d="M28 38h8" />
      <path d="M28 42h8" />

      <path d="M32 23v4" />
      <circle cx="32" cy="20" r="3" />
    </svg>
  );
}

// Braces & Aligners
function BracesAlignersIcon() {
  return (
    <svg {...svgProps}>
      {/* Smile */}
      <path d="M12 27c12 7 28 7 40 0" />

      {/* Teeth */}
      <path d="M16 29v9c0 4 2 7 5 7" />
      <path d="M25 31v8c0 4 2 6 5 6" />
      <path d="M39 31v8c0 4-2 6-5 6" />
      <path d="M48 29v9c0 4-2 7-5 7" />

      {/* Brackets */}
      <rect x="18" y="30" width="7" height="7" rx="1" />
      <rect x="28.5" y="31" width="7" height="7" rx="1" />
      <rect x="39" y="30" width="7" height="7" rx="1" />

      {/* Spark */}
      <path d="M51 15v8" />
      <path d="M47 19h8" />
    </svg>
  );
}

// Pediatric Dentistry
function PediatricIcon() {
  return (
    <svg {...svgProps}>
      {/* Head */}
      <circle cx="32" cy="21" r="10" />

      {/* Hair */}
      <path d="M23 18c2-8 16-11 19 0" />

      {/* Eyes */}
      <circle cx="28" cy="21" r="1" fill="currentColor" />
      <circle cx="36" cy="21" r="1" fill="currentColor" />

      {/* Smile */}
      <path d="M28 26c2 2 6 2 8 0" />

      {/* Body */}
      <path d="M18 54c1-12 6-20 14-20s13 8 14 20" />

      {/* Arms */}
      <path d="M22 40l-7 9" />
      <path d="M42 40l7 9" />

      {/* Tooth */}
      <path d="M48 45c2-2 4-2 6 0 3 3 2 7 0 10-1 2-2 5-4 5-2 0-2-4-3-4-1 0-1 4-3 4-2 0-3-4-4-6" />
    </svg>
  );
}

// Cosmetic Dentistry
function CosmeticDentistryIcon() {
  return (
    <svg {...svgProps}>
      <path d="M19 15c4-4 9-3 13 0 4-3 9-4 13 0 6 5 5 13 2 20-2 5-4 12-8 12-4 0-4-8-7-8s-3 8-7 8c-4 0-6-7-8-12-3-7-4-15 2-20Z" />

      {/* Sparkles */}
      <path d="M48 10v9" />
      <path d="M43.5 14.5h9" />

      <path d="M54 25v5" />
      <path d="M51.5 27.5h5" />
    </svg>
  );
}

// Smile Restoration
function SmileRestorationIcon() {
  return (
    <svg {...svgProps}>
      {/* Tooth */}
      <path d="M19 16c4-4 9-3 13 0 4-3 9-4 13 0 6 5 5 13 2 20-2 5-4 13-8 13-4 0-4-8-7-8s-3 8-7 8c-4 0-6-8-8-13-3-7-4-15 2-20Z" />

      {/* Crown */}
      <path d="M25 20l3-6 4 4 4-4 3 6" />

      {/* Smile restoration */}
      <path d="M25 34c4 3 10 3 14 0" />
    </svg>
  );
}

const EXPERTISE = [
  {
    title: "General Dentistry",
    icon: GeneralDentistryIcon,
    link: "/services/general-dentistry",
  },
  {
    title: "Implantology",
    icon: ImplantIcon,
    link: "/services/dental-implants",
  },
  {
    title: "Orthodontics",
    icon: OrthodonticsIcon,
    link: "/services/braces-aligners",
  },
  {
    title: "Preventive Care",
    icon: PreventiveCareIcon,
    link: "/services/general-dentistry",
  },
  {
    title: "Root Canal Care",
    icon: RootCanalIcon,
    link: "/services/root-canal-treatment",
  },
  {
    title: "Braces & Aligners",
    icon: BracesAlignersIcon,
    link: "/services/braces-aligners",
  },
  {
    title: "Pediatric Dentistry",
    icon: PediatricIcon,
    link: "/services/pediatric-dentistry",
  },
  {
    title: "Cosmetic Dentistry",
    icon: CosmeticDentistryIcon,
    link: "/services/cosmetic-dentistry",
  },
  {
    title: "Smile Restoration",
    icon: SmileRestorationIcon,
    link: "/services/crown-bridges-dentures",
  },
];

const itemMotion = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const gridMotion = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

export default function ExpertiseGrid() {
  return (
    <section
      aria-labelledby="expertise-heading"
      className="relative overflow-hidden bg-[#f5f8fa] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-[#dce6ec] bg-white/75 p-2 shadow-[0_24px_55px_-34px_rgba(11,42,74,0.42)] sm:rounded-[2.5rem] sm:p-3">
          <div className="rounded-[1.55rem] border border-white/90 bg-[#f9fbfc]/95 px-3 pb-5 pt-8 sm:rounded-[2rem] sm:px-6 sm:pb-9 sm:pt-11 lg:px-8">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3b7dbd] sm:text-xs">
                Care for every smile
              </p>

              <h2
                id="expertise-heading"
                className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-[#31536d] sm:text-4xl lg:text-5xl"
              >
                Our Expertise
              </h2>

              <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-[#86c7dc]" />

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#53626c] sm:text-lg">
                Specialized dental care for every need.
              </p>
            </motion.header>

            {/* Services */}
            <motion.div
              variants={gridMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="mt-8 grid auto-rows-fr grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:gap-6"
            >
              {EXPERTISE.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={itemMotion}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.985 }}
                    className="h-full"
                  >
                    <Link
                      to={item.link}
                      className="group flex h-full min-h-[152px] flex-col items-center justify-center rounded-[1.2rem] border border-[#e7eef2] bg-white px-3 py-6 text-center shadow-[0_10px_22px_-16px_rgba(11,42,74,0.52)] transition-all duration-300 hover:border-[#b8d7e6] hover:bg-[#fcfeff] hover:shadow-[0_18px_32px_-17px_rgba(11,42,74,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b7dbd] focus-visible:ring-offset-2 sm:min-h-[190px] sm:rounded-[1.45rem] sm:px-5 sm:py-7"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-[#607986] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#eef7fa] group-hover:text-[#3b7dbd] sm:h-[4.25rem] sm:w-[4.25rem]">
                        <Icon />
                      </span>

                      <h3 className="mt-4 max-w-[11rem] text-[0.9rem] font-bold leading-tight tracking-[-0.025em] text-[#182126] sm:mt-5 sm:text-xl">
                        {item.title}
                      </h3>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
