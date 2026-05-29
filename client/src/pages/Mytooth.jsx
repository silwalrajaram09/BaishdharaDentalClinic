import HeroSection from "../components/HeroSection";
import doctor from "../assets/images/doctor.PNG";
import { motion } from "framer-motion";

const topics = [
  {
    title: "Fun & Useful Facts",
    icon: "😊",
    text: "Enamel is the hardest body part. Teeth are unique. Gum disease links to heart disease.",
  },
  {
    title: "Toothache",
    icon: "⚡",
    text: "Decay causes sharp pain. May need filling or RCT depending on severity.",
  },
  {
    title: "Tooth Decay",
    icon: "🍪",
    text: "Bacteria + sugar = acid → cavities. Prevent with brushing & fluoride.",
  },
  {
    title: "Acid Wear",
    icon: "🍋",
    text: "Acidic drinks erode enamel causing sensitivity and damage.",
  },
  {
    title: "Fillings",
    icon: "🦷",
    text: "Amalgam, composite, and GIC used depending on tooth condition.",
  },
  {
    title: "Fluoride Protection",
    icon: "💧",
    text: "Strengthens enamel and prevents cavities effectively.",
  },
  {
    title: "Oral Care Routine",
    icon: "🪥",
    text: "Brush 2x daily, floss, clean tongue, and visit dentist regularly.",
  },
  {
    title: "Bad Breath",
    icon: "🌬️",
    text: "Caused by bacteria, poor hygiene, or infections.",
  },
  {
    title: "Gum Disease",
    icon: "🩸",
    text: "Plaque leads to gingivitis and periodontitis if untreated.",
  },
  {
    title: "Tooth Sensitivity",
    icon: "🌡️",
    text: "Caused by enamel loss or gum recession. Use sensitive toothpaste.",
  },
  {
    title: "Braces & Aligners",
    icon: "🦷",
    text: "Correct crooked teeth and improve bite alignment.",
  },
  {
    title: "Dental Implants",
    icon: "🔩",
    text: "Permanent solution using titanium posts in jawbone.",
  },
];

// animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MyTooth = () => {
  return (
    <div>
      {/* HERO */}
      {/* <HeroSection
        bgImage={doctor}
        title="Your Complete Guide to Oral Health"
        subtitle="Simple, practical dental knowledge for a healthy smile"
      /> */}

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-[#0b2a4a]">
            Your Complete Guide to Oral Health
          </h1>

          <p className="text-gray-500 mt-2">
            Simple, practical dental knowledge for a healthy smile
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium"
          >
            💡 Did you know? Tooth enamel is the hardest substance in your body!
          </motion.div>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topics.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-2xl mb-2">{item.icon}</div>

              <h3 className="text-lg font-semibold text-[#0b2a4a] mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* FOOT NOTE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-gray-100 p-6 rounded-xl text-gray-700"
        >
          <p>
            <strong>Remember:</strong> Visit your dentist every 6 months for prevention,
            not just treatment.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default MyTooth;