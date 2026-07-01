import { useEffect, useState } from "react";
import { color, motion } from "framer-motion";
import { PhoneCall, MapPin, MailIcon, PinIcon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { TelephoneIcon } from "@hugeicons/core-free-icons";
import { FaWhatsapp } from "react-icons/fa";

// import {
//   GoogleMap,
//   useJsApiLoader,
//   LoadScript,
//   InfoWindow,
//   Marker,
// } from "@react-google-maps/api";

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };
// const pinPoint = {
//   lng: 85.3052,
//   lat: 27.7289,
// };
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
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

const customIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Contact = () => {
  //const [showInfo, setShowInfo] = useState(true);
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
    <div className="bg-gray-50 min-h-screen py-16">
      {/* HEADER */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-2xl md:text-3xl font-bold font-playfair text-[#0b2a4a] leading-tight"
          >
            Our Contact
          </h1>
          <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-[#2e7fc1]" />
          <p className="mt-4 text-gray-500 max-w-md mx-auto text-base">
            Contact us for appointments, inquiries, or to learn more about our
            dental services. We're here to help you achieve a healthy, beautiful
            smile!
          </p>
        </motion.div>
      </div>

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
          <h2 className="text-xl md:text-2xl font-bold font-playfair text-[#0b2a4a] leading-tight mb-6">
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
              className={`w-full bg-primary text-white py-3 rounded-lg font-semibold transition ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-primary-dark"
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
            <h2 className="text-xl md:text-2xl font-bold font-playfair text-[#0b2a4a] leading-tight mb-6">
              Contact Details
            </h2>

            <div className="space-y-4 text-gray-600">
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {" "}
                <MapPin size={16} color="gray" />
                Tarun Marga , Bypass, Balaju kathmandu Nepal
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <FaWhatsapp size={16} />
                <a
                  href="https://wa.me/9779803421766"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +9779803421766
                </a>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <HugeiconsIcon icon={TelephoneIcon} />
                <span>014962513</span>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MailIcon size={16} /> baishdharadental@gmail.com
              </p>
            </div>
          </div>

          {/* MAP */}

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg relative z-0">
            <h2 className="text-xl md:text-2xl font-bold font-playfair text-[#0b2a4a] leading-tight mb-6">
              Find Us on Map
            </h2>

            <div className="rounded-xl overflow-hidden">
              {/* <LoadScript googleMapsApiKey="AIzaSyA9neqBEFnoOHfdN-Czs3-zBn0BP8J15j8">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={pinPoint}
                  zoom={15}
                >
               
              <Marker
                    position={pinPoint}
                    onClick={() => setShowInfo(true)}
                  />

              {showInfo && (
                    <InfoWindow
                      position={pinPoint}
                      onCloseClick={() => setShowInfo(false)}
                    >
                      <div className="w-[220px] sm:w-[260px] md:w-[280px] p-1">
                        <h2 className="text-base sm:text-lg font-semibold text-primary mb-1">
                          Baishdhara Dental Clinic
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          Tarun Marga, Bypass,
                          <br />
                          Balaju, Kathmandu, Nepal
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href="https://wa.me/9779803421766"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-md transition"
                          >
                            WhatsApp
                          </a>

                          <a
                            href="tel:014962513"
                            className="bg-primary hover:bg-primary-dark text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-md transition"
                          >
                            Call
                          </a>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
               </LoadScript> */}

              <MapContainer
                center={position}
                zoom={17}
                scrollWheelZoom={false}
                className="
                      w-full
                      h-[250px]
                      sm:h-[300px]
                      md:h-[350px]
                      lg:h-[400px]
                      rounded-xl
                      overflow-hidden
                      z-0
                    " >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={position} icon={customIcon}>
                  <Popup
                    autoClose={true}
                    closeOnClick={true}
                    closeButton={true}
                  >
                    <div className="min-w-45 sm:min-w-55">
                      <strong className="text-sm sm:text-base">
                        Baishdhara Dental Clinic
                      </strong>

                      <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                        Tarun Marga, Bypass,
                        <br />
                        Balaju, Kathmandu, Nepal
                      </p>
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
