import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = ({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions",
  faqs = [],
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Single, quiet wave along the very top edge */}
      <svg
        className="absolute top-0 left-0 w-full text-[#f4f7f8]"
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: "56px" }}
      >
        <path
          d="M0,40 C360,10 1080,70 1440,40 L1440,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0b2a4a] font-playfair">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              {subtitle}
            </p>
          )}

          {/* Restrained wave divider — a single low-amplitude curve, not a squiggle */}
          <svg
            className="mx-auto mt-6"
            width="88"
            height="10"
            viewBox="0 0 88 10"
            fill="none"
          >
            <path
              d="M2 6 C 24 -1, 64 13, 86 6"
              stroke="#2e7fc1"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`
                  relative rounded-xl bg-white overflow-hidden
                  border transition-colors duration-300
                  ${isOpen ? "border-[#2e7fc1]/30" : "border-gray-200"}
                `}
                style={{
                  boxShadow: isOpen
                    ? "0 4px 16px -8px rgba(11,42,74,0.12)"
                    : "0 1px 2px rgba(11,42,74,0.03)",
                }}
              >
                {/* Flow accent — a thin left rule, present always, deepens on open */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300"
                  style={{
                    background: isOpen ? "#2e7fc1" : "#e5eaee",
                  }}
                />

                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 pl-7 pr-6 py-5 text-left transition hover:bg-[#f8fafb]"
                >
                  <span className="text-base md:text-lg font-semibold text-[#0b2a4a]">
                    {faq.question}
                  </span>

                  <span
                    className="relative shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors duration-300"
                    style={{
                      background: isOpen ? "#0b2a4a" : "#ffffff",
                      borderColor: isOpen ? "#0b2a4a" : "#d7dee3",
                    }}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex"
                    >
                      <Plus
                        size={14}
                        className={isOpen ? "text-white" : "text-[#0b2a4a]"}
                      />
                    </motion.span>
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-7 mr-6 border-t border-gray-100" />
                      <p className="pl-7 pr-6 pt-4 pb-6 text-gray-600 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;