import { motion } from "framer-motion";
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";

const columns = [
  [
    {
      label: "Prevention",
      topics: [
        {
          name: "Fluoride protection",
          text: "Strengthens enamel, remineralises early decay, and prevents new cavities effectively.",
        },
        {
          name: "Oral care routine",
          text: "Brush twice daily, floss, clean your tongue, and visit your dentist regularly.",
        },
        {
          name: "Dental implants",
          text: "Permanent tooth replacement using titanium posts anchored in the jawbone.",
        },
      ],
    },
    {
      label: "Causes",
      topics: [
        {
          name: "Tooth decay",
          text: "Bacteria + sugar = acid → cavities. Prevent with brushing and fluoride toothpaste.",
        },
        {
          name: "Acid wear",
          text: "Acidic drinks erode enamel over time, causing sensitivity and visible damage.",
        },
      ],
    },
  ],
  [
    {
      label: "Problems & pain",
      topics: [
        {
          name: "Toothache",
          text: "Decay causes sharp pain. May need a filling or root canal depending on severity.",
        },
        {
          name: "Gum disease",
          text: "Plaque buildup leads to gingivitis, and periodontitis if left untreated.",
        },
      ],
    },
    {
      label: "Treatments & cosmetic",
      topics: [
        {
          name: "Fillings",
          text: "Amalgam, composite, and GIC used depending on tooth condition and cavity size.",
        },
        {
          name: "Braces & aligners",
          text: "Correct crooked teeth and improve bite alignment over time.",
        },
        {
          name: "Bad breath",
          text: "Caused by bacteria, poor oral hygiene, or underlying infections.",
        },
        {
          name: "Tooth sensitivity",
          text: "Caused by enamel loss or gum recession. Use a sensitivity toothpaste.",
        },
      ],
    },
  ],
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const TopicRow = ({ item }) => (
  <div className="py-4 border-b border-gray-100 last:border-b-0">
    <h3 className="text-sm font-semibold text-[#0b2a4a] mb-1">{item.name}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
  </div>
);

const CategorySection = ({ category }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    className="mb-10 last:mb-0"
  >
    <h2 className="text-xs font-semibold uppercase tracking-wide text-[#2e7fc1] mb-2">
      {category.label}
    </h2>
    <div className="bg-white border border-gray-100 rounded-xl px-5">
      {category.topics.map((item, i) => (
        <TopicRow key={i} item={item} />
      ))}
    </div>
  </motion.div>
);

const MyTooth = () => {
  return (
    <>
      <SEO
        title="Your Guide to Oral Health | Baishdhara Dental Clinic"
        description="Learn about tooth decay, gum disease, dental implants, braces, oral hygiene, bad breath, tooth sensitivity, and other essential dental health topics."
        keywords="oral health, tooth decay, gum disease, dental implants, braces, oral hygiene, bad breath, tooth sensitivity, fluoride protection, dental care"
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-20">
          {/* Heading — centered */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-14 text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold font-playfair text-[#0b2a4a] leading-tight">
              Your complete guide to oral health
            </h1>
            <div className="mt-4 mx-auto w-10 h-0.5 rounded-full bg-[#2e7fc1]" />
            <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto">
              Simple, practical dental knowledge for a healthy smile — organised
              by what you're looking for.
            </p>
          </motion.div>

          {/* Two-column categorized content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {columns.map((column, colIndex) => (
              <div key={colIndex}>
                {column.map((category) => (
                  <CategorySection key={category.label} category={category} />
                ))}
              </div>
            ))}
          </div>

          {/* Footer reminder */}
          {/* <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 bg-white border border-gray-100 rounded-xl p-5"
          >
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-[#0b2a4a]">Remember: </span>
              Visit your dentist every 6 months for prevention, not just
              treatment.
            </p>
          </motion.div> */}
        </div>
      </div>

      <FAQ
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions"
        faqs={[
          {
            question: "How often should I visit the dentist?",
            answer:
              "It's recommended to visit your dentist every 6 months for regular check-ups and cleanings.",
          },
          {
            question: "What causes tooth decay?",
            answer:
              "Tooth decay is caused by bacteria in the mouth that produce acids from sugar, leading to cavities.",
          },
          {
            question: "How can I prevent gum disease?",
            answer:
              "Maintain good oral hygiene by brushing and flossing daily, and visit your dentist regularly.",
          },
          {
            question: "Are dental implants safe?",
            answer:
              "Yes, dental implants are a safe and effective way to replace missing teeth when performed by a qualified professional.",
          },
        ]}
      />
    </>
  );
};

export default MyTooth;
