import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import about from "../assets/images/about.jpg";
import nextLogo from "../assets/images/nextLogo.PNG";
import SEO from "../components/SEO";
import TeamSection from "../components/TeamSection";
import FAQ from "../components/FAQ";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const values = [
  {
    title: "Trusted care",
    text: "Clear guidance and dependable treatment for every family.",
    icon: ShieldCheck,
  },
  {
    title: "Patient first",
    text: "Gentle communication and comfort at every step.",
    icon: HeartHandshake,
  },
  {
    title: "Modern dentistry",
    text: "Thoughtful technology supporting precise clinical care.",
    icon: Sparkles,
  },
];

const promises = [
  "Experienced dental professionals",
  "Transparent treatment planning",
  "Comfortable, hygienic environment",
];

function ValueCard({ value }) {
  const Icon = value.icon;
  return (
    <motion.article
      variants={fadeUp}
      className="rounded-[1.4rem] border border-[#dcebf0] bg-white p-5 shadow-[0_15px_32px_-25px_rgba(11,42,74,0.55)] sm:p-6"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7f9] text-[#2e7fc1]">
        <Icon size={21} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-base font-bold text-[#0b2a4a]">{value.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#687985]">{value.text}</p>
    </motion.article>
  );
}

function StorySection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-[2rem] bg-[#0b2a4a] p-6 text-white shadow-[0_25px_55px_-30px_rgba(11,42,74,0.75)] sm:p-9"
        >
          <div className="flex justify-center rounded-[1.5rem] bg-white/95 py-8 sm:py-10">
            <img
              src={nextLogo}
              alt="Baishdhara Dental Clinic"
              className="w-48 object-contain sm:w-56"
            />
          </div>
          <p className="mt-7 text-center text-sm leading-7 text-blue-100">
            Inspired by the historic Baishdhara heritage — flowing with health,
            vitality, and a commitment to serving our community with trusted
            dental care.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              "Trusted care",
              "Patient first",
              "Modern dentistry",
              "Ethical practice",
            ].map((item) => (
              <span
                key={item}
                className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-center text-xs font-semibold text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3b7dbd]">
            Our story
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-[#0b2a4a] sm:text-4xl">
            A clinic built around trust
          </h2>
          <div className="mt-4 h-0.5 w-10 rounded-full bg-[#86c7dc]" />
          <div className="mt-7 space-y-5 text-sm leading-7 text-[#687985] sm:text-base">
            <p>
              Baishdhara Dental Clinic was founded to make high-quality dental
              care feel more personal, transparent, and accessible for families
              in Balaju and across Kathmandu.
            </p>
            <p>
              We believe dentistry is more than a treatment — it is a
              partnership. Every smile is unique, and every patient deserves
              careful listening, honest guidance, and a treatment plan built
              around long-term oral health.
            </p>
          </div>
          <div className="mt-7 rounded-2xl border border-[#dcebf0] bg-[#f4fbfc] p-5">
            <p className="text-base font-semibold leading-7 text-[#0b2a4a]">
              “To restore and maintain healthy, confident smiles through
              advanced dentistry, gentle techniques, and genuine patient
              relationships built on trust.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <SEO
        title="About Baishdhara Dental Clinic | Dentist in Kathmandu"
        description="Learn about Baishdhara Dental Clinic in Balaju, Kathmandu. Our experienced dentists provide trusted, modern dental care and advanced treatments for your smile."
        keywords="Baishdhara Dental Clinic, dentist in Kathmandu, dental clinic Balaju, experienced dentist, modern dental care, family dentist"
      />
      <main className="overflow-hidden bg-[#f5f8fa]">
        <section className="relative px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#d9eef5]/75 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#e5eefb]/80 blur-3xl"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#3b7dbd]">
                Established in 2021 · Balaju, Kathmandu
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.06em] text-[#0b2a4a] sm:text-5xl lg:text-6xl">
                Your trusted partner in{" "}
                <span className="text-[#2e7fc1]">dental health.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-[#647581] sm:text-base">
                At Baishdhara Dental Clinic, expert care meets heartfelt
                service. We combine modern technology with a personal touch to
                deliver precise, comfortable, and reliable care for every
                family.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b2a4a] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0b2a4a]/15 transition hover:-translate-y-0.5 hover:bg-[#173f65]"
                >
                  Meet our doctors <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#bdd8e2] bg-white px-5 py-3.5 text-sm font-bold text-[#246786] transition hover:border-[#79b8ca] hover:bg-[#f4fbfc]"
                >
                  Explore services
                </Link>
              </div>
              <div className="mt-9 flex items-center gap-3 text-xs font-semibold text-[#647581]">
                <MapPin
                  size={16}
                  className="text-[#3b7dbd]"
                  aria-hidden="true"
                />{" "}
                Tarun Marga, Bypass, Balaju, Kathmandu
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-8 border-white bg-[#dceef3] shadow-[0_30px_65px_-30px_rgba(11,42,74,0.55)] sm:rounded-[2.5rem]">
                <img
                  src={about}
                  alt="Inside Baishdhara Dental Clinic"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-xl sm:bottom-6 sm:left-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f7ef] text-[#1d9e75]">
                  <ShieldCheck size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-sm text-[#0b2a4a]">
                    Patient-centred care
                  </strong>
                  <small className="text-xs text-[#71808c]">
                    Ethical & safe treatment
                  </small>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="border-y border-[#dcebf0] bg-white px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3 sm:gap-5"
          >
            {values.map((value) => (
              <ValueCard key={value.title} value={value} />
            ))}
          </motion.div>
        </section>

        {/* <section className="bg-[#eaf6f8] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3180a5]">
                Our promise
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-[#0b2a4a] sm:text-4xl">
                Care that feels clear and comfortable.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {promises.map((promise) => (
                <div
                  key={promise}
                  className="flex items-start gap-2 rounded-xl border border-[#cfe5eb] bg-white/75 p-4 text-sm font-semibold leading-6 text-[#31536d]"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#2e7fc1]"
                    aria-hidden="true"
                  />
                  {promise}
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <TeamSection />
        <StorySection />
        <FAQ
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our clinic and dental care."
          faqs={[
            {
              question: "What services does Baishdhara Dental Clinic offer?",
              answer:
                "We provide a wide range of dental services including general dentistry, cosmetic dentistry, dental implants, orthodontics, oral surgery, and preventive care.",
            },
            {
              question: "How can I book an appointment?",
              answer:
                "You can book an appointment by calling our clinic directly or using the online appointment form available throughout the website.",
            },
            {
              question: "Do you accept insurance?",
              answer:
                "Please contact our office for current information about insurance coverage and payment options.",
            },
            {
              question: "What should I expect during my first visit?",
              answer:
                "We conduct a comprehensive dental examination, discuss your oral health history, and create a personalized treatment plan for your needs.",
            },
            {
              question: "Are your dentists experienced?",
              answer:
                "Yes. Our team consists of qualified and experienced dental professionals dedicated to safe, precise, and compassionate care.",
            },
          ]}
        />
      </main>
    </>
  );
}
