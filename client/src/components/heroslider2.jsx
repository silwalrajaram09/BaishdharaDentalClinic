import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import hero1 from "../assets/images/hero1.PNG";
import hero2 from "../assets/images/hero2.PNG";
import hero3 from "../assets/images/hero3.PNG";
import welcomeImage from "../assets/images/welcomeImage.jpeg";
import doctor from "../assets/images/doctor.PNG";
import changeImage from "../assets/images/changeImage.PNG";



const slides = [
  {
    tag: "Professional Dental Care",
    image: welcomeImage,
    title: "Creating Confident Smiles Every Day",
    subtitle:
      "Advanced dental care with compassion, precision, and modern technology.",
    position: "object-[center_35%]",

    cta: [
      {
        text: "Book Appointment",
        link: "",
        primary: true,
      },
      {
        text: "View Services",
        link: "/services",
        primary: false,
      },
    ],
  },

  {
    tag: "Professional Dental Care",
    image: hero2,
    title: "Where Healthy Smiles Begin",
    subtitle:
      "Comprehensive dental treatments tailored for your entire family.",
    position: "object-[center_20%]",

    cta: [
      {
        text: "Explore Treatments",
        link: "/services",
        primary: true,
      },
      {
        text: "Contact Us",
        link: "/contact",
        primary: false,
      },
    ],
  },

  {
    image: changeImage,
    // title: "Beautiful Smiles Start Here",
    // subtitle:
    //   "Personalized dental solutions designed for comfort and confidence.",
    // position: "object-center",

    // cta: [
    //   {
    //     text: "Book Consultation",
    //     link: "/contact",
    //     primary: true,
    //   },
    // ],
  },

  {
    tag: "Professional Dental Care",
    image: doctor,
    title: "Trusted Dental Experts",
    subtitle:
      "Experienced professionals dedicated to your comfort and oral health.",
    position: "object-[top_0.5%]",

    cta: [
      {
        text: "Meet Our Doctors",
        link: "/doctors",
        primary: true,
      },
      {
        text: "Call Us",
        link: "/contact",
        primary: false,
      },
    ],
  },

  {
    tag: "Professional Dental Care",
    image: hero3,
    title: "Modern Dentistry, Personal Care",
    subtitle:
      "State-of-the-art treatments delivered in a warm and welcoming environment.",
    position: "object-center",

    cta: [
      {
        text: "Our Services",
        link: "/services",
        primary: true,
      },
    ],
  },

  {
    tag: "Professional Dental Care",
    image: hero1,
    title: "Your Smile is Our Commitment",
    subtitle: "Helping families achieve healthy, beautiful smiles for life.",
    position: "object-[center_15%]",

    cta: [
      {
        text: "Book Appointment",
        link: "/contact",
        primary: true,
      },
      {
        text: "Learn More",
        link: "/about",
        primary: false,
      },
    ],
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef(null);

  // NEXT SLIDE
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  // PREVIOUS SLIDE
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [nextSlide, paused]);

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // TOUCH EVENTS
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 75) nextSlide();
    if (distance < -75) prevSlide();
  };

  return (
    <section
      className="
        relative
        w-full
        h-[55vh]
        sm:h-[60vh]
        md:h-[68vh]
        lg:h-[78vh]
        overflow-hidden
        bg-[#0b2a4a]
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className={`
            absolute
            inset-0
            w-full
            h-full
            object-cover
            ${slides[currentSlide].position}
          `}
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-linear-to-r
          from-[#081c33]/90
          via-[#0b2a4a]/60
          to-[#0b2a4a]/20
        "
      />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div
          className="
            max-w-7xl
            mx-auto
            w-full
            px-5
            sm:px-8
            lg:px-12
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-full
                sm:max-w-xl
                lg:max-w-2xl
              "
            >
              {/* BADGE */}
              {slides[currentSlide].tag && (
                <div
                  className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-white/10
                  border
                  border-white/20
                  backdrop-blur-sm
                  mb-5
                "
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                  <span
                    className="
                    text-white
                    text-xs
                    sm:text-sm
                    tracking-wide
                  "
                  >
                    {slides[currentSlide].tag}
                  </span>
                </div>
              )}

              {/* TITLE */}
              <h1
                className="
                  text-white
                  font-bold
                  leading-[1.05]
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                  mb-4
                "
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {slides[currentSlide].title}
              </h1>

              {/* SUBTITLE */}
              <p
                className="
                  text-blue-50/90
                  text-sm
                  sm:text-base
                  md:text-lg
                  leading-relaxed
                  max-w-xl
                "
              >
                {slides[currentSlide].subtitle}
              </p>

              {/* CTA BUTTONS */}
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-start
                  gap-3
                  mt-7
                  w-full
                "
              >
                {slides[currentSlide].cta?.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`
                      w-fit
                      min-w-[170px]
                      px-5
                      py-3
                      rounded-full
                      text-sm
                      sm:text-base
                      font-medium
                      transition-all
                      duration-300
                      text-center
                      hover:scale-[1.03]

                      ${
                        button.primary
                          ? `
                            bg-[#2e7fc1]
                            hover:bg-[#2569a0]
                            text-white
                            shadow-lg
                            shadow-[#2e7fc1]/20
                          `
                          : `
                            border
                            border-white/30
                            bg-white/5
                            hover:bg-white
                            hover:text-[#0b2a4a]
                            text-white
                            backdrop-blur-sm
                          `
                      }
                    `}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="
          hidden
          md:flex
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          z-30
          w-12
          h-12
          rounded-full
          bg-white/10
          hover:bg-white/20
          border
          border-white/20
          backdrop-blur-md
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
        "
        aria-label="Previous Slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="
          hidden
          md:flex
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          z-30
          w-12
          h-12
          rounded-full
          bg-white/10
          hover:bg-white/20
          border
          border-white/20
          backdrop-blur-md
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
        "
        aria-label="Next Slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* DOT INDICATORS */}
      <div
        className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          z-30
          flex
          gap-2
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                currentSlide === index
                  ? "w-8 h-2 bg-[#2e7fc1]"
                  : "w-2 h-2 bg-white/50 hover:bg-white"
              }
            `}
            aria-label={`Go to Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
