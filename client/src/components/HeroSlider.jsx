import { useState, useEffect, useCallback, useRef } from "react";
import hero1 from "../assets/images/hero1.PNG";
import hero2 from "../assets/images/hero2.PNG";
import hero3 from "../assets/images/hero3.PNG";
import hero4 from "../assets/images/hero4.PNG";
import doctor from "../assets/images/doctor.PNG";

const slides = [
  {
    bgImage: hero4,
    title: "Welcome to Baishdhara Dental",
    subtitle: "Your trusted partner for a lifetime of healthy smiles.",
  },
  {
    bgImage: hero2,
    title: "Because Your Smile Deserves the Best",
    subtitle:
      "Modern implantology and complete dental solutions under one roof.",
  },
  {
    bgImage: doctor,
  },
  {
    bgImage: hero3,
    title: "Your Smile, Our Priority",
    subtitle: "Comfortable, modern, and personalized dental care.",
  },
  {
    bgImage: hero1,
    title: "Healthy Smile, Happier Life",
    subtitle: "Dedicated to protecting your oral health every day.",
  },
];

const SLIDE_INTERVAL = 5000;

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef(null);

  const goToSlide = useCallback((index) => setCurrentSlide(index), []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  return (
    <section
      // ✅ FIX 1: Cleaner height scale — smaller on mobile, grows up
      className="relative w-full h-55 sm:h-80 md:h-105 lg:h-130 xl:h-150 overflow-hidden shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const hasText = slide.title || slide.subtitle;
          return (
            <div key={index} className="relative w-full h-full shrink-0">
              
              <img
                src={slide.bgImage}
                alt={slide.title || "Dental clinic"}
                className="absolute inset-0 w-full h-full object-contain object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                {hasText && (
                  <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%] xl:max-w-[50%] text-white">
                    <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight drop-shadow-sm">
                      {slide.title}
                    </h1>
                    {slide.subtitle && (
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-100 leading-relaxed opacity-90 drop-shadow-sm">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

     
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 sm:left-4 md:left-6 lg:left-8 -translate-y-1/2
                   bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white
                   w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12
                   rounded-full transition-all duration-300 flex items-center justify-center
                   text-base sm:text-xl md:text-2xl
                   hover:scale-110 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 sm:right-4 md:right-6 lg:right-8 -translate-y-1/2
                   bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white
                   w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12
                   rounded-full transition-all duration-300 flex items-center justify-center
                   text-base sm:text-xl md:text-2xl
                   hover:scale-110 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        ❯
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6
                      left-1/2 -translate-x-1/2
                      flex gap-2 sm:gap-3
                      px-3 py-2 rounded-full bg-black/20 backdrop-blur-sm"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50
              ${
                index === currentSlide
                  ? "bg-white w-6 sm:w-8 md:w-10 h-1.5 sm:h-2"
                  : "bg-white/50 hover:bg-white/80 w-2 sm:w-2.5 h-1.5 sm:h-2"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/20">
        <div
          key={currentSlide}
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{
            width: "100%",
            animation: `progress ${SLIDE_INTERVAL}ms linear forwards`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
