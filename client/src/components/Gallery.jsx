import { motion } from "framer-motion";

// Images
import case1 from "../assets/images/case1.PNG";
import case2 from "../assets/images/case2.PNG";
import case3 from "../assets/images/case3.PNG";
import case4 from "../assets/images/case4.PNG";
import case5 from "../assets/images/case5.PNG";
import case6 from "../assets/images/case6.PNG";
import case8 from "../assets/images/case8.PNG";
import case9 from "../assets/images/case9.PNG";

// Data
const GalleryImages = [
  { src: case1, alt: "Dental Case 1", title: "Case I" },
  { src: case2, alt: "Dental Case 2", title: "Case II" },
  { src: case3, alt: "Dental Case 3", title: "Case III" },
  { src: case4, alt: "Dental Case 4", title: "Case IV" },
  { src: case5, alt: "Dental Case 5", title: "Case V" },
  { src: case6, alt: "Dental Case 6", title: "Case VI" },
  { src: case8, alt: "Dental Case 7", title: "Case VII" },
  { src: case9, alt: "Dental Case 8", title: "Case VIII" },
];

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
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
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <motion.div
          variants={header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2
            className="text md:text-3xl font-bold text-[#0b2a4a]"
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
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {GalleryImages.map((image) => (
            <motion.div
              key={image.src}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg drop-shadow-lg">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
