import { useState } from "react";
// import HeroSection from "../components/HeroSection";
// import doctor from "../assets/images/doctor.PNG";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "../Data/chapters";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categories = [
  { key: "all", label: "सबै" },
  { key: "facts", label: "रोचक तथ्य" },
  { key: "pain", label: "दुखाइ" },
  { key: "cavity", label: "किरा" },
  { key: "gum", label: "गिजा" },
  { key: "care", label: "हेरचार" },
  { key: "children", label: "बच्चाको दाँत" },
  { key: "prosthetics", label: "कृत्रिम दाँत" },
  { key: "implant", label: "इम्प्लान्ट" },
  { key: "myths", label: "भ्रम" },
];

const MeroDaat = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null); // closes all when null

  const handleExpand = (id) => () =>
    setExpandedId((prev) => (prev === id ? null : id)); // toggle one, others close

  const filtered = chapters.filter((ch) => {
    const matchCat = activeCategory === "all" || ch.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      ch.title.toLowerCase().includes(q) ||
      ch.content.some((c) => c.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="bg-[#f4f7fb] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h1
              className="text md:text-3xl font-bold text-[#0b2a4a] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              मेरो दाँत, मेरो कथा
            </h1>
            <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-[#2e7fc1]" />
            <p className="mt-4 text-gray-400 text-sm max-w-sm mx-auto">
              Simple, practical dental knowledge for a healthy smile
            </p>

            {/* Fun fact pill */}
          </motion.div>
          {/* <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 mt-10">
            मेरो दाँत, मेरो कथा
          </h1> */}

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat.key
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="खोज्नुहोस्..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-4 md:gap-6"
          >
            {filtered.map((ch) => {
              const isOpen = expandedId === ch.id;

              return (
                <div key={ch.id} className="flex flex-col min-h-0">
                  {" "}
                  {/* fixes grid row stretch */}
                  <motion.div
                    variants={fadeUp}
                    className={`flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:shadow-md ${
                      isOpen
                        ? "border-primary shadow-md"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {/* HEADER */}
                    <div className="p-4 flex items-start gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm flex-shrink-0">
                        {ch.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                          {ch.id} · {ch.categoryLabel}
                        </span>
                        <h3 className="text-gray-800 font-medium text-sm md:text-base leading-snug mt-0.5">
                          {ch.title}
                        </h3>
                        <button
                          onClick={handleExpand(ch.id)}
                          className="mt-2 text-sm font-medium text-primary hover:text-primary-dark transition"
                        >
                          {isOpen ? "▲ कम देखाउनुहोस्" : "▼ थप हेर्नुहोस्"}
                        </button>
                      </div>
                    </div>

                    {/* CONTENT – only one can be open at a time */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-gray-100"
                        >
                          <div className="px-4 pb-4 pt-3 space-y-2">
                            {ch.content.map((para, i) => (
                              <p
                                key={i}
                                className="text-gray-600 text-sm leading-relaxed"
                              >
                                <span className="text-primary font-semibold mr-2">
                                  {i + 1}.
                                </span>
                                {para}
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default MeroDaat;
