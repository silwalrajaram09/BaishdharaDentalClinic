import { useParams, useNavigate } from "react-router-dom";
import { services } from "../../Data/services.js";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const InfoCard = ({ label, content }) => (
  <motion.div
    variants={fadeUp}
    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
  >
    <div className="flex items-center gap-2 mb-3">
      <h3
        className="text-sm font-semibold uppercase tracking-widest text-[#2e7fc1]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {label}
      </h3>
    </div>
    {typeof content === "string" ? (
      <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
    ) : (
      <ul className="space-y-2">
        {content.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#2e7fc1] shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const ServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500 text-lg">Service not found.</p>
        <button
          onClick={() => navigate("/services")}
          className="text-[#2e7fc1] text-sm font-medium hover:underline"
        >
          ← Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-1.5 text-[#2e7fc1] hover:text-[#0b2a4a] text-sm font-medium transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All Services
        </button>
      </div>

      {/* Main Content - Image Right, Content Left */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Content */}
          <div className="space-y-8">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <h1
                className="text md:text-3xl font-bold text-[#0b2a4a] mt-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {service.title}
              </h1>
            </motion.div>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-gray-600 text-base leading-relaxed"
            >
              {service.intro}
            </motion.p>

            {/* Info cards grid */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <InfoCard label="Procedures" content={service.procedures} />
              <InfoCard label="Benefits" content={service.benefits} />
              <InfoCard label="Why" content={service.why} />
              <InfoCard label="When" content={service.when} />
              <InfoCard label="For Whom" content={service.forWhom} />
            </motion.div>
          </div>

          {/* Right - Image */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-auto object-cover"
                style={{ objectPosition: service.objectPos || "center" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
