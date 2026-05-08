import { useState, useEffect } from "react";
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
  { name: "Pricing", path: "/pricing" },
  { name: "My teeth", path: "/my-teeth" },
  { name: "मेरो दाँत", path: "/मेरो-दाँत" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  // Backend URL - change to your backend port
  const APP_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  // Form data with 'fullname' (matches backend)
  const [formData, setFormData] = useState({
    service: "",
    fullname: "",  // Keep as 'fullname' for backend
    email: "",
    date: "",
    time: "",
    phone: "",
    notes: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  /* HANDLE INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages while typing
    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submit
    if (isSubmitting) return;
    
    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");
    
    // Validation - using 'fullname'
    if (
      !formData.service ||
      !formData.fullname ||  // Using 'fullname'
      !formData.email ||
      !formData.date ||
      !formData.time ||
      !formData.phone
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    }
    
    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send data directly as is (backend expects 'fullname')
      const response = await fetch(`${APP_URL}/api/appointments/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending 'fullname' directly
      });
      
      // Handle invalid JSON response
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }
      
      // Handle backend errors
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to book appointment");
      }
      
      // Success
      setSuccessMessage(data.message || "Appointment booked successfully! We'll contact you soon.");
      
      // Reset form
      setFormData({
        service: "",
        fullname: "",
        email: "",
        date: "",
        time: "",
        phone: "",
        notes: "",
      });
      
      // Auto close the form after success
      setTimeout(() => {
        setShowModal(false);
        setSuccessMessage("");
      }, 2000);
      
    } catch (error) {
      console.error("Appointment Error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LOGO */}
            <div className="flex items-center">
              <img src={Logo} className="h-10 w-auto" alt="Logo" />
              <Link to="/" className="ml-2">
                <div className="text-2xl font-bold text-blue-600">
                  Baishdhara
                </div>
                <span className="text-gray-600 text-sm">Dental clinic</span>
              </Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={
                    isActive(item.path)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => setShowModal(true)}
              className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Book Appointment
            </button>

            {/* MOBILE MENU BUTTON */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* MOBILE NAV */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-white border-t"
              >
                <div className="py-4 space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowModal(true);
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded mx-4 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <motion.div
              className="bg-white text-black p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Make an Appointment</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Selection */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Service *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a service</option>
                    <option value="Teeth Whitening">Teeth Whitening</option>
                    <option value="Teeth Cleaning">Teeth Cleaning</option>
                    <option value="Quality Brackets">Quality Brackets</option>
                    <option value="Modern Anesthetic">Modern Anesthetic</option>
                    <option value="Consultation / Checkup">Consultation / Checkup</option>
                    <option value="Fillings / Root Canal">Fillings / Root Canal</option>
                    <option value="Tooth Extraction">Tooth Extraction</option>
                    <option value="Implants / Crowns">Implants / Crowns</option>
                    <option value="Braces / Orthodontics">Braces / Orthodontics</option>
                    <option value="Kids Dentistry">Kids Dentistry</option>
                    <option value="Emergency Care">Emergency Care</option>
                  </select>
                </div>

                {/* Full Name - Using 'fullname' to match backend */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    name="fullname"  // Matches backend field name
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+977 XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time *
                  </label>
                  <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Notes (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    placeholder="Any special requests or information..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Booking...
                      </span>
                    ) : (
                      "Make Appointment"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;