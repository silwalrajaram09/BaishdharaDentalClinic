import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModel";

import hero1 from "../assets/images/hero1.PNG";
import hero2 from "../assets/images/hero2.PNG";
import hero3 from "../assets/images/hero3.PNG";
import welcomeImage from "../assets/images/welcomeImage.jpeg";
import doctor from "../assets/images/doctor.PNG";
import changeImage from "../assets/images/changeImage.PNG";

import imageFull from "../assets/images/imagefull.jpg";
import slide2 from "../assets/images/slide2.jpg";
import slide3 from "../assets/images/slide3.jpg";
import slide4 from "../assets/images/slide4.jpg";
import slide5 from "../assets/images/slide5.jpg";
import slide6 from "../assets/images/slide6.jpg";

const slides = [
  {
    tag: "Professional Dental Care",
    image: imageFull,
    mobileImage: welcomeImage,
    title: "Creating Confident Smiles Every Day",
    subtitle:
      "Advanced dental care with compassion, precision, and modern technology.",
    position: "object-[top]",
    cta: [
      { text: "Book Appointment", link: "#bookModal", primary: true },
      { text: "View Services", link: "/services", primary: false },
    ],
  },
  {
    tag: "Professional Dental Care",
    image: slide2,
    mobileImage: hero2,
    title: "Where Healthy Smiles Begin",
    subtitle:
      "Comprehensive dental treatments tailored for your entire family.",
    position: "object-[center_20%]",
    cta: [
      // { text: "Explore Treatments", link: "/services", primary: true },
      { text: "Contact Us", link: "/contact", primary: false },
    ],
  },
  {
    // tag: "Professional Dental Care",
    image: slide3,
    mobileImage: changeImage,
    // title: "Comfort You Can Count On",
    // subtitle: "A relaxing environment focused on your comfort and care.",
    position: "object-[top_20%]",
    // cta: [
    //   { text: "Book Appointment", link: "/contact", primary: true },
    //   { text: "View Services", link: "/services", primary: false },
    // ],
  },
  {
    tag: "Professional Dental Care",
    image: slide4,
    mobileImage: hero3,
    title: "Trusted Dental Experts",
    subtitle:
      "Experienced professionals dedicated to your comfort and oral health.",
    position: "object-[top_0.5%]",
    cta: [
      { text: "Meet Our Doctors", link: "/doctors", primary: true },
      // { text: "Call Us", link: "/contact", primary: false },
    ],
  },
  {
    tag: "Professional Dental Care",
    image: slide5,
    mobileImage: doctor,
    title: "Modern Dentistry, Personal Care",
    subtitle:
      "State-of-the-art treatments delivered in a warm and welcoming environment.",
    position: "object-center",
    cta: [{ text: "Our Services", link: "/services", primary: true }],
  },
  {
    tag: "Professional Dental Care",
    image: slide6,
    mobileImage: hero1,
    title: "Your Smile is Our Commitment",
    subtitle: "Helping families achieve healthy, beautiful smiles for life.",
    position: "object-[center_15%]",
    cta: [
      { text: "Book Appointment", link: "#bookModal", primary: true },
      // { text: "Learn More", link: "/about", primary: false },
    ],
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

const slideVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  enter: { opacity: 0, y: 35 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Detect mobile viewport for image selection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto slide, paused on hover/focus, and pauses when tab is hidden
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);

    const handleVisibility = () => {
      if (document.hidden) clearInterval(interval);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [nextSlide, paused]);

  // Keyboard navigation (only when slider is focused/hovered)
  useEffect(() => {
    if (!paused) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, paused]);

  // Touch events
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 75) nextSlide();
    if (distance < -75) prevSlide();
  };

  const slide = slides[currentSlide];
  const activeImage = isMobile && slide.mobileImage ? slide.mobileImage : slide.image;

  return (
    <section
      className="relative  w-full h-[40vh] sm:h-[60vh] md:h-[68vh] lg:h-[60vh] overflow-hidden bg-[#0b2a4a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero promotional slider"
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={activeImage}
          alt={slide.title || "Dental clinic promotional image"}
          initial="enter"
          animate="center"
          exit="exit"
          variants={slideVariants}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full object-cover ${slide.position}`}
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-r from-[#081c33]/90 via-[#0b2a4a]/60 to-[#0b2a4a]/20"
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="enter"
              animate="center"
              exit="exit"
              variants={contentVariants}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-full sm:max-w-xl lg:max-w-2xl"
            >
              {slide.tag && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-white text-xs sm:text-sm tracking-wide">
                    {slide.tag}
                  </span>
                </div>
              )}

              {slide.title && (
                <h1
                  className="text-white font-bold leading-[1.05] text-2xl sm:text-4xl md:text-5xl lg:text-4xl mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {slide.title}
                </h1>
              )}

              {slide.subtitle && (
                <p className="text-blue-50/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>
              )}

              {slide.cta?.length > 0 && (
                <div className="flex flex-col sm:flex-row items-start gap-3 mt-7 w-full">
                  {slide.cta.map((button, index) => (
                    <a 
                      key={index}
                      href={button.link}
                      className={`w-fit min-w-[170px] px-5 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 text-center hover:scale-[1.03] ${
                        button.primary
                          ? "bg-[#2e7fc1] hover:bg-[#2569a0] text-white shadow-lg shadow-[#2e7fc1]/20"
                          : "border border-white/30 bg-white/5 hover:bg-white hover:text-[#0b2a4a] text-white backdrop-blur-sm"
                      }`}
                    >
                      {button.text}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* DOT INDICATORS */}
      <div className=" bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={currentSlide === index}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 h-2 bg-[#2e7fc1]" : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;