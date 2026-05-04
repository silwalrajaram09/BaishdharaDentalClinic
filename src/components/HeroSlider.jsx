import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    bgImage: "/src/assets/images/bg_1.jpg",
    title: "Because Your Smile Deserves The Best.",
    subtitle: "From Advanced Implantology To Complete Oral Care",
  },
  {
    bgImage: "/src/assets/images/bg_2.jpg",
    title: "Because Your Smile Deserves The Best.",
    subtitle: "From Advanced Implantology To Complete Oral Care",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      <AnimatePresence mode="wait">

        <motion.div
          key={currentSlide}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.bgImage})` }}

          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* content */}
          <div className="relative z-10 container mx-auto h-full flex items-center px-6">

            <div className="text-white max-w-2xl space-y-6">

              {/* TITLE (mask reveal effect) */}
              <motion.h1
                key={slide.title}
                initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                {slide.title}
              </motion.h1>

              {/* SUBTITLE */}
              <motion.p
                key={slide.subtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl opacity-90"
              >
                {slide.subtitle}
              </motion.p>

              {/* BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Link
                  to="/appointment"
                  className="inline-block bg-[#0b2a4a] hover:bg-[#081f36] text-white font-semibold px-8 py-4 rounded-full transition shadow-lg"
                >
                  Make an Appointment
                </Link>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </AnimatePresence>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-10 bg-white"
                : "w-3 bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;