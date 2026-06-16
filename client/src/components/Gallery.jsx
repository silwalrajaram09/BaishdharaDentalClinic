import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import case1 from "../assets/images/case1.webp";
import case2 from "../assets/images/case2.webp";
import case3 from "../assets/images/case3.webp";
import case4 from "../assets/images/case4.webp";
import case5 from "../assets/images/case5.webp";
import case6 from "../assets/images/case6.webp";
import case8 from "../assets/images/case8.webp";
import case9 from "../assets/images/case9.webp";
import case10 from "../assets/images/ba2.jpeg";
import case11 from "../assets/images/ba3.jpeg";
import case12 from "../assets/images/ba4.jpeg";
import case13 from "../assets/images/ba5.jpeg";
import case14 from "../assets/images/ba6.jpeg";
import gallery1 from "../assets/images/person_6.jpg";
import gallery2 from "../assets/images/about-2.jpg";

const GalleryImages = [
  { src: case1, alt: "Dental Case 1", title: "Case I" },
  { src: case2, alt: "Dental Case 2", title: "Case II" },
  { src: case3, alt: "Dental Case 3", title: "Case III" },
  { src: case4, alt: "Dental Case 4", title: "Case IV" },
  { src: case5, alt: "Dental Case 5", title: "Case V" },
  { src: case6, alt: "Dental Case 6", title: "Case VI" },
  { src: case8, alt: "Dental Case 7", title: "Case VII" },
  { src: case9, alt: "Dental Case 8", title: "Case VIII" },
  { src: case10, alt: "Dental Case 8", title: "Case X" },
  { src: case11, alt: "Dental Case 8", title: "Case XI" },
  { src: case12, alt: "Dental Case 8", title: "Case XII" },
  { src: case13, alt: "Dental Case 8", title: "Case XIII" },
  { src: case14, alt: "Dental Case 8", title: "Case XIV" },
  { src: gallery1, alt: "Dental Case 8", title: "Gallery Image" },
  { src: gallery2, alt: "Dental Case 8", title: "Gallery Image" },
];

// Animation Variants
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const header = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? GalleryImages.length - 1 : prev - 1,
    );
  };

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === GalleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <>
      {/* YOUR GALLERY SECTION */}
      <section className="py-24  bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* HEADER */}
          <motion.div
            variants={header}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b2a4a]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Gallery
            </h2>

            <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-[#2e7fc1]" />

            <p className="mt-4 text-gray-500 max-w-md mx-auto text-base">
              See the quality of our dental work and amazing transformations.
            </p>
          </motion.div>

          {/* GRID */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true, amount: 0.15 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
          >
            {GalleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35 }}
                onClick={() => openImage(index)}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                  transition-all
                  duration-500
                  cursor-pointer
                "
              >
                <div className="overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/10
                    to-transparent
                    opacity-80
                    group-hover:opacity-100
                    transition-all
                    duration-500
                  "
                />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-xl font-semibold">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              bg-black/90 backdrop-blur-sm
              flex items-center justify-center
              p-4
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeImage}
              className="
                absolute top-5 right-5
                text-white
                bg-white/10
                hover:bg-white/20
                p-3 rounded-full
                transition
              "
            >
              <X size={24} />
            </button>

            {/* PREV BUTTON */}
            <button
              onClick={showPrev}
              className="
                absolute left-4 md:left-8
                text-white
                bg-white/10
                hover:bg-white/20
                p-3 rounded-full
                transition
              "
            >
              <ChevronLeft size={30} />
            </button>

            {/* IMAGE */}
            <motion.img
              key={GalleryImages[selectedIndex].src}
              src={GalleryImages[selectedIndex].src}
              alt={GalleryImages[selectedIndex].alt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="
                max-w-full
                max-h-[85vh]
                rounded-2xl
                shadow-2xl
                object-contain
              "
            />

            {/* NEXT BUTTON */}
            <button
              onClick={showNext}
              className="
                absolute right-4 md:right-8
                text-white
                bg-white/10
                hover:bg-white/20
                p-3 rounded-full
                transition
              "
            >
              <ChevronRight size={30} />
            </button>

            {/* IMAGE TITLE */}
            <div className="absolute bottom-6 text-center text-white">
              <p className="text-lg font-medium">
                {GalleryImages[selectedIndex].title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
