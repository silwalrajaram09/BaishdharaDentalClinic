import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import maskey from "../assets/images/maskey.png";
import saroj from "../assets/images/saroj.png";
import salik from "../assets/images/adhikary.png";

const PATIENTS = [
  {
    id: 1,
    name: "Salik Adhikary",
    role: "Lecturer, Tribhuvan University",
    image: salik,
    quote: "It is one of the best dental clinics, with Nepal's well-experienced and skilled dental surgeons.",
  },
  {
    id: 2,
    name: "Julie Maskey",
    role: "Freelancer, Kathmandu",
    image: maskey,
    quote: "Great staff, gentle care, and a really comfortable experience from start to finish.",
  },
  {
    id: 3,
    name: "Dr. Saroj Kandel",
    role: "Medical Professional, USA",
    image: saroj,
    quote: "The staff was friendly and professional, and the dentist was very knowledgeable. I highly recommend this clinic.",
  },
];

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function Stars() {
  return (
    <div className="flex gap-1 text-[#e3a93b]" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />)}
    </div>
  );
}

function PatientCard({ patient, mobile = false }) {
  return (
    <motion.article
      variants={cardMotion}
      whileHover={!mobile ? { y: -5 } : undefined}
      className="relative flex h-full flex-col rounded-[1.5rem] border border-[#e2e9ed] bg-white p-5 shadow-[0_15px_34px_-25px_rgba(11,42,74,0.6)] transition-shadow duration-300 hover:shadow-[0_22px_42px_-24px_rgba(11,42,74,0.45)] sm:rounded-[1.75rem] sm:p-7"
    >
      <Quote className="absolute right-5 top-5 text-[#d7ebf2]" size={35} fill="currentColor" strokeWidth={1} aria-hidden="true" />
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#8ccfe0] bg-[#eaf4f7] p-0.5 sm:h-16 sm:w-16">
          <img src={patient.image} alt={patient.name} loading="lazy" className="h-full w-full rounded-full object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-[#0b2a4a] sm:text-lg">{patient.name}</h3>
          <p className="mt-0.5 truncate text-xs text-[#788895]">{patient.role}</p>
          <div className="mt-2"><Stars /></div>
        </div>
      </div>
      <blockquote className="mt-6 flex-1 text-sm leading-7 text-[#52636f] sm:text-base">“{patient.quote}”</blockquote>
      <div className="mt-5 h-1 w-10 rounded-full bg-[#8ccfe0]" />
    </motion.article>
  );
}

export default function HappyPatients() {
  const [currentPatient, setCurrentPatient] = useState(0);
  const patient = PATIENTS[currentPatient];

  const nextPatient = () => setCurrentPatient((previous) => (previous + 1) % PATIENTS.length);
  const previousPatient = () => setCurrentPatient((previous) => (previous - 1 + PATIENTS.length) % PATIENTS.length);

  return (
    <section aria-labelledby="happy-patients-heading" className="relative overflow-hidden bg-[#e9f5f7] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-8 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#cfeaf0]/80 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <motion.header initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardMotion} className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3180a5] sm:text-xs">Real experiences</p>
          <h2 id="happy-patients-heading" className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-[#0b2a4a] sm:text-4xl lg:text-5xl">Happy Patients</h2>
          <div className="mx-auto mt-4 h-0.5 w-10 rounded-full bg-[#69b8ce]" />
          <p className="mt-4 text-sm leading-7 text-[#617580] sm:text-base">Comfortable care and confident smiles, shared by our patients.</p>
        </motion.header>

        <div className="mt-9 md:hidden">
          <AnimatePresence mode="wait">
            <motion.div key={patient.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25 }}>
              <PatientCard patient={patient} mobile />
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex items-center justify-center gap-4">
            <button type="button" onClick={previousPatient} aria-label="Previous patient testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#9ccfdb] bg-white text-[#246786] transition hover:bg-[#0b2a4a] hover:text-white"><ChevronLeft size={18} /></button>
            <div className="flex gap-1.5" aria-label={`Testimonial ${currentPatient + 1} of ${PATIENTS.length}`}>
              {PATIENTS.map((item, index) => <button key={item.id} type="button" onClick={() => setCurrentPatient(index)} aria-label={`Show testimonial ${index + 1}`} className={`h-2 rounded-full transition-all ${index === currentPatient ? "w-7 bg-[#3180a5]" : "w-2 bg-[#acd8e1]"}`} />)}
            </div>
            <button type="button" onClick={nextPatient} aria-label="Next patient testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#9ccfdb] bg-white text-[#246786] transition hover:bg-[#0b2a4a] hover:text-white"><ChevronRight size={18} /></button>
          </div>
        </div>

        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="mt-10 hidden grid-cols-3 gap-5 md:grid lg:gap-7">
          {PATIENTS.map((item) => <PatientCard key={item.id} patient={item} />)}
        </motion.div>
      </div>
    </section>
  );
}
