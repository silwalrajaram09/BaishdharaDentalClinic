import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Contact = () => {
  const APP_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState({
    type: "",
    message: "",
  });

  const [submitError, setSubmitError] = useState({
    type: "",
    message: "",
  });
  
  // Auto clear success message
  useEffect(() => {
    let timer;

    if (submitSuccess?.type === "success") {
      timer = setTimeout(() => {
        setSubmitSuccess({
          type: "",
          message: "",
        });
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [submitSuccess]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear messages while typing
    if (submitError.message) {
      setSubmitError({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setSubmitSuccess({
      type: "",
      message: "",
    });

    setSubmitError({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(`${APP_URL}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      setSubmitSuccess({
        type: "success",
        message: data.message || "Message sent successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit Error:", error);

      setSubmitError({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const position = [27.738446, 85.302198];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 px-4"
      >
        Our Contact
      </motion.h2>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {/* LEFT FORM */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* SUCCESS MESSAGE */}
            {submitSuccess?.message && (
              <div className="bg-green-100 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
                {submitSuccess.message}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {submitError?.message && (
              <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                {submitError.message}
              </div>
            )}

            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Full Name *
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Email Address *
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* PHONE */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+977 XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 sm:p-3.5 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Message *
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-gray-300 p-3 sm:p-3.5 rounded-lg h-28 sm:h-32 md:h-36 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#0b2a4a] text-white py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#081f36] hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 
                      0 0 5.373 0 12h4zm2 5.291A7.962 
                      7.962 0 014 12H0c0 3.042 1.135 
                      5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
              Contact Details
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600">
                📍 Baishdhara, Balaju, Kathmandu, Nepal
              </p>

              <p className="text-gray-600">📞 +977-9803291582</p>

              <p className="text-gray-600">✉️ info@baishdharadental.com</p>
            </div>
          </div>

          {/* MAP */}
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
              Find Us on Map
            </h2>

            <div className="rounded-xl overflow-hidden">
              <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-[300px]"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={position}>
                  <Popup>
                    <div>
                      <strong>Baishdhara Dental Clinic</strong>
                      <br />
                      Kathmandu, Nepal
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
