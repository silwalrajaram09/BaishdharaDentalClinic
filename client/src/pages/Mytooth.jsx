import { motion } from "framer-motion";
import {
  Info,
  Zap,
  Frown,
  Droplets,
  Wrench,
  ShieldCheck,
  RefreshCw,
  Wind,
  Activity,
  Thermometer,
  SlidersHorizontal,
  Cross,
  CalendarCheck,
  Lightbulb,
} from "lucide-react";

const topics = [
  {
    name: "Fun & useful facts",
    icon: Info,
    color: "bg-blue-50 text-blue-700",
    text: "Enamel is the hardest body part. Teeth are unique like fingerprints. Gum disease links to heart disease.",
  },
  {
    name: "Toothache",
    icon: Zap,
    color: "bg-red-50 text-red-700",
    text: "Decay causes sharp pain. May need a filling or root canal depending on severity.",
  },
  {
    name: "Tooth decay",
    icon: Frown,
    color: "bg-amber-50 text-amber-700",
    text: "Bacteria + sugar = acid → cavities. Prevent with brushing and fluoride toothpaste.",
  },
  {
    name: "Acid wear",
    icon: Droplets,
    color: "bg-amber-50 text-amber-700",
    text: "Acidic drinks erode enamel over time, causing sensitivity and visible damage.",
  },
  {
    name: "Fillings",
    icon: Wrench,
    color: "bg-blue-50 text-blue-700",
    text: "Amalgam, composite, and GIC used depending on tooth condition and cavity size.",
  },
  {
    name: "Fluoride protection",
    icon: ShieldCheck,
    color: "bg-teal-50 text-teal-700",
    text: "Strengthens enamel, remineralises early decay, and prevents new cavities effectively.",
  },
  {
    name: "Oral care routine",
    icon: RefreshCw,
    color: "bg-teal-50 text-teal-700",
    text: "Brush twice daily, floss, clean your tongue, and visit your dentist regularly.",
  },
  {
    name: "Bad breath",
    icon: Wind,
    color: "bg-purple-50 text-purple-700",
    text: "Caused by bacteria, poor oral hygiene, or underlying infections.",
  },
  {
    name: "Gum disease",
    icon: Activity,
    color: "bg-red-50 text-red-700",
    text: "Plaque buildup leads to gingivitis, and periodontitis if left untreated.",
  },
  {
    name: "Tooth sensitivity",
    icon: Thermometer,
    color: "bg-blue-50 text-blue-700",
    text: "Caused by enamel loss or gum recession. Use a sensitivity toothpaste.",
  },
  {
    name: "Braces & aligners",
    icon: SlidersHorizontal,
    color: "bg-purple-50 text-purple-700",
    text: "Correct crooked teeth and improve bite alignment over time.",
  },
  {
    name: "Dental implants",
    icon: Cross,
    color: "bg-teal-50 text-teal-700",
    text: "Permanent tooth replacement using titanium posts anchored in the jawbone.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const TopicCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group bg-white border border-gray-100 hover:border-[#2e7fc1]/30 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 cursor-pointer"
    >
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}
      >
        <Icon size={17} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h3
          className="text-sm font-semibold text-[#0b2a4a] leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
      </div>
    </motion.div>
  );
};

const MyTooth = () => {
  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          {/* <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-[#2e7fc1] mb-3">
            Dental knowledge hub
          </span> */}
          <h1
            className="text md:text-3xl font-bold text-[#0b2a4a] leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your complete guide
            <br className="hidden md:block" /> to oral health
          </h1>
          <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-[#2e7fc1]" />
          <p className="mt-4 text-gray-400 text-sm max-w-sm mx-auto">
            Simple, practical dental knowledge for a healthy smile
          </p>

          {/* Fun fact pill */}
         
        </motion.div>

        {/* Topic cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8"
        >
          {topics.map((item, i) => (
            <TopicCard key={i} item={item} />
          ))}
        </motion.div>

        {/* Footer reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2e7fc1] flex items-center justify-center flex-shrink-0">
            <CalendarCheck size={18} strokeWidth={1.8} />
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-[#0b2a4a]">Remember: </span>
            Visit your dentist every 6 months for prevention, not just
            treatment.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MyTooth;
