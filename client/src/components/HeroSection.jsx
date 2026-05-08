import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = ({
  bgImage,
  title,
  subtitle,
  buttonText = "Get Started",
  buttonLink = "/",
}) => {
  return (
    <section
      className="relative h-[80vh] w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl text-white space-y-6">

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            {title}
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl opacity-90"
          >
            {subtitle}
          </motion.p>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              to={buttonLink}
              className="inline-block bg-[#0b2a4a] hover:bg-[#081f36] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              {buttonText}
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;