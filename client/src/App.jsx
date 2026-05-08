import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Contact from './pages/ContactPage';
import MyTooth from './pages/Mytooth';
import Appointment from './pages/Appointment';
import MeroDaat from './pages/MeroDaat';
import Pricing from './pages/Pricing';
import DoctorProfile from './pages/Doctors/DoctorProfile';
import ServicePage from './pages/Services/ServicePage';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/my-teeth" element={<MyTooth />} />
          <Route path="/मेरो-दाँत" element={<MeroDaat />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/services/:id" element={<ServicePage />} />
          
        </Routes>
      </Layout>
     
    </Router>
  );
}

export default App;