import { useParams, Link } from "react-router-dom";
import { doctors } from "../../Data/doctors.js";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Stethoscope,
  User,
  MapPin,
  Clock,
  Star,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Map section titles to lucide icons
const SECTION_ICONS = {
  qualifications: BadgeCheck,
  education: BadgeCheck,
  services: Stethoscope,
  "services offered": Stethoscope,
  about: User,
  experience: Clock,
  default: BadgeCheck,
};

const getSectionIcon = (title = "") => {
  const key = title.toLowerCase();
  return SECTION_ICONS[key] ?? SECTION_ICONS.default;
};

const StarRating = ({ count = 5 }) => (
  <div className="flex gap-0.5 justify-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={13}
        strokeWidth={1.8}
        className={
          i < count
            ? "text-amber-400 fill-amber-400"
            : "text-gray-200 fill-gray-200"
        }
      />
    ))}
  </div>
);

const BulletItem = ({ text }) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const SectionCard = ({ section, index }) => {
  const Icon = getSectionIcon(section.title);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
    >
      <div className="bg-primary px-5 py-3 flex items-center gap-2.5">
        <Icon size={15} className="text-[#7ec8f4]" strokeWidth={1.8} />
        <h3 className="text-white text-sm font-semibold">{section.title}</h3>
      </div>
      <div className="p-5 flex flex-col gap-2.5">
        {section.items?.map((item, i) => (
          <BulletItem key={i} text={item} />
        ))}
        {section.content && (
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors.find((d) => String(d.id) === String(id));

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <p className="text-4xl font-bold text-[#0b2a4a] mb-2">404</p>
          <p className="text-gray-400 mb-6 text-sm">Doctor not found</p>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm text-[#2e7fc1] hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={15} /> Back to doctors
          </Link>
        </div>
      </div>
    );
  }

  // Separate content-only sections from item sections
  const itemSections = doctor.sections?.filter((s) => s.items?.length) ?? [];
  const contentSection = doctor.sections?.find((s) => s.content) ?? null;
  const mainContent = contentSection?.content ?? null;
  const hasSections = itemSections.length > 0;

  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      {/* Optional Hero — keep if you use HeroSection elsewhere */}
      {/* <Hero bgImage={doctor.heroImage} title={doctor.name} subtitle={doctor.title} /> */}

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-20">
        {/* Back link */}
        <Link
          to="/doctors"
          className="inline-flex items-center gap-1.5 text-xs text-[#2e7fc1] hover:opacity-70 transition-opacity mb-8"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back to doctors
        </Link>

        <div className="grid md:grid-cols-[240px_1fr] gap-6 items-start">
          {/* ── SIDEBAR ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="top-24"
          >
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {/* Dark banner */}
              <div className="h-20 bg-primary" />

              {/* Avatar — rectangle, not circle, for better face framing */}
              <div className="flex justify-center -mt-10 px-4">
                <div
                  className="w-20 h-24 rounded-xl border-3 border-white shadow-md overflow-hidden bg-[#ddeaf5] flex items-center justify-center flex-shrink-0"
                  style={{
                    borderWidth: "3px",
                    borderColor: "#fff",
                    borderStyle: "solid",
                  }}
                >
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: doctor.objectPos ?? "center top",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full items-center justify-center hidden"
                    aria-hidden="true"
                  >
                    <span
                      className="text-2xl font-semibold text-[#2e7fc1]"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {doctor.name
                        ?.split(" ")
                        .filter((w) => w !== "Dr.")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="px-5 pt-3 pb-5 text-center">
                <h1
                  className="text-lg font-bold text-[#0b2a4a] leading-snug mb-0.5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {doctor.name}
                </h1>
                <p className="text-xs text-[#2e7fc1] font-medium mb-3">
                  {doctor.specialization ?? doctor.title}
                </p>

                {doctor.rating && <StarRating count={doctor.rating} />}

                <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col gap-2.5 text-left">
                  {doctor.nmc && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <BadgeCheck
                        size={14}
                        className="text-[#2e7fc1] flex-shrink-0"
                        strokeWidth={1.8}
                      />
                      NMC: {doctor.nmc}
                    </div>
                  )}
                  {doctor.experience && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock
                        size={14}
                        className="text-[#2e7fc1] flex-shrink-0"
                        strokeWidth={1.8}
                      />
                      {doctor.experience}
                    </div>
                  )}
                  {doctor.location && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin
                        size={14}
                        className="text-[#2e7fc1] flex-shrink-0"
                        strokeWidth={1.8}
                      />
                      {doctor.location}
                    </div>
                  )}
                </div>

                {/* CTA */}
                {/* <Link
                  to="/appointment"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#0b2a4a] hover:bg-[#0d3359] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors duration-200"
                >
                  <CalendarPlus size={14} strokeWidth={2} />
                  Book appointment
                </Link> */}
              </div>
            </div>
          </motion.div>

          {/* ── CONTENT ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {hasSections ? (
              <>
                {itemSections.map((section, i) => (
                  <SectionCard key={i} section={section} index={i} />
                ))}
                {mainContent && (
                  <motion.div
                    variants={fadeUp}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
                  >
                    <div className="bg-primary px-5 py-3 flex items-center gap-2.5">
                      <User
                        size={15}
                        className="text-[#7ec8f4]"
                        strokeWidth={1.8}
                      />
                      <h3 className="text-white text-sm font-semibold">
                        About
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {mainContent}
                      </p>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <div className="bg-primary px-5 py-3 flex items-center gap-2.5">
                  <User
                    size={15}
                    className="text-[#7ec8f4]"
                    strokeWidth={1.8}
                  />
                  <h3 className="text-white text-sm font-semibold">About</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {mainContent ?? "No additional information available."}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
