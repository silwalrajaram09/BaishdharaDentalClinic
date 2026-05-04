import { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent!");
  };

  const position = [27.738446, 85.302198];

  return (
    <div className="bg-gray-50">
      {/* HEADER */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-center pt-10"
      >
        Our Contact
      </motion.h2>

      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        {/* LEFT FORM */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone"].map((field, i) => (
              <motion.input
                key={field}
                name={field}
                placeholder={field.toUpperCase()}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            ))}

            <motion.textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-3 rounded h-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#0b2a4a] text-white py-3 rounded hover:bg-[#081f36]"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

          <div className="space-y-3 text-gray-600">
            <p>📍 Baishdhara, Balaju, Kathmandu</p>
            <p>📞 +977-9803291582</p>
            <p>✉️ info@baishdharadental.com</p>
            <p>🌐 www.baishdharadental.com</p>
          </div>

          <h3 className="mt-6 font-semibold">Hours</h3>
          <p>Mon–Fri: 9AM – 6PM</p>
          <p>Saturday: 10AM – 3PM</p>
          <p>Sunday: Closed</p>
        </motion.div>
      </div>

      {/* MAP */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 pb-16"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4 z-10 relative">
          Find Us on Map
        </h2>

        <div className="relative z-10">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
            className="rounded-xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup permanent={true}>
                <div className="font-bold text-lg mb-1">
                  Baishdhara Dental Clinic
                </div>
                Baishdhara, Balaju, Kathmandu
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
