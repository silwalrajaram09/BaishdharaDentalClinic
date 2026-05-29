import { motion } from "framer-motion";

const HeroSection = ({
  bgImage = "/default-hero.jpg",
  title = "Welcome",
  subtitle = "Your subtitle here",
}) => {
  return (
    <section
      className="relative h-[80vh] w-full bg-cover bg-center bg-no-repeat flex items-center"
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
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

          
        
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
