import { useEffect, useState } from "react";
import { color, motion } from "framer-motion";
import { PhoneCall, Phone, MapPin, MailIcon } from "lucide-react";
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

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState({
    type: "",
    message: "",
  });

  const [submitError, setSubmitError] = useState({
    type: "",
    message: "",
  });

  // AUTO CLEAR SUCCESS MESSAGE
  useEffect(() => {
    if (submitSuccess.message) {
      const timer = setTimeout(() => {
        setSubmitSuccess({
          type: "",
          message: "",
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // EMAIL
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    // PHONE
    if (!formData.phone.trim()) {
      newErrors.phone = "phone is required";
    } else if (formData.phone && !/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // MESSAGE
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // CLEAR FIELD ERROR WHILE TYPING
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // CLEAR API ERROR
    if (submitError.message) {
      setSubmitError({
        type: "",
        message: "",
      });
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // RESET STATES
    setSubmitSuccess({
      type: "",
      message: "",
    });

    setSubmitError({
      type: "",
      message: "",
    });

    // CLIENT VALIDATION
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    setIsSubmitting(true);

    try {
      const response = await fetch(`${APP_URL}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // BACKEND VALIDATION ERROR
      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }

        throw new Error(data.message || "Failed to send message");
      }

      // SUCCESS
      setSubmitSuccess({
        type: "success",
        message: data.message || "Message sent successfully!",
      });

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Submit Error:", error);

      setSubmitError({
        type: "error",
        message: error.message || "Something went wrong",
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
          className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* SUCCESS */}
            {submitSuccess.message && (
              <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg text-sm">
                {submitSuccess.message}
              </div>
            )}

            {/* ERROR */}
            {submitError.message && (
              <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm">
                {submitError.message}
              </div>
            )}

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number*
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="phone number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.phone
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>

              <textarea
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full border p-3 rounded-lg resize-none focus:outline-none focus:ring-2 transition ${
                  errors.message
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />

              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#0b2a4a] text-white py-3 rounded-lg font-semibold transition ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#081f36]"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* CONTACT INFO */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Contact Details
            </h2>

            <div className="space-y-4 text-gray-600">
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {" "}
                <MapPin size={16} color="red" />
                Tarun Marga , Bypass, Balaju kathmandu Nepal
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <PhoneCall size={16} />
                +977-9803421766
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MailIcon size={16} /> baishdharadental@gmail.com
              </p>
            </div>
          </div>

          {/* MAP */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg relative z-0">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Find Us on Map
            </h2>

            <div className="rounded-xl overflow-hidden">
              <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-[300px] z-0"
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
                      Tarun Marga , Bypass, Balaju kathmandu Nepal
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
