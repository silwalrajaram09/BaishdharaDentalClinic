
import { useParams } from "react-router-dom";
import { doctors } from "../../Data/doctors.js";
import Hero from "../../components/HeroSection.jsx";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return <div className="text-center mt-20">Doctor not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <Hero
        image={doctor.heroImage}
        title={doctor.name}
        subtitle={doctor.title}
      />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">

        {/* PROFILE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl shadow p-6 text-center"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
          />

          <h2 className="text-xl font-bold">{doctor.name}</h2>

          <p className="text-sm text-gray-500">{doctor.email}</p>

          <p className="text-blue-600 mt-2 font-medium">
            {doctor.specialization}
          </p>

          <div className="mt-4 border-t pt-4 text-sm text-gray-600">
            <p><strong>NMC:</strong> {doctor.nmc}</p>
          </div>
        </motion.div>

        {/* SECTIONS */}
        <div className="md:col-span-2 space-y-6">
          {doctor.sections.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl shadow p-6"
            >
              <h3 className="text-lg font-bold mb-3">
                {section.title}
              </h3>

              <ul className="space-y-2 text-gray-600 text-sm">
                {section.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;