import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Doctors', path: '/doctors' },
  { name: 'Contact', path: '/contact' },
  { name: 'My teeth', path: '/my-teeth' },

];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
        <nav className="bg-white shadow-md fixed w-full z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                        {/* <img src={Logo} alt="Logo" /> */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-blue-600">MediCare</div>
                        <div className="text-2xl font-light text-gray-600">Plus</div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`transition-colors ${
                                    isActive(item.path)
                                        ? 'text-blue-600 font-semibold'
                                        : 'text-gray-700 hover:text-blue-600'
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
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />} <span className="sr-only">Open main menu</span>
                        </button>
                    </div>
                </div>
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                    isActive(item.path)
                                        ? 'text-blue-600 font-semibold'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/appointment"
                            className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                            onClick={() => setIsOpen(false)} // Close menu on link click
                        >
                            Book Appointment
                        </Link>
                    </div>
                    
                </div>
            </div>
        </nav>

    </>
  )
}

export default Navbar