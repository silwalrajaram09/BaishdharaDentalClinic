import { motion } from "framer-motion";
import about from "../assets/images/about.jpg";
import nextLogo from "../assets/images/nextLogo.PNG";
import {
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import SEO from "../components/SEO";
import TeamSection from "../components/TeamSection";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const specializations = [
  {
    title: "Dental Implants",
    body: "Placed by a seasoned implantologist with over a decade of proven success.",
  },
  {
    title: "Cosmetic Dentistry",
    body: "Smile design, professional teeth whitening, and natural-looking restorations tailored to you.",
  },
  {
    title: "Oral & Maxillofacial Surgery",
    body: "Expertise in wisdom tooth removal, minor surgical procedures, and treatment under general anesthesia.",
  },
];

const StorySection = () => {
  return (
   <section className="py-5 lg:py-10 bg-white">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto"
    >
      

      <h2 className="mt-4 text-4xl md:text-4xl font-bold text-[#0b2a4a] leading-tight">
        Our Story
      </h2>

      

      <div className="mt-8 w-20 h-1 rounded-full bg-[#2e7fc1] mx-auto" />
    </motion.div>

    {/* Story */}
    <div className="mt-20 grid lg:grid-cols-2 gap-16 items-center">
       {/* Left */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="order-2 lg:order-1"
      >
        <div className="bg-primary rounded-[32px] p-10 border border-gray-100 shadow-sm">

          <div className="flex justify-center">
            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2e7fc1]/15 to-[#1D9E75]/15 blur-2xl" />

              <img
                src={nextLogo}
                alt="Baishdhara Dental Clinic"
                className="relative w-48 sm:w-56 object-contain"
              />

            </div>
          </div>

          <p className="mt-8 text-center italic text-[#0F172A] leading-relaxed">
            "Inspired by the historic Baishdhara heritage — flowing with health,
            vitality, and a commitment to serving our community with trusted
            dental care."
          </p>

          {/* Values */}
          <div className="mt-10 grid grid-cols-2 gap-4">

            {[
              "Trusted Care",
              "Modern Dentistry",
              "Patient First",
              "Ethical Practice",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-primary-dark  py-4 px-5 text-center text-[#FFFFFF] font-medium shadow-sm"
              >
                {item}
              </div>
            ))}

          </div>

        </div>
      </motion.div>

      {/* Right */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="order-1 lg:order-2"
      >
      
        <div className="space-y-5 text-gray-600 leading-8 text-lg">
          <p className="mt- font-bold text-gray-600 text-2xl tracking-wider">
       Your family dentist since 2021
      </p>
          <p>
            Welcome to Baishdhara Dental Clinic — where expert care meets heartfelt service. Located
in the historic heart of Balaju, Kathmandu, we are dedicated to providing exceptional,
affordable, and truly personalized dental care for every member of your family.
          </p>
           <div className="mt-10 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-8 shadow-sm">

          <p className="italic text-xl leading-relaxed text-[#0b2a4a]">
            "To restore and maintain healthy, confident smiles through advanced
            dentistry, gentle techniques, and genuine patient relationships
            built on trust."
          </p>
        </div>
          <p>
           We believe dentistry is more than a treatment—it’s a partnership. Every smile we treat is
unique, and every patient is valued. Our care philosophy is built on transparency,
compassion, and respect, with every procedure guided by precision, sincerity, and comfort.
          </p>
        </div>

       
      </motion.div>
    </div>
  </div>
</section>
  );
};

const About = () => {
  return (
    <>
      <SEO
        title="About Us | Baishdhara Dental Clinic"
        description="Meet our experienced dentists at Baishdhara Dental Clinic in Balaju, Kathmandu. Committed to ethical, high-quality, and modern dental care."
      />

      <div className="bg-[#f8f9fb] overflow-hidden">
        {/* HERO SECTION */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 "
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* TEXT */}
            <motion.div variants={fadeLeft} className="space-y-6 sm:space-y-7 order-2 lg:order-1">
              <div>
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#2e7fc1] text-xs font-bold uppercase tracking-widest rounded-full mb-5">
                  Established 2021
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b2a4a] leading-[1.15] sm:leading-[1.1] tracking-tight">
                  Your Trusted Partner in{" "}
                  <span className="text-[#2e7fc1]">Dental Health</span>
                </h1>
              </div>

              <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed text-justify">
                <p>
                  At Baishdhara Dental Clinic, we believe that a healthy smile
                  is the cornerstone of overall well-being. Located in the
                  heart of Balaju, Kathmandu, we combine state-of-the-art
                  dental technology with a deeply personal touch to deliver
                  precise, comfortable, and reliable care.
                </p>
                <p>
                  Our mission is to make high-quality, ethical, and affordable
                  dental care accessible to every family. From routine
                  checkups to advanced implants and complete smile makeovers,
                  every treatment plan is meticulously designed with
                  transparency and your long-term oral health in mind.
                </p>
                <p>
                  Our Promise: Expert care, Honest guidance, Lasting confidence.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <a
                  href="/doctors"
                  className="inline-block w-full sm:w-auto text-center px-7 py-3 border border-gray-300 text-white bg-primary font-semibold rounded-lg  hover:text-secondary hover:bg-primary-dark transition-all duration-300"
                >
                  Meet Our Doctors
                </a>
              </div>
            </motion.div>

            {/* IMAGE */}
            <motion.div variants={fadeRight} className="relative order-2 lg:order-2">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <div
                  className="w-full aspect-[4/3] bg-cover bg-center rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl relative z-10"
                  style={{ backgroundImage: `url(${about})` }}
                  role="img"
                  aria-label="Inside Baishdhara Dental Clinic"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-48 sm:h-48 bg-[#2e7fc1] rounded-[1.5rem] sm:rounded-[2rem] opacity-20 -z-10 hidden sm:block" />
                <div className="absolute -top-5 -right-5 sm:-top-6 sm:-right-6 w-32 h-32 sm:w-48 sm:h-48 bg-[#1D9E75] rounded-full opacity-10 -z-10 hidden sm:block" />

                {/* Floating Trust Badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white/90 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-lg flex items-center gap-3 z-20">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 text-[#1D9E75] rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#0b2a4a] leading-tight">
                      Patient-Centric
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-tight">
                      Ethical & Safe Care
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* TEAM SECTION */}
        <TeamSection />

        {/* OUR STORY - THE EDITORIAL LAYOUT */}
        <StorySection />
      </div>
    </>
  );
};

export default About;