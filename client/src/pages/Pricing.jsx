import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";

const PRICES = [
  {
    service: "New Patient Registration, Consultation & Treatment Plan",
    price: "NRs 500",
    category: "Registration",
  },
  {
    service: "Digital X-Ray (IOPA) — per x-ray",
    price: "NRs 400",
    category: "Diagnostic",
  },
  {
    service: "Tooth-colored Composite Filling",
    price: "NRs 2,500 – 5,000",
    category: "Restorative",
  },
  { service: "GIC Filling", price: "NRs 2,000", category: "Restorative" },
  {
    service: "Scaling & Polishing (Teeth Cleaning)",
    price: "NRs 3,000",
    category: "Cleaning",
  },
  {
    service: "Deep Cleaning (per tooth) under Local Anesthesia",
    price: "NRs 350",
    category: "Cleaning",
  },
  {
    service: "Office Teeth Whitening (per visit)",
    price: "NRs 15,000",
    category: "Whitening",
  },
  { service: "Home Whitening Kit", price: "NRs 15,000", category: "Whitening" },
  {
    service: "Braces (Metal / Ceramic)",
    price: "NRs 70,000 – 1,00,000",
    category: "Orthodontics",
  },
  {
    service: "Clear Aligner",
    price: "NRs 1,50,000 – 3,00,000",
    category: "Orthodontics",
  },
  {
    service: "Retainer (per piece)",
    price: "NRs 3,000",
    category: "Orthodontics",
  },
  { service: "Zirconia Crown", price: "NRs 25,000", category: "Crowns" },
  { service: "Metal-ceramic Crown", price: "NRs 10,000", category: "Crowns" },
  {
    service: "Dental Implant with Zirconia Crown",
    price: "NRs 1,25,000",
    category: "Implants",
  },
  {
    service: "Bone Graft + Membrane (per implant, if required)",
    price: "NRs 30,000+",
    category: "Implants",
  },
  {
    service: "Sinus Lift Procedure (upper molar cases)",
    price: "NRs 30,000",
    category: "Implants",
  },
  {
    service: "Root Canal — Front Tooth",
    price: "NRs 10,000",
    category: "Root Canal",
  },
  {
    service: "Root Canal — Back Tooth",
    price: "NRs 13,000",
    category: "Root Canal",
  },
  { service: "Pulpectomy", price: "NRs 7,000", category: "Root Canal" },
  {
    service: "Adult Tooth Extraction",
    price: "NRs 4,000",
    category: "Extraction",
  },
  {
    service: "Wisdom Tooth Extraction (non-surgical)",
    price: "NRs 6,000",
    category: "Extraction",
  },
  {
    service: "Surgical Extraction",
    price: "NRs 10,000 – 16,000",
    category: "Extraction",
  },
  {
    service: "Baby Tooth Extraction",
    price: "NRs 1,500",
    category: "Extraction",
  },
  {
    service: "Complete Acrylic Denture (upper & lower)",
    price: "NRs 40,000",
    category: "Dentures",
  },
  {
    service: "Metal-reinforced Complete Denture",
    price: "NRs 60,000",
    category: "Dentures",
  },
  {
    service: "Flexible Partial Denture (RPD)",
    price: "NRs 12,000 (+2,000/tooth)",
    category: "Dentures",
  },
  {
    service: "Acrylic Partial Denture (RPD)",
    price: "NRs 3,000 (+1,500/tooth)",
    category: "Dentures",
  },
  {
    service: "Nightguard (per piece)",
    price: "NRs 3,000",
    category: "Dentures",
  },
];

const CATEGORY_STYLES = {
  Registration: "bg-blue-50 text-blue-700",
  Diagnostic: "bg-sky-50 text-sky-700",
  Restorative: "bg-indigo-50 text-indigo-700",
  Cleaning: "bg-emerald-50 text-emerald-700",
  Whitening: "bg-yellow-50 text-yellow-700",
  Orthodontics: "bg-violet-50 text-violet-700",
  Crowns: "bg-orange-50 text-orange-700",
  Implants: "bg-rose-50 text-rose-700",
  "Root Canal": "bg-fuchsia-50 text-fuchsia-700",
  Extraction: "bg-red-50 text-red-700",
  Dentures: "bg-slate-100 text-slate-600",
};

const LIMIT = 12;
const categories = ["All", ...new Set(PRICES.map((p) => p.category))];

const heroVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, delay: i * 0.03, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, delay: i * 0.04 },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

const CategoryPill = memo(({ category }) => (
  <span
    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide ${
      CATEGORY_STYLES[category] ?? "bg-gray-100 text-gray-600"
    }`}
  >
    {category}
  </span>
));

const Pricing = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRICES.filter((item) => {
      const matchCat = activeCat === "All" || item.category === activeCat;
      const matchSearch =
        item.service.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  const visible = showAll ? filtered : filtered.slice(0, LIMIT);
  const hasMore = filtered.length > LIMIT;
  const isEmpty = filtered.length === 0;

  const handleCat = useCallback((cat) => {
    setActiveCat(cat);
    setShowAll(false);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setShowAll(false);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <SEO
        title="Pricing | Bishdhara Dental Clinic"
        description="View our dental treatment pricing, consultation fees, and affordable dental care services."
        keywords="dental pricing, dental treatment cost, consultation fee, dental clinic pricing, affordable dental care"
      />
      {/* Hero */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h1
          className="text-2xl md:text-3xl font-bold font-playfair text-[#0b2a4a] leading-tight"
        >
          Dental Services & Pricing
        </h1>
        <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-[#2e7fc1]" />
        <p className="mt-4 text-gray-500 max-w-md mx-auto text-base">
          Transparent pricing for every treatment — no hidden fees, no
          surprises.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search a service, e.g. implant, crown…"
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 shadow-sm text-sm text-[#0b2a4a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30 focus:border-[#1D9E75] transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-7">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                activeCat === cat
                  ? "bg-primary border-border text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#1D9E75] hover:text-[#0F6E56]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Table */}
        {!isEmpty && (
          <div className="hidden md:block rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0b2a4a]">
                  <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-widest text-white/60">
                    Service
                  </th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-widest text-white/60">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-medium uppercase tracking-widest text-white/60">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                <AnimatePresence initial={false}>
                  {visible.map((item, i) => (
                    <motion.tr
                      key={item.service}
                      custom={i}
                      variants={rowVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="hover:bg-[#f7fdfb] transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-[#0b2a4a] max-w-xs">
                        {item.service}
                      </td>
                      <td className="px-5 py-3.5">
                        <CategoryPill category={item.category} />
                      </td>
                      <td className="px-5 py-3.5 text-right text-sm font-semibold text-[#0F6E56] whitespace-nowrap">
                        {item.price}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!isEmpty && (
          <div className="md:hidden space-y-3">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((item, i) => (
                <motion.div
                  key={item.service}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                >
                  <p className="text-sm font-medium text-[#0b2a4a] mb-3 leading-snug">
                    {item.service}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">
                      {item.price}
                    </span>
                    <CategoryPill category={item.category} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        <AnimatePresence>
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-gray-400"
            >
              <svg
                className="mx-auto mb-3 opacity-30"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <p className="text-sm">
                No services found matching{" "}
                <span className="font-medium">"{search}"</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Button */}
        <AnimatePresence>
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-7"
            >
              <button
                onClick={() => setShowAll((s) => !s)}
                className="px-7 py-2.5 rounded-full border-[1.5px] border-[#1D9E75] text-[#0F6E56] text-sm font-medium hover:bg-[#1D9E75] hover:text-white transition-all duration-200"
              >
                {showAll
                  ? "Show fewer services"
                  : `View ${filtered.length - LIMIT} more services`}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Pricing;
