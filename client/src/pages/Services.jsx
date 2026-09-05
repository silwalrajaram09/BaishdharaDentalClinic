import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../Data/services.js";
import SEO from "../components/SEO.jsx";

const iconProps = {
  viewBox: "0 0 80 80",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function ToothIcon({ detail }) {
  return (
    <svg {...iconProps}>
      <path d="M25 21c6-5 12-3 15 0 3-3 9-5 15 0 8 6 7 17 3 25-3 6-5 15-10 15-4 0-4-7-8-7s-4 7-8 7c-5 0-7-9-10-15-4-8-5-19 3-25Z" />
      <path d="M34 27c2-3 5-4 7-4s5 1 7 4" />
      {detail === "sparkle" && <path d="M61 15v10M56 20h10M58 17l6 6M64 17l-6 6" />}
      {detail === "plus" && <><circle cx="55" cy="23" r="9" fill="white" /><path d="M55 18v10M50 23h10" /></>}
      {detail === "bracket" && <><path d="M30 40c7 4 14 4 20 0" /><rect x="39" y="36" width="9" height="8" rx="1.5" /></>}
    </svg>
  );
}

function ImplantIcon() {
  return (
    <svg {...iconProps}>
      <path d="M27 24c0-7 6-11 13-11s13 4 13 11c0 7-6 12-13 12S27 31 27 24Z" />
      <path d="M32 36v8h16v-8M33 44l3 23M47 44l-3 23M31 48h18M32 54h16M34 60h12M36 67h8" />
    </svg>
  );
}

function BracesIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 36c16 3 36 3 52 0M14 44c16-3 36-3 52 0" />
      {[20, 32, 44, 56].map((x) => <rect key={x} x={x - 4} y="35" width="8" height="10" rx="1.5" />)}
    </svg>
  );
}

function GumIcon() {
  return (
    <svg {...iconProps}>
      <path d="M15 33c7-7 15-9 25-9s18 2 25 9" />
      <path d="M17 34c1 16 8 24 12 24 3 0 4-13 11-13s8 13 11 13c4 0 11-8 12-24" />
      <path d="M24 35v12M32 32v14M40 31v15M48 32v14M56 35v12" />
    </svg>
  );
}

function ChildIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="40" cy="27" r="11" />
      <path d="M24 66c2-13 8-23 16-23s14 10 16 23M34 26h.01M46 26h.01M35 32c3 2 7 2 10 0" />
    </svg>
  );
}

function ServiceIcon({ title }) {
  if (title.includes("Implant")) return <ImplantIcon />;
  if (title.includes("Braces")) return <BracesIcon />;
  if (title.includes("Gum")) return <GumIcon />;
  if (title.includes("Pediatric")) return <ChildIcon />;
  if (title.includes("Cosmetic")) return <ToothIcon detail="sparkle" />;
  if (title.includes("Emergency")) return <ToothIcon detail="plus" />;
  if (title.includes("Extraction")) return <ToothIcon detail="plus" />;
  if (title.includes("Crowns")) return <ToothIcon detail="bracket" />;
  return <ToothIcon />;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function ServiceCard({ service }) {
  return (
    <motion.article variants={cardVariants} whileHover={{ y: -5 }} className="h-full">
      <Link
        to={`/services/${service.slug}`}
        className="group flex h-full min-h-[285px] flex-col rounded-[1.5rem] border border-[#e3edf2] bg-white p-5 shadow-[0_14px_30px_-23px_rgba(11,42,74,0.6)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#b8d9e6] hover:bg-[#fcfeff] hover:shadow-[0_22px_40px_-24px_rgba(11,42,74,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b7dbd] focus-visible:ring-offset-2 sm:rounded-[1.75rem] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef8fa] text-[#5d7c88] transition duration-300 group-hover:scale-105 group-hover:bg-[#e1f3f7] group-hover:text-[#2e7fc1] sm:h-[4.5rem] sm:w-[4.5rem]">
            <ServiceIcon title={service.title} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e1edf1] text-[#7aa7b6] transition group-hover:border-[#9bcddd] group-hover:bg-[#2e7fc1] group-hover:text-white">
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
        <h2 className="mt-6 min-h-[3.3rem] text-lg font-bold leading-tight tracking-[-0.025em] text-[#0b2a4a] sm:text-xl">{service.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#687985]">{service.intro}</p>
        <span className="mt-auto pt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#2e7fc1]">Explore service</span>
      </Link>
    </motion.article>
  );
}

export default function Services() {
  return (
    <>
      <SEO
        title="Dental Services in Kathmandu | Baishdhara Dental Clinic"
        description="Explore comprehensive dental services at Baishdhara Dental Clinic Kathmandu: dental implants, braces, root canal treatment, teeth whitening, and emergency care."
        keywords="dental services Kathmandu, dental clinic Kathmandu, dental implants, braces, root canal treatment, teeth whitening, emergency dental care, oral health"
      />
      <main className="relative overflow-hidden bg-[#f5f8fa] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#d9eef5]/70 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#e4eefa]/80 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <motion.header initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants} className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3b7dbd] sm:text-xs">Care for every smile</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-[#0b2a4a] sm:text-5xl">Our Dental Services</h1>
            <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-[#86c7dc]" />
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#647581] sm:text-base">Comprehensive dental care with advanced technology and personalized attention for your healthiest and most confident smile.</p>
          </motion.header>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </motion.div>
        </div>
      </main>
    </>
  );
}
