import { useState } from "react";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

import gallery1 from "../assets/images/gallery-1.jpg";
import gallery2 from "../assets/images/gallery-2.jpg";
import gallery3 from "../assets/images/gallery-3.jpg";
import gallery4 from "../assets/images/gallery-4.jpg";
import beforeAfter1 from "../assets/images/cosmetic-dentistry.jpeg";
import beforeAfter2 from "../assets/images/orthodontic.jpeg";
import beforeAfter3 from "../assets/images/dental-implant.jpeg";
import beforeAfterBg from "../assets/images/before_after.jpg";

const GalleryImages = [
  { src: gallery1, alt: "Dental Gallery 1" },
  { src: gallery2, alt: "Dental Gallery 2" },
  { src: gallery3, alt: "Dental Gallery 3" },
  { src: gallery4, alt: "Dental Gallery 4" },
];

const BeforeAfterPairs = [
  {
    before: beforeAfter1,
    after: beforeAfterBg,
    service: "Cosmetic Dentistry",
    link: "/services/cosmetic-dentistry",
  },
  {
    before: beforeAfter2,
    after: beforeAfterBg,
    service: "Orthodontics",
    link: "/services/orthodontics",
  },
  {
    before: beforeAfter3,
    after: beforeAfterBg,
    service: "Dental Implants",
    link: "/services/implant-dentistry",
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
          <h3 className="text-3xl font-bold text-[#0b2a4a] mb-8">
            Before & After Transformations
          </h3>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Active Pair */}
          <motion.div
            key={activePair}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-3xl shadow-xl mb-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div>
                <div className="text-center mb-4">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    BEFORE
                  </span>
                </div>
                <img
                  src={BeforeAfterPairs[activePair].after}
                  alt="After"
                  className="w-full max-w-md mx-auto h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
              {/* Arrow */}
              <div className="hidden md:flex justify-center items-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
              {/* After */}
              <div>
                <div className="text-center mb-4">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    AFTER
                  </span>
                </div>
                {/* <img
                  src={BeforeAfterPairs[activePair].after}
                  alt="After"
                  className="w-full max-w-md mx-auto h-64 object-cover rounded-2xl shadow-lg"
                /> */}
              </div>
            </div>
            {/* <div className="text-center mt-6">
              <h4 className="text-2xl font-bold text-[#0b2a4a] mb-2">
                {BeforeAfterPairs[activePair].service}
              </h4>
              <Link
                to={BeforeAfterPairs[activePair].link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Learn More →
              </Link>
            </div> */}
          </motion.div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3">
            {BeforeAfterPairs.map((_, index) => (
              <button
                key={index}
                onClick={() => toggleBeforeAfter(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activePair
                    ? "w-8 bg-blue-600 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
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
