import { useParams } from "react-router-dom";
import { services } from "../../Data/services.js";
import Hero from "../../components/HeroSection.jsx";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const ServicePage = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return <div className="text-center mt-20">Service not found</div>;
  }

  const getContentItems = () => {
    return service.points || service.procedures || [];
  };
  const getImage = () => {
    return service.heroImage || service.image || "/src/assets/images/bg_1.jpg";
  };
  const getDescription = () => {
    return service.intro || service.description || "";
  };

  const getTitle = () => {
    return service.title || service.name || "";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <Hero
        bgImage={service.heroImage}
        title={getTitle()}
        subtitle={service.subtitle || getDescription()}
      />

      {/* CONTENT */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <h2 className="text-2xl font-bold mb-4">{getTitle()}</h2>
        <p className="text-gray-700 mb-6">{getDescription()}</p>

        {/* CONTENT ITEMS (Points or Procedures) */}
        <div className="space-y-6 mb-8">
          {getContentItems().map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CONCLUSION (if exists) */}
        {service.conclusion && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Conclusion
            </h3>
            <p className="text-gray-700">{service.conclusion}</p>
          </div>
        )}

        {/* IMAGE */}
        {getImage() && (
          <div
            className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg mt-8"
            style={{ backgroundImage: `url(${getImage()})` }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ServicePage;
