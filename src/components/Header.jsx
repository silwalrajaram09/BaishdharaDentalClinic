import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/logo.png";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Doctors", path: "/doctors" },
  { name: "Contact", path: "/contact" },
  {name: "Pricing", path: "/pricing" },
  { name: "My teeth", path: "/my-teeth" },
  { name: "मेरो दाँत", path: "/मेरो-दाँत" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex "> 

          <img
            src={Logo}
            alt="Baishdhara Medical"
            className="h-10 w-auto object-contain"
          />
          <Link to="/" className="flex flex-col leading-tight ml-2">
            <div className="text-2xl font-bold text-blue-600">Baishdhara</div>
            <span className=" font-light text-gray-600">Dental clinic</span>
          </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/appointment"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="py-4 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/appointment"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
export default Header;
