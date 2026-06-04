import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// Helps avoid horizontal scroll from long hero titles on tiny screens
import "./heroSliderFixes";

import hero1 from "../assets/images/hero1.PNG";
import hero2 from "../assets/images/hero2.PNG";
import hero3 from "../assets/images/hero3.PNG";
import welcomeImage from "../assets/images/welcomeImage.jpeg";
import doctor from "../assets/images/doctor.PNG";

const slides = [
  {
    bgImage: welcomeImage,
    title: "Exceptional Dental Care for Every Smile",
    subtitle:
      "Advanced technology, personalized treatment, and compassionate care designed around your comfort.",
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
const injectStyles = () => {
  if (document.getElementById("hero-slider-styles")) return;
  const style = document.createElement("style");
  style.id = "hero-slider-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    @keyframes hero-progress {
      from { width: 0%; }
      to { width: 100%; }
    }
    @keyframes hero-fade-up {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes hero-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes hero-img-zoom {
      from { transform: scale(1.06); }
      to { transform: scale(1); }
    }
    @keyframes hero-badge-pop {
      0% { opacity: 0; transform: translateY(12px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes hero-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes hero-shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .hero-slide-text {
      animation: hero-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .hero-slide-text-delay-1 {
      animation: hero-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
    }
    .hero-slide-text-delay-2 {
      animation: hero-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
    }
    .hero-slide-text-delay-3 {
      animation: hero-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
    }
    .hero-slide-img {
      animation: hero-img-zoom 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .hero-slide-badge {
      animation: hero-badge-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both;
    }
    .hero-float-element {
      animation: hero-float 4s ease-in-out infinite;
    }
    .hero-nav-btn {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .hero-nav-btn:hover {
      transform: scale(1.08);
    }
    .hero-nav-btn:active {
      transform: scale(0.94);
    }
    .hero-glass-card {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    .hero-title-font {
      font-family: 'Playfair Display', Georgia, serif;
    }
    .hero-body-font {
      font-family: 'DM Sans', system-ui, sans-serif;
    }
    .hero-dot-active {
      background: linear-gradient(90deg, #06b6d4, #3b82f6);
    }
    .hero-cta-primary {
      background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(6,182,212,0.35);
    }
    .hero-cta-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(6,182,212,0.45);
    }
    .hero-cta-secondary {
      border: 2px solid rgba(255,255,255,0.6);
      transition: all 0.3s ease;
    }
    .hero-cta-secondary:hover {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.9);
      transform: translateY(-2px);
    }
    .hero-img-wrapper::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 1.5rem;
      background: linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(59,130,246,0.3) 50%, transparent 100%);
      z-index: 0;
    }
    .hero-decor-ring {
      border: 2px solid rgba(6,182,212,0.25);
      border-radius: 50%;
      position: absolute;
      animation: hero-float 5s ease-in-out infinite;
    }

    /* ── MOBILE: immersive background-hero layout (< 640px) ── */
    @media (max-width: 639px) {
      /* Section becomes a fixed-height viewport block */
      .hero-section-root {
        min-height: 75vh !important;
        height: 75vh !important;
        max-height: 820px !important;
      }

      /* Mobile background image: full-cover behind everything */
      .hero-mobile-bg {
        display: block !important;
      }

      /* Hide the desktop split layout entirely on mobile */
      .hero-split-container {
        display: none !important;
      }

      /* Mobile content layer sits on top of bg image */
      .hero-mobile-content {
        display: flex !important;
      }

      /* Nav arrows: hug the edges */
      .hero-nav-prev-btn {
        left: 6px !important;
        width: 38px !important;
        height: 38px !important;
        font-size: 20px !important;
        background: rgba(0,0,0,0.35) !important;
        border-color: rgba(255,255,255,0.2) !important;
        color: #fff !important;
      }
      .hero-nav-next-btn {
        right: 6px !important;
        width: 38px !important;
        height: 38px !important;
        font-size: 20px !important;
        background: rgba(0,0,0,0.35) !important;
        border-color: rgba(255,255,255,0.2) !important;
        color: #fff !important;
      }

      /* Slide indicators: white dots on dark mobile bg */
      .hero-indicators-wrap {
        background: rgba(0,0,0,0.30) !important;
        border-color: rgba(255,255,255,0.15) !important;
        bottom: 14px !important;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .hero-left-panel {
        padding: 2rem 2rem 2rem 2.5rem !important;
      }
    }
  `;
  document.head.appendChild(style);
};

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

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    injectStyles();
  }, []);

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
        minHeight: "min(92vh, 700px)",
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
          <h1
            key={`title-${animKey}`}
            className="hero-title-font hero-slide-text"
            style={{
              fontSize: "clamp(1.65rem, 3.2vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#0c1a2e",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${animKey}`}
            className="hero-slide-text-delay-1"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              fontWeight: 400,
              maxWidth: "480px",
            }}
          >
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            key={`cta-${animKey}`}
            className="hero-slide-text-delay-2"
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            <button
              className="hero-cta-primary hero-body-font"
              style={{
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                padding: "12px 28px",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              Book Appointment
            </button>
            <button
              className="hero-cta-secondary hero-body-font"
              style={{
                color: "#1e40af",
                background: "rgba(59,130,246,0.06)",
                borderRadius: "50px",
                padding: "12px 24px",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              Our Services →
            </button>
          </div>

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
              height: "min(75vh, 540px)",
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
                objectFit: "contain",
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

            {/* Floating stat card */}
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
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                🦷
              </div>
              <div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0c1a2e",
                    lineHeight: 1,
                  }}
                >
                  10,000+
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: 500,
                    marginTop: "2px",
                  }}
                >
                  Happy Patients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (Immersive Background) ── */}
      <div
        className="hero-mobile-bg"
        style={{
          display: "none", // overridden by CSS on mobile
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${slide.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(12,26,46,0.95) 0%, rgba(12,26,46,0.4) 60%, transparent 100%)",
          }}
        />
      </div>

      <div
        className="hero-mobile-content"
        style={{
          display: "none", // overridden by CSS on mobile
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          zIndex: 2,
          height: "100%",
          padding: "2rem 1.5rem 5rem 1.5rem",
        }}
      >
        <div
          key={`mob-badge-${animKey}`}
          className="hero-slide-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "100px",
            padding: "5px 12px",
            marginBottom: "1rem",
            width: "fit-content",
          }}
        >
          <span style={{ fontSize: "14px", color: "#22d3ee" }}>✦</span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {slide.badge}
          </span>
        </div>

        <h1
          key={`mob-title-${animKey}`}
          className="hero-title-font hero-slide-text"
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#fff",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {slide.title}
        </h1>

        <p
          key={`mob-sub-${animKey}`}
          className="hero-slide-text-delay-1 hero-body-font"
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
            fontWeight: 400,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          {slide.subtitle}
        </p>

        <button
          key={`mob-cta-${animKey}`}
          className="hero-cta-primary hero-slide-text-delay-2 hero-body-font"
          style={{
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            padding: "14px 0",
            width: "100%",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Book Appointment
        </button>
      </div>

      {/* ── NAVIGATION ARROWS ── */}
      <button
        onClick={prevSlide}
        className="hero-nav-btn"
        aria-label="Previous slide"
        style={{
          position: "absolute",
          top: "50%",
          left: "16px",
          transform: "translateY(-50%)",
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.80)",
          border: "1px solid rgba(6,182,212,0.25)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          color: "#0891b2",
          fontSize: "18px",
          fontWeight: 700,
          transition: "all 0.25s ease",
          outline: "none",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.4)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)")
        }
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="hero-nav-btn"
        aria-label="Next slide"
        style={{
          position: "absolute",
          top: "50%",
          right: "16px",
          transform: "translateY(-50%)",
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.80)",
          border: "1px solid rgba(6,182,212,0.25)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          color: "#0891b2",
          fontSize: "18px",
          fontWeight: 700,
          transition: "all 0.25s ease",
          outline: "none",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.4)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)")
        }
      >
        ›
      </button>

      {/* ── SLIDE INDICATORS ── */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
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
