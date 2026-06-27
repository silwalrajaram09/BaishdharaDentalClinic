// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./layouts/Layout";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Doctors from "./pages/Doctors";
// import Contact from "./pages/ContactPage";
// import MyTooth from "./pages/Mytooth";
// import Appointment from "./pages/Appointment";
// import MeroDaat from "./pages/MeroDaat";
// import Gallery from "./pages/Gallery";
// import Pricing from "./pages/Pricing";
// import DoctorProfile from "./pages/Doctors/DoctorProfile";
// import ServicePage from "./pages/Services/ServicePage";
// import ScrollToTop from "./components/ScrollToTop";
// import {  HelmetProvider } from 'react-helmet-async';

// function App() {
//   return (
//     <HelmetProvider>
//     <Router>
//       <ScrollToTop />
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/doctors" element={<Doctors />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/pricing" element={<Pricing />} />
//           <Route path="/my-teeth" element={<MyTooth />} />
//           <Route path="/मेरो-दाँत" element={<MeroDaat />} />
//           <Route path="/appointment" element={<Appointment />} />
//           <Route path="/doctor/:id" element={<DoctorProfile />} />
//           <Route path="/services/:slug" element={<ServicePage />} />
//           <Route path="/gallery" element={<Gallery />} />
//         </Routes>
//       </Layout>
//     </Router>
//     </HelmetProvider>
//   );
// }

// export default App;

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./layouts/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Contact = lazy(() => import("./pages/ContactPage"));
const MyTooth = lazy(() => import("./pages/Mytooth"));
const Appointment = lazy(() => import("./pages/Appointment"));
const MeroDaat = lazy(() => import("./pages/MeroDaat"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Pricing = lazy(() => import("./pages/Pricing"));
const DoctorProfile = lazy(() => import("./pages/Doctors/DoctorProfile"));
const ServicePage = lazy(() => import("./pages/Services/ServicePage"));
import PageLoader from "./components/PageLoader";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />

        <Layout>
          <AnimatePresence mode="wait" >
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </Suspense>
          </AnimatePresence>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
// import PageLoader from "./components/PageLoader";

// function App() {
//   return <PageLoader />;
// }

// export default App;
