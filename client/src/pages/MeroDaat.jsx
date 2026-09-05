import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "../Data/chapters";
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";

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
      <SEO
        title="मेरो दाँत, मेरो कथा | Baishdhara Dental Clinic Kathmandu"
        description="दाँत, गिजा, दन्त इम्प्लान्ट, बच्चाको दाँत र मुख स्वास्थ्य सम्बन्धी उपयोगी जानकारी तथा दन्त शिक्षा Baishdhara Dental Clinic बाट प्राप्त गर्नुहोस्।"
        keywords="मेरो दाँत, दन्त स्वास्थ्य, दाँतको हेरचाह, गिजा रोग, दाँतको किरा, दन्त इम्प्लान्ट, बच्चाको दाँत, मुख स्वास्थ्य, dental care, oral health"
      />
      <div className="bg-[#f4f7fb] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl md:text-3xl font-bold font-playfair text-[#0b2a4a] leading-tight">
              मेरो दाँत, मेरो कथा
            </h1>
            <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-[#2e7fc1]" />
            <p className="mt-4 text-gray-400 text-sm max-w-sm mx-auto">
              स्वस्थ मुस्कानको लागि सरल, व्यावहारिक दन्त ज्ञान
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
            className="grid md:grid-cols-2 gap-4 md:gap-6 items-start"
          >
            {[0, 1].map((colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4 md:gap-6">
                {filtered
                  .filter((_, i) => i % 2 === colIndex)
                  .map((ch) => {
                    const isOpen = expandedId === ch.id;

                    return (
                      <motion.div
                        key={ch.id}
                        variants={fadeUp}
                        className={`flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:shadow-md ${
                          isOpen
                            ? "border-primary shadow-md"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        {/* HEADER */}
                        <div className="p-4 flex items-start gap-3">
                          {/* <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm flex-shrink-0">
                            {ch.icon}
                          </div> */}

                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                              {ch.id} · {ch.categoryLabel}
                            </span>
                            <h2 className="text-gray-800 font-medium text-sm md:text-base leading-snug mt-0.5">
                              {ch.title}
                            </h2>
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
                    );
                  })}
              </div>
            ))}
          </motion.div>
        </div>
        {/* FAQ Section title all things in a nepali language */}
        <FAQ
          title="बारम्बार सोधिने प्रश्नहरू"
          subtitle="दाँत तथा मुख स्वास्थ्यसँग सम्बन्धित सामान्य प्रश्नहरूको सरल उत्तर"
          faqs={[
            {
              question: "दाँत दिनमा कति पटक माझ्नुपर्छ?",
              answer:
                "दाँत कम्तीमा दिनमा दुई पटक, बिहान र राति सुत्नुअघि फ्लोराइडयुक्त टुथपेस्ट प्रयोग गरेर दुई मिनेटसम्म माझ्नुपर्छ।",
            },
            {
              question: "दाँतको किरा किन लाग्छ?",
              answer:
                "धेरै गुलियो खाने, राम्रोसँग दाँत नमाझ्ने र मुखको सरसफाइमा ध्यान नदिँदा ब्याक्टेरियाले एसिड उत्पादन गर्छन्, जसले दाँतमा किरा लाग्ने सम्भावना बढाउँछ।",
            },
            {
              question: "गिजाबाट रगत आउनु सामान्य हो?",
              answer:
                "होइन। गिजाबाट बारम्बार रगत आउनु गिजाको सूजन वा गिजा रोगको संकेत हुन सक्छ। यस्तो समस्या देखिएमा दन्त चिकित्सकसँग जाँच गराउनु उचित हुन्छ।",
            },
            {
              question: "बच्चाको दूधे दाँतको पनि उपचार आवश्यक हुन्छ?",
              answer:
                "अवश्य। दूधे दाँतले बच्चाको खानपान, बोलाइ र स्थायी दाँतको सही विकासमा महत्वपूर्ण भूमिका खेल्छ। त्यसैले दूधे दाँत बिग्रिएमा समयमै उपचार गर्नुपर्छ।",
            },
            {
              question: "दाँत दुख्न थालेपछि मात्रै दन्त चिकित्सककहाँ जानुपर्छ?",
              answer:
                "होइन। समस्या नदेखिए पनि प्रत्येक ६ महिनामा नियमित दन्त परीक्षण गराउँदा धेरै रोगहरू प्रारम्भिक चरणमै पत्ता लगाउन सकिन्छ।",
            },
            {
              question: "दन्त इम्प्लान्ट सबैका लागि उपयुक्त हुन्छ?",
              answer:
                "सबैका लागि होइन। इम्प्लान्ट गर्नुअघि हड्डीको अवस्था, मुखको स्वास्थ्य र समग्र स्वास्थ्यको मूल्याङ्कन आवश्यक हुन्छ। दन्त चिकित्सकले जाँचपछि उपयुक्त विकल्प सिफारिस गर्नुहुन्छ।",
            },
            {
              question: "मुखबाट दुर्गन्ध आउनुको मुख्य कारण के हो?",
              answer:
                "मुखको सरसफाइमा कमी, गिजाको रोग, दाँतमा किरा, जिब्रोमा ब्याक्टेरिया जम्नु वा केही स्वास्थ्य समस्याका कारण मुखबाट दुर्गन्ध आउन सक्छ।",
            },
            {
              question: "दाँत सेतो बनाउन घरेलु उपाय सुरक्षित हुन्छन्?",
              answer:
                "कागती, बेकिङ सोडा वा अन्य घरेलु उपाय बारम्बार प्रयोग गर्दा दाँतको बाहिरी तहमा क्षति पुग्न सक्छ। सुरक्षित रूपमा दाँत सेतो बनाउन दन्त चिकित्सकको सल्लाह लिनु राम्रो हुन्छ।",
            },
          ]}
        />
      </div>
    </>
  );
};
export default MeroDaat;
