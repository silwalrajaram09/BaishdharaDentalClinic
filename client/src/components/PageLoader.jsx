import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_BOUNCE = [0.34, 1.56, 0.64, 1];

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const barControls = useAnimation();
  const pulseControls = useAnimation();

  // More realistic progress simulation
  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000; // 3 seconds total

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Ease-out curve for natural feeling progress
      const eased = 1 - Math.pow(1 - rawProgress, 2);
      setProgress(Math.round(eased * 100));

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(updateProgress);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Tooth icon pulse animation
  useEffect(() => {
    pulseControls.start({
      scale: [1, 1.05, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [pulseControls]);

  return (
    <motion.div
      role="status"
      aria-label="Loading Baishdhara Dental Clinic"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "linear-gradient(145deg, #F8FAFC 0%, #F1F5F9 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.4, ease: EASE_OUT },
      }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      <div className="relative flex flex-col items-center">
        {/* Professional ambient glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary glow ring */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            border: "1px solid rgba(59,130,246,0.06)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Logo with subtle pulse */}
        <motion.div animate={pulseControls} className="relative z-10">
          <motion.img
            src={logo}
            alt="Baishdhara Dental Clinic"
            draggable={false}
            className="select-none object-contain"
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.7,
              ease: EASE_BOUNCE,
              delay: 0.1,
            }}
          />
        </motion.div>

        {/* Elegant divider with gradient */}
        <motion.div
          aria-hidden="true"
          style={{
            marginTop: 28,
            width: 48,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #3B82F6, transparent)",
            borderRadius: 999,
            opacity: 0.4,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE_OUT }}
        />

        {/* Clinic name with refined typography */}
        <motion.h1
          style={{
            marginTop: 20,
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "#0F172A",
            fontFamily: "'Inter', -apple-system, sans-serif",
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: EASE_OUT }}
        >
          Baishdhara Dental Clinic
        </motion.h1>

        {/* Subtitle with specialization */}
        <motion.p
          style={{
            marginTop: 4,
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "#64748B",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          
        </motion.p>

        {/* Progress display */}
        <motion.div
          style={{
            marginTop: 32,
            width: 180,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {/* Progress bar track */}
          <div
            aria-hidden="true"
            style={{
              flex: 1,
              height: 3,
              background: "rgba(59,130,246,0.08)",
              borderRadius: 999,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Fill track with gradient */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
                transformOrigin: "left center",
                scaleX: progress / 100,
                borderRadius: 999,
              }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.1 }}
            />

            {/* Animated shimmer */}
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "30%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                filter: "blur(1px)",
              }}
              animate={{
                x: ["-100%", "400%"],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.8,
              }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#3B82F6",
              fontVariantNumeric: "tabular-nums",
              minWidth: 36,
              textAlign: "right",
              letterSpacing: "0.02em",
            }}
          >
            {progress}%
          </motion.span>
        </motion.div>

        {/* Loading status text */}
        <motion.p
          aria-live="off"
          style={{
            marginTop: 12,
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: "0.1em",
            color: "#94A3B8",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          {progress < 30 && "Initializing your experience"}
          {progress >= 30 && progress < 70 && "Preparing dental tools"}
          {progress >= 70 && progress < 100 && "Almost ready"}
          {progress === 100 && "Welcome!"}
        </motion.p>

        {/* Decorative dots */}
        <motion.div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 6,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#3B82F6",
                opacity: 0.2,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </motion.div>
  );
};

export default PageLoader;
