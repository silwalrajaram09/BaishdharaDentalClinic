import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { services } from "../Data/services.js";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    y: 40,
    scale: 0.98,
    opacity: 0,
  },

  visible: {
    y: 0,
    scale: 1,
    opacity: 1,

    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      onClick={() => navigate(`/services/${service.slug}`)}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/services/${service.slug}`)
      }
      role="button"
      tabIndex={0}
      aria-label={`View ${service.title}`}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-white
        cursor-pointer
        border border-gray-100
        transition-all
        duration-500
        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        hover:shadow-[0_16px_50px_rgba(0,0,0,0.14)]
      "
    >
      {/* Glow Layer */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-3xl
            bg-gradient-to-br
            from-cyan-400/10
            via-blue-400/5
            to-cyan-400/10
            blur-2xl
          "
        />
      </div>

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.title}
          className="
            h-56
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
            group-hover:rotate-[0.5deg]
          "
          style={{
            objectPosition: service.objectPos || "center",
          }}
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#07111d]/75
            via-[#07111d]/10
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* Floating Icon */}
        <div
          className="
            absolute
            top-4
            right-4
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/15
            backdrop-blur-xl
            opacity-0
            transition-all
            duration-500
            translate-y-2
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowRight className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Title */}
        <h3
          className="
            mb-3
            min-h-[60px]
            text-xl
            font-bold
            leading-snug
            text-[#0b2a4a]
            line-clamp-2
          "
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {service.title}
        </h3>

        {/* Intro */}
        <p
          className="
            mb-6
            text-sm
            leading-relaxed
            text-gray-600
            line-clamp-3
          "
        >
          {service.intro}
        </p>

        {/* CTA */}
        <motion.div
          whileHover={{ x: 4 }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-[#2e7fc1]
          "
        >
          Learn More
          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </motion.div>
      </div>
    </motion.article>
  );
};

const Services = () => {
  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#f4f7fb]
        via-white
        to-white
      "
    >
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span
            className="
              mb-4
              inline-block
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#2e7fc1]
            "
          >
            Our Specialists
          </span>

          <h1
            className="
              text-3xl
              font-bold
              text-[#0b2a4a]
              md:text-5xl
            "
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Our Dental Services
          </h1>

          <div
            className="
              mx-auto
              mt-5
              h-[3px]
              w-14
              rounded-full
              bg-[#2e7fc1]
            "
          />

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-relaxed
              text-gray-500
              md:text-lg
            "
          >
            Comprehensive dental care with advanced technology and personalized
            attention for your healthiest and most confident smile.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            gap-7
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
