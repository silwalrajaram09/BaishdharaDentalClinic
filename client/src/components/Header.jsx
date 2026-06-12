import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Menu,
  X,
  Smile,
  Wrench,
  Sparkles,
  ShieldCheck,
  Baby,
  Siren,
  CalendarCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import BookingModal from "./BookingModel";
import { CLINIC_INFO } from "../data/bookingOptions";

import Button from "./ui/Button";

// ─── Navigation ─────────────────────────────────────────────────────────────
// Previously included two duplicate "My teeth" entries — one English
// (/my-teeth) and one Nepali (/मेरो-दाँत). The Devanagari path required a
// decodeURIComponent() workaround in isActive() and is fragile across
// browsers/servers/SEO tooling. Removed the duplicate route; if Nepali
// support is needed, use a proper i18n library (e.g. react-i18next) with a
// language switcher rather than separate routes per language.
const NAV = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services", dropdown: true },
  { name: "Doctors", path: "/doctors" },
  { name: "Pricing", path: "/pricing" },
  { name: "Gallery", path: "/gallery" },
  { name: "My Teeth", path: "/my-teeth" },
  { name: "मेरो दाँत", path: "/मेरो-दाँत" },
  { name: "Contact", path: "/contact" },
];

// Featured services for the desktop mega-menu. Anchors degrade gracefully —
// if a matching #id isn't present on /services, the link simply opens the
// top of the page.
const FEATURED_SERVICES = [
  {
    name: "General Dentistry",
    desc: "Check-ups, cleanings & prevention",
    icon: Smile,
    hash: "/general-dentistry",
  },
  {
    name: "Dental Implants",
    desc: "Permanent, natural-looking teeth",
    icon: Wrench,
    hash: "/dental-implants",
  },
  {
    name: "Cosmetic Dentistry",
    desc: "Whitening, veneers & smile design",
    icon: Sparkles,
    hash: "/cosmetic-dentistry",
  },
  {
    name: "Braces & Aligners",
    desc: "Straighten your smile discreetly",
    icon: ShieldCheck,
    hash: "/braces-aligners",
  },
  {
    name: "Pediatric Dentistry",
    desc: "Gentle care for little smiles",
    icon: Baby,
    hash: "/pediatric-dentistry",
  },
  {
    name: "Emergency Care",
    desc: "Same-day urgent appointments",
    icon: Siren,
    hash: "/emergency-dental-care",
  },
];

const FOCUSABLE_NAV_SELECTOR = "a[href], button:not([disabled])";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const headerRef = useRef(null);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const lastDirection = useRef(null);
  const ticking = useRef(false);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  // ── Auto-hide header on scroll ──
  // Re-implemented against a ref instead of document.querySelector — same
  // hysteresis behaviour (8px jitter threshold, direction-change-only
  // updates, settles after scroll-restore on refresh) but no manual DOM
  // queries.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      header.style.setProperty("--nav-translate-y", "0px");
      header.style.setProperty("--nav-opacity", "1");
      return;
    }

    const setHeaderHeightVar = () => {
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--header-height",
        `${Math.ceil(h)}px`,
      );
      return h;
    };

    const reveal = () => {
      header.style.setProperty("--nav-translate-y", "0px");
      header.style.setProperty("--nav-opacity", "1");
    };
    const hide = () => {
      const h = setHeaderHeightVar();
      header.style.setProperty("--nav-translate-y", `-${h}px`);
      header.style.setProperty("--nav-opacity", "0.85");
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHeaderHeightVar();

        if (y <= 0) {
          reveal();
          lastDirection.current = null;
          lastScrollY.current = y;
          setScrolled(false);
          ticking.current = false;
          return;
        }

        setScrolled(true);

        const delta = Math.abs(y - lastScrollY.current);
        const direction = y > lastScrollY.current ? "down" : "up";

        // Ignore tiny movements to avoid jitter, but always close the menu
        // overlay if it's open and the user scrolls past the threshold.
        if (delta >= 8 && direction !== lastDirection.current) {
          lastDirection.current = direction;
          if (direction === "down" && !mobileOpen) hide();
          else reveal();
        }

        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Settle after scroll-restoration on refresh
    const init = async () => {
      if (document.readyState !== "complete") {
        await new Promise((r) =>
          window.addEventListener("load", r, { once: true }),
        );
      }
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );
      setHeaderHeightVar();
      lastScrollY.current = window.scrollY;
      setScrolled(window.scrollY > 0);
      reveal();
    };
    init();

    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  // ── Close everything on route change ──
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // ── Lock body scroll while mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Close desktop dropdown on outside click / Escape ──
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const openBooking = useCallback(() => {
    setMobileOpen(false);
    setShowModal(true);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        data-autohide="true"
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md
                   shadow-md transition-all duration-300"
        style={{
          transform: "translateY(var(--nav-translate-y, 0px))",
          opacity: "var(--nav-opacity, 1)",
        }}
      >
        {/* ── TOP INFO BAR (desktop only) ── */}
        <div className="hidden lg:block bg-[#0b2a4a] py-2 text-white">
          <div className="container mx-auto px-2 sm:px-6 lg:px-8 h-11 flex items-center justify-between text-sm">
            {/* LEFT — contact info (single icon set: lucide-react) */}
            <div className="flex items-center gap-6">
              {/* <Link to="/" className="flex items-center shrink-0 group">
                <img
                  src={Logo}
                  alt="Baishdhara Dental Clinic logo"
                  className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-9 sm:h-10" : "h-10 sm:h-11"}`}
                />
                <span className="ml-3 leading-tight">
                  <span className="block text-xl sm:text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                    Baishdhara
                  </span>
                  <span className="block text-secondary text-xs sm:text-sm">
                    Dental Clinic
                  </span>
                </span>
              </Link> */}
              <a
                href={`tel:${CLINIC_INFO.phonePrimary.tel}`}
                className="flex items-center gap-2 hover:text-[#86d7e9] transition-colors"
              >
                <Phone size={15} aria-hidden="true" />
                <span>{CLINIC_INFO.phonePrimary.display}</span>
              </a>
              <a
                href={`tel:${CLINIC_INFO.phoneLandline.tel}`}
                className="flex items-center gap-2 hover:text-[#86d7e9] transition-colors"
              >
                <Phone size={15} aria-hidden="true" />
                <span>{CLINIC_INFO.phoneLandline.display}</span>
              </a>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="flex items-center gap-2 hover:text-[#86d7e9] transition-colors"
              >
                <Mail size={15} aria-hidden="true" />
                <span>{CLINIC_INFO.email}</span>
              </a>
            </div>

            {/* RIGHT — hours + WhatsApp */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-blue-100">
                <Clock size={15} aria-hidden="true" />
                <span className="font-medium text-white">
                  {CLINIC_INFO.hours.days}:
                </span>
                <span>{CLINIC_INFO.hours.time}</span>
                <span className="text-slate-500 mx-1">|</span>
                <span className="text-white">
                  {CLINIC_INFO.hours.closed}:{" "}
                  <span className="text-accent">Closed</span>
                </span>
              </div>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${CLINIC_INFO.whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium"
              >
                <FaWhatsapp size={15} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── MAIN NAVBAR ── */}
        <nav className="container mx-auto px-4  sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${scrolled ? "h-[68px]" : "h-[78px]"}`}
          >
            {/* LOGO — image + text now a single link */}
            <Link to="/" className="flex items-center shrink-0 group">
              <img
                src={Logo}
                alt="Baishdhara Dental Clinic logo"
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-9 sm:h-10" : "h-10 sm:h-11"}`}
              />
              <span className="ml-3 leading-tight">
                <span className="block text-xl sm:text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors">
                  Baishdhara
                </span>
                <span className="block text-secondary text-xs sm:text-sm">
                  Dental Clinic
                </span>
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV.map((item) =>
                item.dropdown ? (
                  <div key={item.name} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setServicesOpen((o) => !o)}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      className={`flex  items-center gap-1 px-2 py-1 rounded-lg text-[15px] font-medium
                                  transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#3b7dbd]
                                  ${isActive(item.path) || servicesOpen ? "text-[#3b7dbd]" : "text-gray-700 hover:text-[#3b7dbd]"}`}
                    >
                      {item.name}
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>

                    {isActive(item.path) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-4 right-4 -bottom-1 h-0.5 bg-[#3b7dbd] rounded-full"
                      />
                    )}

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            duration: 0.18,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[640px]
                                     bg-white rounded-2xl shadow-2xl border border-slate-100
                                     p-5 grid grid-cols-2 gap-2 z-50"
                        >
                          {FEATURED_SERVICES.map(
                            ({ name, desc, icon: Icon, hash }) => (
                              <Link
                                key={name}
                                to={`/services${hash}`}
                                onClick={() => setServicesOpen(false)}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#eef6ff] transition-colors group"
                              >
                                <span
                                  className="flex items-center justify-center w-10 h-10 rounded-lg
                                               bg-[#eef6ff] text-[#3b7dbd] group-hover:bg-[#3b7dbd] group-hover:text-white
                                               transition-colors shrink-0"
                                >
                                  <Icon size={18} aria-hidden="true" />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-[#0b2a4a]">
                                    {name}
                                  </span>
                                  <span className="block text-xs text-slate-500 mt-0.5">
                                    {desc}
                                  </span>
                                </span>
                              </Link>
                            ),
                          )}
                          <Link
                            to="/services"
                            onClick={() => setServicesOpen(false)}
                            className="col-span-2 mt-1 flex items-center justify-center gap-2
                                       py-2.5 rounded-xl border border-[#3b7dbd]/30 text-[#3b7dbd]
                                       text-sm font-semibold hover:bg-[#3b7dbd] hover:text-white transition-colors"
                          >
                            View All Services →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-[15px] font-medium transition-colors duration-200
                                focus-visible:ring-2 focus-visible:ring-[#3b7dbd]
                                ${isActive(item.path) ? "text-[#3b7dbd]" : "text-gray-700 hover:text-[#3b7dbd]"}`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-4 right-4 -bottom-1 h-0.5 bg-[#3b7dbd] rounded-full"
                      />
                    )}
                  </Link>
                ),
              )}
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Call Now */}
              <a
                href={`tel:${CLINIC_INFO.phonePrimary.tel}`}
                aria-label="Call dental clinic now"
                className="
      inline-flex h-11 items-center justify-center gap-2 px-5
      rounded-xl border border-slate-200 bg-white
      text-[15px] font-semibold leading-none text-[#0B2A4A]
      shadow-sm transition-all duration-200
      hover:border-[#3B82C4] hover:text-[#3B82C4] hover:shadow-md
      active:scale-[0.97]
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82C4] focus-visible:ring-offset-2
    "
              >
                <Phone size={17} strokeWidth={2.25} aria-hidden="true" />
                <span>Call Now</span>
              </a>

              {/* Book Appointment */}
              <button
                onClick={openBooking}
                className="
      inline-flex h-11 items-center justify-center gap-2 px-5
      rounded-xl bg-[#3B82C4]
      text-[15px] font-semibold leading-none text-white
      shadow-md transition-all duration-200
      hover:bg-[#2F6FA8] hover:shadow-lg
      active:scale-[0.97]
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82C4] focus-visible:ring-offset-2
    "
              >
                <CalendarCheck
                  size={17}
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="lg:hidden flex items-center justify-center w-11 h-11 -mr-1
                         rounded-lg text-[#0b2a4a] hover:bg-slate-100 transition-colors
                         focus-visible:ring-2 focus-visible:ring-[#3b7dbd]"
            >
              {mobileOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* MOBILE NAVIGATION */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden bg-white border-t rounded-b-2xl shadow-xl overflow-hidden"
              >
                <div className="py-3 max-h-[calc(100vh-78px)] overflow-y-auto">
                  {NAV.map((item) =>
                    item.dropdown ? (
                      <div key={item.name}>
                        <button
                          onClick={() => setMobileServicesOpen((o) => !o)}
                          aria-expanded={mobileServicesOpen}
                          className={`w-full flex items-center justify-between px-5 py-3.5
                                      min-h-[48px] text-[15px] font-medium transition-colors
                                      ${isActive(item.path) ? "text-[#3b7dbd]" : "text-gray-700"}`}
                        >
                          {item.name}
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-slate-50"
                            >
                              {FEATURED_SERVICES.map(
                                ({ name, icon: Icon, hash }) => (
                                  <Link
                                    key={name}
                                    to={`/services${hash}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 pl-9 pr-5 py-3 min-h-[44px]
                                             text-sm text-gray-600 hover:text-[#3b7dbd] transition-colors"
                                  >
                                    <Icon size={16} aria-hidden="true" />
                                    {name}
                                  </Link>
                                ),
                              )}
                              <Link
                                to="/services"
                                onClick={() => setMobileOpen(false)}
                                className="block pl-9 pr-5 py-3 min-h-[44px] text-sm font-semibold text-[#3b7dbd]"
                              >
                                View All Services →
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-5 py-3.5 min-h-[48px] text-[15px] font-medium transition-colors
                                    ${isActive(item.path) ? "text-[#3b7dbd] font-semibold bg-[#eef6ff]" : "text-gray-700 hover:bg-slate-50"}`}
                      >
                        {item.name}
                      </Link>
                    ),
                  )}

                  {/* Mobile quick actions */}
                  <div className="px-5 pt-3 pb-1 flex flex-col gap-2.5 border-t border-slate-100 mt-2">
                    <div className="flex gap-2.5">
                      <a
                        href={`tel:${CLINIC_INFO.phonePrimary.tel}`}
                        className="flex-1 flex items-center justify-center gap-2 min-h-[48px]
                                   border border-slate-200 rounded-xl text-sm font-semibold text-[#0b2a4a]"
                      >
                        <Phone size={16} aria-hidden="true" /> Call
                      </a>
                      <a
                        href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${CLINIC_INFO.whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 min-h-[48px]
                                   border border-green-200 rounded-xl text-sm font-semibold text-green-600"
                      >
                        <FaWhatsapp size={16} aria-hidden="true" /> WhatsApp
                      </a>
                    </div>
                    <button
                      onClick={openBooking}
                      className="w-full min-h-[48px] bg-[#3b7dbd] text-white rounded-full font-medium text-sm shadow-md"
                    >
                      Book Appointment
                    </button>
                    <p className="text-center text-xs text-gray-400 pt-1">
                      {CLINIC_INFO.hours.days}: {CLINIC_INFO.hours.time} ·{" "}
                      {CLINIC_INFO.hours.closed}: Closed
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <BookingModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Header;
