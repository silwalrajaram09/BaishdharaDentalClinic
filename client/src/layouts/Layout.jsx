import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaWhatsapp } from "react-icons/fa";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />

      <main className="grow pt-19.5 lg:pt-30.5">{children}</main>

      <Footer />

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/9779803421766"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed
          bottom-5
          right-4
          sm:bottom-6
          sm:right-6
          z-50
          flex
          items-center
          gap-2
          bg-[#25D366]
          hover:bg-[#1ebe5d]
          text-white
          px-4
          py-3
          rounded-full
          shadow-2xl
          transition-all
          duration-300
          hover:scale-105
          group
        "
        aria-label="Chat on WhatsApp"
      >
        {/* ICON */}
        <FaWhatsapp className="text-2xl" />

        {/* TEXT */}
        <span
          className="
            hidden
            sm:block
            text-sm
            font-medium
            whitespace-nowrap
          "
        >
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
