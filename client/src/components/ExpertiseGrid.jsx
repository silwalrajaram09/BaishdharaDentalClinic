import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import generalDentistry from "../assets/images/expertise/general-dentistry.png";
import implantology from "../assets/images/expertise/implantology.png";
import braces from "../assets/images/expertise/braces.png";
import pediatric from "../assets/images/expertise/pediatric.png";
import mouth from "../assets/images/expertise/mouth.png";
import healthcare from "../assets/images/expertise/healthcare.png";
import dental from "../assets/images/expertise/dental.png";
import cosmetic from "../assets/images/expertise/cosmetic-dentistry.png";
import prosthodontics from "../assets/images/expertise/prosthodontics.png";

const EXPERTISE = [
  { title: "General Dentistry", icon: generalDentistry, link: "/services/general-dentistry" },
  { title: "Implantology", icon: implantology, link: "/services/dental-implants" },
  { title: "Orthodontics", icon: braces, link: "/services/braces-aligners" },
  { title: "Pediatric Dentistry", icon: pediatric, link: "/services/pediatric-dentistry" },
  { title: "Oral Surgery", icon: mouth, link: "/services/tooth-extraction-oral-surgery" },
  { title: "Periodontics", icon: healthcare, link: "/services/gum-treatment" },
  { title: "Endodontics", icon: dental, link: "/services/root-canal-treatment" },
  { title: "Cosmetic Dentistry", icon: cosmetic, link: "/services/cosmetic-dentistry" },
  { title: "Prosthodontics", icon: prosthodontics, link: "/services/dental-crowns-bridges" },
];

const itemMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

export default function ExpertiseGrid() {
  return (
    <section aria-labelledby="expertise-heading" className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="text-center">
          <h2 id="expertise-heading" className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-[#1a3a4a] sm:text-4xl lg:text-5xl">Our Expertise</h2>
          <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-[#86c7dc]" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#647581] sm:text-base">Specialized dental care for every need.</p>
        </motion.header>

        <motion.div variants={gridMotion} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="mt-9 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-6">
          {EXPERTISE.map((item) => (
            <motion.div key={item.title} variants={itemMotion} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
              <Link to={item.link} className="group flex min-h-[150px] flex-col items-center justify-center rounded-[1.25rem] border border-[#e4edf1] bg-white px-3 py-5 text-center shadow-[0_12px_26px_-20px_rgba(26,92,122,0.55)] transition-all duration-300 hover:border-[#a9d5e2] hover:bg-[#fbfeff] hover:shadow-[0_20px_34px_-19px_rgba(26,92,122,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b7dbd] focus-visible:ring-offset-2 sm:min-h-[185px] sm:rounded-[1.5rem] sm:px-5 sm:py-7">
                <span className="flex h-14 w-14 items-center justify-center transition duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                  <img src={item.icon} alt="" aria-hidden="true" className="h-full w-full object-contain" loading="lazy" />
                </span>
                <h3 className="mt-4 text-[0.88rem] font-bold leading-tight tracking-[-0.02em] text-[#1a3a4a] transition-colors group-hover:text-[#1a5c7a] sm:mt-5 sm:text-lg">{item.title}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
