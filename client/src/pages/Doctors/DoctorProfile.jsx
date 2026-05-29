import { useParams, Link } from "react-router-dom";
import { doctors } from "../../Data/doctors.js";
import Hero from "../../components/HeroSection.jsx";
import { motion } from "framer-motion";
import { FaUserMd } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Doctor Not Found</h2>
          <Link to="/doctors" className="text-blue-600 hover:underline">
            ← Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  // Extract content from sections (if it exists)
  let mainContent = "";
  const hasSections = doctor.sections?.some((section) => section.items);
  const contentItem = doctor.sections?.find((section) => section.content);

  if (contentItem) {
    mainContent = contentItem.content;
  }

  // const firstName = doctor.name.replace("Dr.", "").trim().split(" ")[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero
        bgImage={doctor.heroImage}
        title={doctor.name}
        subtitle={doctor.title}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card - Same for both types */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              {/* Banner */}
              <div className="h-28 bg-gradient-to-r from-[#0b2a4a] to-[#2e7fc1]" />

              {/* Avatar */}
              <div className="relative px-6">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-28 h-30 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="pt-16 pb-6 px-6 text-center">
                <h1 className="text-xl font-bold text-gray-800 mb-1">
                  {doctor.name}
                </h1>
                <p className="text-sm text-[#2e7fc1] font-medium mb-3">
                  {doctor.specialization}
                </p>

                {doctor.nmc && (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    <FaUserMd className="text-[#2e7fc1]" />
                    <span>NMC: {doctor.nmc}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Dynamic based on doctor data */}
          <div className="md:col-span-2">
            {hasSections ? (
              /* TYPE 1: Doctor with sections (Dinesh, Merina) */
              <div className="space-y-5">
                {doctor.sections.map((section, index) => {
                  // Skip if it's a content-only section
                  if (section.content) return null;

                  return (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                      <div className="bg-[#0b2a4a] px-6 py-3">
                        <h3 className="text-white font-semibold">
                          {section.title}
                        </h3>
                      </div>
                      <div className="p-6">
                        {section.items?.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 mb-3 last:mb-0"
                          >
                            <div className="w-1.5 h-1.5 bg-[#2e7fc1] rounded-full mt-2" />
                            <p className="text-gray-700 text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Show full content if exists */}
                {mainContent && (
                  <motion.div
                    variants={fadeUp}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {mainContent}
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              /* TYPE 2: Doctor with only content (Bishwo) */
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {mainContent || "No additional information available."}
                </p>
              </motion.div>
            )}
            <Link
              to="/doctors"
              className="text-blue-600 hover:underline mt-6 inline-block"
            >
              ← Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
