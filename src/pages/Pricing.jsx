import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg1 from "../assets/images/bg_1.jpg";
import HeroSection from "../components/HeroSection";
const prices = [
  { service: "New Patient Registration, Consultation, and Treatment Plan", price: "NRs 500", category: "Registration" },
  { service: "Digital X-Ray (IOPA) - per x-ray", price: "NRs 400", category: "Diagnostic" },
  { service: "Fillings (Tooth-colored Composite Restorations)", price: "NRs 2,500 - 5,000", category: "Restorative" },
  { service: "GIC filling", price: "NRs 2,000", category: "Restorative" },
  { service: "Scaling (Teeth cleaning) and Polishing", price: "NRs 3,000", category: "Cleaning" },
  { service: "Deep cleaning (per tooth) under Local Anesthesia", price: "NRs 350", category: "Cleaning" },
  { service: "Office Teeth Whitening per visit", price: "NRs 15,000", category: "Whitening" },
  { service: "Home whitening", price: "NRs 15,000", category: "Whitening" },
  { service: "Braces", price: "NRs 70,000 - 100,000", category: "Orthodontics" },
  { service: "Clear Aligner", price: "NRs 150,000 - 300,000", category: "Orthodontics" },
  { service: "Retainer per piece", price: "NRs 3,000", category: "Orthodontics" },
  { service: "Zirconia crown", price: "NRs 25,000", category: "Crowns" },
  { service: "Metal-ceramic Crown", price: "NRs 10,000", category: "Crowns" },
  { service: "Dental Implant with Zirconia Crown", price: "NRs 125,000", category: "Implants" },
  { service: "Bone graft+membrane per implant (if required)", price: "NRs 30,000+", category: "Implants" },
  { service: "Sinus Lift procedure (if required in upper molar cases)", price: "NRs 30,000", category: "Implants" },
  { service: "RCT of Front Tooth", price: "NRs 10,000", category: "Root Canal" },
  { service: "RCT of Back tooth", price: "NRs 13,000", category: "Root Canal" },
  { service: "Pulpectomy", price: "NRs 7,000", category: "Root Canal" },
  { service: "Adult tooth extraction", price: "NRs 4,000", category: "Extraction" },
  { service: "Wisdom teeth non-surgical extraction", price: "NRs 6,000", category: "Extraction" },
  { service: "Surgical extraction", price: "NRs 10,000 - 16,000", category: "Extraction" },
  { service: "Baby tooth extraction", price: "NRs 1,500", category: "Extraction" },
  { service: "Acrylic Denture (upper and lower)", price: "NRs 40,000", category: "Dentures" },
  { service: "Metal reinforced complete denture", price: "NRs 60,000", category: "Dentures" },
  { service: "Flexible RPD", price: "NRs 12,000 (+2,000 per additional tooth)", category: "Dentures" },
  { service: "Acrylic RPD", price: "NRs 3,000 (+1,500 per additional tooth)", category: "Dentures" },
  { service: "Nightguard per piece", price: "NRs 3,000", category: "Dentures" },
];

const categories = ["All", ...new Set(prices.map((p) => p.category))];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Pricing = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = prices.filter((item) => {
    const matchCat = activeCat === "All" || item.category === activeCat;
    const matchSearch = item.service
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // 👉 LIMIT LOGIC (15 items only first)
  const visibleItems = showAll ? filtered : filtered.slice(0, 15);

  return (
    <>
      <HeroSection
        bgImage={bg1}
        title="Transparent Dental Pricing"
        subtitle="We believe in providing clear and affordable dental care. Check out our pricing below:"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-10">
        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6"
      >
        Our Dental Pricing
      </motion.h1>

      {/* SEARCH */}
      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCat === cat
                ? "bg-blue-600 text-white shadow"
                : "bg-white border text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {visibleItems.map((item, i) => (
                  <motion.tr
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{item.service}</td>
                    <td className="p-3 font-semibold text-blue-600">
                      {item.price}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                        {item.category}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* VIEW MORE BUTTON */}
        {filtered.length > 15 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden max-w-2xl mx-auto space-y-4">
        <AnimatePresence>
          {visibleItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 10 }}
              className="bg-white rounded-xl shadow p-4 border"
            >
              <h3 className="font-semibold text-gray-800">{item.service}</h3>

              <div className="flex justify-between mt-3 text-sm">
                <span className="text-blue-600 font-bold">{item.price}</span>
                <span className="text-gray-500">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* MOBILE VIEW MORE */}
        {filtered.length > 15 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No services found 😕
        </div>
      )}
    </div>
    </>
  );
};

export default Pricing;
