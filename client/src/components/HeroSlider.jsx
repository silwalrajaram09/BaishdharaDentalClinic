import { useState, useEffect } from "react";

import hero1 from "../assets/images/hero1.PNG";
import hero2 from "../assets/images/hero2.PNG";
import hero3 from "../assets/images/hero3.PNG";
import hero4 from "../assets/images/hero4.PNG";

const slides = [
  {
    bgImage: hero4,
    title: "Advanced Dental Care",
    subtitle:
      "Trusted dental treatments with modern technology and compassionate care.",
  },
  {
    bgImage: hero2,
    title: "Because Your Smile Deserves The Best",
    subtitle:
      "Modern implantology and complete dental solutions under one roof.",
  },
  {
    bgImage: hero3,
    title: "Your Smile, Our Priority",
    subtitle: "Comfortable, modern, and personalized dental care.",
  },
  {
    bgImage: hero1,
    title: "Healthy Smile, Happier Life",
    subtitle: "Dedicated to protecting your oral health every single day.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[90vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-full shrink-0 overflow-hidden"
          >
            {/* Image */}
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-contain md:object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl text-white">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>

                  {/* Optional Button */}
                  {/*
                  <Link
                    to="/appointment"
                    className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-medium transition duration-300"
                  >
                    Make Appointment
                  </Link>
                  */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
