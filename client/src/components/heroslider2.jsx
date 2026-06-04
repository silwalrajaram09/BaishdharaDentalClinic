// import { useState, useEffect, useCallback, useRef } from "react";
// import { motion } from "framer-motion";

// // Helps avoid horizontal scroll from long hero titles on tiny screens
// import "./heroSliderFixes";

// import hero1 from "../assets/images/hero1.PNG";
// import hero2 from "../assets/images/hero2.PNG";
// import hero3 from "../assets/images/hero3.PNG";
// import welcomeImage from "../assets/images/welcomeImage.jpeg";
// import doctor from "../assets/images/doctor.PNG";
// import image from "../assets/images/emergency dental care.PNG";

// const slides = [
//   {
//     bgImage: welcomeImage,
//     title: "Creating Confident Smiles Every Day",
//     subtitle: "Advanced dental care with compassion, precision, and modern technology.",
//   },
//   {
//     bgImage: hero2,
//     title: "Where Healthy Smiles Begin",
//     subtitle: "Comprehensive dental treatments tailored to your needs.",
//   },
//   {
//     bgImage: doctor,
//     title: "Trusted Dental Experts",
//     subtitle: "Experienced professionals dedicated to your comfort and oral health.",
//   },
//   {
//     bgImage: hero3,
//     title: "Modern Dentistry, Personal Care",
//     subtitle: "State-of-the-art treatments delivered in a warm and welcoming environment.",
//   },
//   {
//     bgImage: hero1,
//     title: "Your Smile is Our Commitment",
//     subtitle: "Helping families achieve healthy, beautiful smiles for life.",
//   },
// ];

// const SLIDE_INTERVAL = 5000;

// const HeroSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const timerRef = useRef(null);

//   const goToSlide = useCallback((index) => setCurrentSlide(index), []);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   }, []);

//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   }, []);

//   useEffect(() => {
//     if (paused) {
//       clearInterval(timerRef.current);
//       return;
//     }
//     timerRef.current = setInterval(nextSlide, SLIDE_INTERVAL);
//     return () => clearInterval(timerRef.current);
//   }, [paused, nextSlide]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowRight") nextSlide();
//       else if (e.key === "ArrowLeft") prevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [nextSlide, prevSlide]);

//   const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
//   const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) nextSlide();
//     if (touchStart - touchEnd < -75) prevSlide();
//   };

//   return (
//     <section
//       className="relative w-full overflow-hidden shadow-2xl bg-[#0b2a4a] h-[85vh] min-h-[500px] max-h-[850px]"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Slides Wrapper */}
//       <div
//         className="flex h-full transition-transform duration-1000"
//         style={{
//           transform: `translateX(-${currentSlide * 100}%)`,
//           transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
//         }}
//       >
//         {slides.map((slide, index) => {
//           const hasText = slide.title || slide.subtitle;
//           const isActive = index === currentSlide;

//           return (
//             <div key={index} className="relative w-full h-full shrink-0 overflow-hidden group">

//               {/* Image with subtle continuous zoom on active slide */}
//               <motion.img
//                 src={slide.bgImage}
//                 alt={slide.title || "Dental clinic"}
//                 className="absolute inset-0 w-full h-full object-cover object-[center_top] z-0"
//                 initial={{ scale: 1.15 }}
//                 animate={{ scale: isActive ? 1 : 1.15 }}
//                 transition={{ duration: 7, ease: "easeOut" }}
//                 loading={index === 0 ? "eager" : "lazy"}
//               />

//               {/* Sophisticated Gradient Overlays for Readability */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a4a]/90 via-[#0b2a4a]/40 to-transparent z-0" />
//               <div className="absolute inset-0 bg-black/10 z-0" />

//               {/* Content Container */}
//               <div className="relative z-10 h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-24 mx-auto w-full max-w-screen-2xl">
//                 {hasText && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
//                     transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//                     className="max-w-[95%] sm:max-w-[85%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]
//                                bg-white/10 backdrop-blur-md border border-white/20
//                                p-6 sm:p-8 md:p-10 lg:p-12 rounded-[2rem] shadow-2xl"
//                   >
//                     <motion.h1
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
//                       transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                       className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-md"
//                       style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//                     >
//                       {slide.title}
//                     </motion.h1>

//                     {slide.subtitle && (
//                       <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
//                         transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
//                         className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-50 leading-relaxed font-light drop-shadow-sm"
//                       >
//                         {slide.subtitle}
//                       </motion.p>
//                     )}
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Modern Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20
//                    w-10 h-10 md:w-14 md:h-14 flex items-center justify-center
//                    bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20
//                    text-white rounded-full transition-all duration-300
//                    hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
//                    focus:outline-none active:scale-95 group"
//         aria-label="Previous slide"
//       >
//         <svg className="w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20
//                    w-10 h-10 md:w-14 md:h-14 flex items-center justify-center
//                    bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20
//                    text-white rounded-full transition-all duration-300
//                    hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
//                    focus:outline-none active:scale-95 group"
//         aria-label="Next slide"
//       >
//         <svg className="w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
//       </button>

//       {/* Professional Slide Indicators */}
//       <div
//         className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20
//                    flex gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10"
//       >
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`transition-all duration-500 rounded-full focus:outline-none
//               ${
//                 index === currentSlide
//                   ? "bg-[#2e7fc1] w-8 sm:w-12 h-1.5 sm:h-2"
//                   : "bg-white/50 hover:bg-white w-2 sm:w-3 h-1.5 sm:h-2"
//               }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Animated Progress Bar */}
//       <div className="absolute bottom-0 left-0 w-full h-1 sm:h-1.5 bg-black/20 z-20">
//         <div
//           key={currentSlide}
//           className="h-full bg-gradient-to-r from-cyan-400 via-[#2e7fc1] to-blue-600 shadow-[0_0_10px_rgba(46,127,193,0.8)]"
//           style={{
//             width: "100%",
//             animation: `progress ${SLIDE_INTERVAL}ms linear forwards`,
//             animationPlayState: paused ? "paused" : "running",
//           }}
//         />
//       </div>
//     </section>
//   );
// };

// export default HeroSlider;