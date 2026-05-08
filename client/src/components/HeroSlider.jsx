import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

const slides = [
  {
    bgImage: "/src/assets/images/bg_1.jpg",
    title: "Because Your Smile Deserves The Best.",
    subtitle: "From Advanced Implantology To Complete Oral Care",
  },
  {
    bgImage: "/src/assets/images/bg_2.jpg",
    title: "Good Dental Health.",
    subtitle: "We are Committed to Your Dental Wellness",
  },
  {
    bgImage: "/src/assets/images/image_1.jpg",
    title: "Healthy Smile, Happy Life.",
    subtitle: "We Care For Your Dental Health",
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
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Slides Wrapper */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-xl text-white">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-lg md:text-xl mb-6 text-gray-200">
                    {slide.subtitle}
                  </p>

                  {/* <Link
                    to="/appointment"
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-5 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition"
                  >
                    Make Appointment
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-6 md:left-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full ${
              index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
