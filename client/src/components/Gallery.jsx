import { useState } from "react";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

import gallery1 from "../assets/images/gallery-1.jpg";
import gallery2 from "../assets/images/gallery-2.jpg";
import gallery3 from "../assets/images/gallery-3.jpg";
import gallery4 from "../assets/images/gallery-4.jpg";
import beforeAfterBg from "../assets/images/before_after.jpg";
import ba1 from "../assets/images/ba1.jpeg";
import ba2 from "../assets/images/ba2.jpeg";
import ba3 from "../assets/images/ba4.jpeg"; // Note: adjusted map based on your variable sequence if needed
import ba4 from "../assets/images/ba4.jpeg";
import ba5 from "../assets/images/ba5.jpeg";
import ba6 from "../assets/images/ba6.jpeg";

const GalleryImages = [
  { src: gallery1, alt: "Dental Gallery 1" },
  { src: gallery2, alt: "Dental Gallery 2" },
  { src: gallery3, alt: "Dental Gallery 3" },
  { src: gallery4, alt: "Dental Gallery 4" },
];

const BeforeAfterPairs = [
  {
    after: ba1,
  },
  {
    after: ba2,
  },
  {
    after: ba3,
  },
  {
    after: ba4,
  },
  {
    after: ba5,
  },
  {
    after: ba6,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Gallery = () => {
  const [activePair, setActivePair] = useState(0);

  const toggleBeforeAfter = (index) => {
    setActivePair(index);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0b2a4a] mb-4">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See the quality of our dental work and amazing transformations
          </p>
        </motion.div>

        {/* GALLERY GRID */}
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {GalleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg drop-shadow-lg">
                  Gallery Image
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BEFORE / AFTER SLIDER */}
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h3 className="text-3xl font-bold text-[#0b2a4a] mb-3">
            Before & After Transformations
          </h3>
          <p className="text-gray-500">
            Real results from our dental treatments
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <motion.div
            key={activePair}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Before / After Labels */}
            <div className="absolute top-4 left-4 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              After
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={BeforeAfterPairs[activePair].after}
                alt={`Case ${activePair + 1}`}
                className="w-full h-[400px] object-contain"
              />

              {/* Gradient overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Bottom info bar */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">Case #{activePair + 1}</p>
              <p className="text-sm font-medium text-[#0b2a4a]">
                Smile Transformation
              </p>
            </div>
          </motion.div>

          {/* Navigation Dots (improved) */}
          <div className="flex justify-center gap-2 mt-6">
            {BeforeAfterPairs.map((_, index) => (
              <button
                key={index}
                onClick={() => toggleBeforeAfter(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activePair
                    ? "w-10 h-3 bg-[#0b2a4a]"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Gallery;
