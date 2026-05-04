
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { FaFacebookF, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100  mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Column 1 */}
        <div>
          <Link to="/" className="flex items-center space-x-3 mb-3">
            <img src={Logo} alt="logo" className="h-14" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-xl text-blue-600">BAISHDHARA</span>
              <span className="text-sm text-gray-500">Dental Clinic</span>
            </div>
          </Link>
          <p className="text-sm text-gray-500">
            Your family dentist since 2021 <br />
            Balaju, Kathmandu
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h6 className="font-semibold mb-3">Quick Links</h6>
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/my-teeth">मेरो दाँत</Link>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <h6 className="font-semibold mb-3">Contact</h6>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Balaju, Kathmandu</p>
            <p className="flex items-center gap-2"><FaPhone /> +977-9800000000</p>
            <p className="flex items-center gap-2"><FaEnvelope /> info@baishdharadental.com</p>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h6 className="font-semibold mb-3">Follow Us</h6>
          <div className="flex gap-3 mb-4">
            <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white"><FaFacebookF /></a>
            <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-pink-500 hover:text-white"><FaInstagram /></a>
            <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white"><FaYoutube /></a>
          </div>

          <h6 className="font-semibold mb-2">Newsletter</h6>
          <input type="text" placeholder="Name" className="w-full mb-2 p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>

      <div className=" border-t  py-4 text-center text-sm text-gray-500">
        © 2025 Baishdhara Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;