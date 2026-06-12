import { useState, useEffect, useCallback, useRef } from "react";
import "./HeroSlider.css";

// Removed unused motion import
// import hero1 from "../assets/images/hero1.PNG";
// import hero2 from "../assets/images/hero2.PNG";
// import hero3 from "../assets/images/hero3.PNG";
// import doctor from "../assets/images/doctor.PNG";
// import welcome from "../assets/images/welcomeImage.jpg";
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import doctor from "../assets/images/doctor.jpg";
import welcome from "../assets/images/welcomeImage-2.jpg";
import changeImage from "../assets/images/changeImage.PNG";

const slides = [
  {
    bgImage: welcome,
    title: "Welcome to Baishdhara Dental Clinic",
    subtitle:
      "Experience compassionate, expert dental care in a modern, welcoming environment.",
    badge: "Trusted by 10,000+ Patients",
    accent: "#06b6d4",
  },
  {
    bgImage: hero2,
    title: "Modern Dentistry You Can Trust",
    subtitle:
      "Providing comprehensive dental solutions for healthy, confident smiles.",
    badge: "State-of-the-Art Technology",
    accent: "#3b82f6",
  },
  {
    bgImage: doctor,
    title: "Expert Care. Lasting Results.",
    subtitle:
      "Dedicated dental professionals committed to excellence in oral healthcare.",
    badge: "Expert Medical Team",
    accent: "#06b6d4",
  },
  {
    bgImage: hero3,
    title: "Healthy Smiles Start Here",
    subtitle:
      "Comprehensive preventive, restorative, and cosmetic dental services.",
    badge: "Full-Service Dental Care",
    accent: "#3b82f6",
  },
  {
    bgImage: hero1,
    title: "Your Smile Deserves the Best",
    subtitle:
      "Creating confident smiles through innovation, expertise, and personalized attention.",
    badge: "Award-Winning Practice",
    accent: "#06b6d4",
  },
];

const SLIDE_INTERVAL = 5000;

// Inline CSS injected once for keyframe animations

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="7" fill="rgba(6,182,212,0.2)" />
    <path
      d="M4 7l2 2 4-4"
      stroke="#06b6d4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TRUST_ITEMS = [
  "Certified Dental Professionals",
  "Painless Modern Procedures",
  "Flexible Payment Plans",
];

/* ─── Typing Animation Component ─── */
const TypingText = ({
  text,
  delay = 0,
  speed = 30,
  className,
  style,
  as: Component = "p",
}) => {
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setCharIndex(0);
    setShowCursor(false);
    setIsDone(false);
    if (!text) return;

    let timeout;
    let interval;

    timeout = setTimeout(() => {
      setShowCursor(true);
      interval = setInterval(() => {
        setCharIndex((prev) => {
          if (prev < text.length) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setIsDone(true);
            return prev;
          }
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <Component className={className} style={{ ...style, position: "relative" }}>
      {/* Invisible full text establishes exact layout dimensions (prevents shift!) */}
      <span style={{ visibility: "hidden" }}>{text}</span>

      {/* Absolute overlay types out the text in the exact same footprint */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          textAlign: "inherit",
        }}
      >
        {text.slice(0, charIndex)}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1.1em",
            backgroundColor: "currentColor",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            opacity: showCursor ? (isDone ? 0 : 1) : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </span>
    </Component>
  );
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setAnimKey((k) => k + 1);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAnimKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setAnimKey((k) => k + 1);
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

  const slide = slides[currentSlide];

  return (
    <section
      className="hero-section-root relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #eff6ff 100%)",
        // minHeight: "min(92vh, 700px)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero slideshow"
      role="region"
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "45%",
          height: "70%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-8%",
          width: "50%",
          height: "80%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* SPLIT LAYOUT CONTAINER */}
      <div
        className="hero-split-container"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "min(92vh, 700px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── LEFT PANEL: Text Content ── */}
        <div
          className="hero-left-panel hero-body-font"
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "3rem 2.5rem 3rem 4.5rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Badge */}
          <div
            key={`badge-${animKey}`}
            className="hero-slide-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: "100px",
              padding: "6px 14px",
              marginBottom: "1.25rem",
              width: "fit-content",
            }}
          >
            <span style={{ fontSize: "16px" }}>✦</span>
            <span
              style={{
                fontSize: "clamp(11px, 1.2vw, 13px)",
                fontWeight: 600,
                color: "#0891b2",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <TypingText
            key={`title-${animKey}`}
            text={slide.title}
            delay={400}
            speed={40}
            as="h1"
            className="hero-title-font hero-slide-text md:none"
            style={{
              fontSize: "clamp(1.65rem, 3.2vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0c1a2e",
              marginBottom: "1rem",
            }}
          />
          <TypingText
            key={`sub-${animKey}`}
            text={slide.subtitle}
            delay={400 + slide.title.length * 40 + 200}
            speed={25}
            as="p"
            className="hero-body-font hero-slide-text-delay-1"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              fontWeight: 400,
              maxWidth: "480px",
            }}
          />

          {/* Trust Items — Glassmorphism Card */}
          <div
            key={`trust-${animKey}`}
            className="hero-glass-card hero-slide-text-delay-3"
            style={{
              background: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.9)",
              borderRadius: "16px",
              padding: "14px 18px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              maxWidth: "360px",
              boxShadow:
                "0 8px 32px rgba(6,182,212,0.08), 0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            {TRUST_ITEMS.map((item) => (
              <div
                key={item}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckIcon />
                <span
                  style={{
                    fontSize: "clamp(12px, 1.1vw, 13.5px)",
                    color: "#334155",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL: Image ── */}
        <div
          style={{
            width: "55%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2.5rem 3.5rem 2.5rem 1.5rem",
            zIndex: 2,
          }}
        >
          {/* Decorative rings */}
          <div
            aria-hidden="true"
            className="hero-decor-ring"
            style={{
              width: "320px",
              height: "320px",
              top: "5%",
              right: "3%",
              animationDelay: "0s",
            }}
          />
          <div
            aria-hidden="true"
            className="hero-decor-ring"
            style={{
              width: "200px",
              height: "200px",
              bottom: "8%",
              right: "8%",
              animationDelay: "1.5s",
              borderColor: "rgba(59,130,246,0.2)",
            }}
          />

          {/* Image wrapper */}
          <div
            className="hero-img-wrapper hero-float-element"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "580px",
              aspectRatio: "16 / 9",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow:
                "0 30px 80px rgba(6,182,212,0.18), 0 12px 32px rgba(0,0,0,0.12)",
            }}
          >
            {/* Blurred background fill to prevent letterboxing */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(18px)",
                transform: "scale(1.15)",
                opacity: 0.5,
                zIndex: 0,
                transition: "background-image 0.5s ease",
              }}
            />

            {/* Main image */}
            <img
              key={`img-${animKey}`}
              src={slide.bgImage}
              alt={slide.title || "Dental clinic"}
              className="hero-slide-img"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 1,
              }}
            />

            {/* Subtle top gradient overlay for depth */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(240,249,255,0.08) 0%, transparent 40%, rgba(14,165,233,0.06) 100%)",
                zIndex: 2,
                borderRadius: "24px",
                pointerEvents: "none",
              }}
            />

            {/* Floating stat card - fixed with content */}
            <div
              key={`stat-${animKey}`}
              className="hero-glass-card hero-badge-pop hero-slide-badge"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                background: "rgba(255,255,255,0.88)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "14px",
                padding: "10px 16px",
                zIndex: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (Immersive Background) ── */}
      <div
        className="hero-mobile-bg"
        style={{
          display: "none",
          position: "absolute",
          inset: 0,
          // height: "min(60%, 60vw)",
          backgroundColor: "transparent",
          //photo should be zoom ou
          zIndex: 1,
        }}
      >
        <img
          src={slide.bgImage}
          alt={slide.title || "Background"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
      

      <div
        className="hero-mobile-content"
        style={{
          display: "none",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          inset: 0,
          zIndex: 3,
          padding: "2rem 1.5rem 2rem",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
        }}
      >
        <h3
          className="hero-title-font hero-slide-text"
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#fff",
            marginBottom: "0.75rem",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {slide.title}
        </h3>
        {/* <TypingText
          key={`mob-title-${animKey}`}
          text={slide.title}
          delay={400}
          speed={40}
          as="h3"
          className="hero-title-font hero-slide-text"
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#fff",
            marginBottom: "0.75rem",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        /> */}
        <TypingText
          key={`mob-sub-${animKey}`}
          text={slide.subtitle}
          delay={400 + slide.title.length * 40 + 200}
          speed={25}
          as="p"
          className="hero-slide-text-delay-1 hero-body-font"
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            fontWeight: 400,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      {/* ── NAVIGATION ARROWS ── */}
      {/* <button
        onClick={prevSlide}
        className="hero-nav-btn hero-nav-prev-btn"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="hero-nav-btn hero-nav-next-btn"
        aria-label="Next slide"
      >
        ›
      </button> */}

      {/* ── SLIDE INDICATORS ── */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "5%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          background: "rgba(255,255,255,0.70)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.9)",
          borderRadius: "100px",
          padding: "8px 14px",
          zIndex: 10,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              border: "none",
              cursor: "pointer",
              padding: 0,
              height: "6px",
              width: index === currentSlide ? "28px" : "6px",
              borderRadius: "100px",
              background:
                index === currentSlide
                  ? "linear-gradient(90deg, #06b6d4, #3b82f6)"
                  : "rgba(100,116,139,0.35)",
              transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              outline: "none",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 0 2px rgba(6,182,212,0.5)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        ))}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background: "rgba(6,182,212,0.12)",
          zIndex: 10,
        }}
      >
        <div
          key={currentSlide}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
            animation: `hero-progress ${SLIDE_INTERVAL}ms linear forwards`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
