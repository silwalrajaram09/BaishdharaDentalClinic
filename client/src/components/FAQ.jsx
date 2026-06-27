import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = ({ data }) => {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i} className="border rounded-xl bg-white">
          <button
            className="w-full text-left p-4 flex justify-between"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium">{item.question}</span>
            <span>{open === i ? "-" : "+"}</span>
          </button>

          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 text-sm text-gray-600"
              >
                {item.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
