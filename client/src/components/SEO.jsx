import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({
  title = "Baishdhara Dental Clinic | Dental Clinic in Kathmandu",
  description = "Professional dental care in Kathmandu with advanced treatments and experienced dentists.",
  keywords = "",
  canonical,
  image = "https://baishdharadental.com/og-image.jpg",
}) => {
  const location = useLocation();

  const currentCanonical =
    canonical ||
    `https://baishdharadental.com${location.pathname.replace(/\/$/, "") || ""}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",

    name: "Baishdhara Dental Clinic",

    url: "https://baishdharadental.com",

    logo: "https://baishdharadental.com/logo.png",

    image,

    telephone: "+977-1-4962513",

    priceRange: "$$",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Baishdhara",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      postalCode: "",
      addressCountry: "NP",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.738446",
      longitude: "85.302198",
    },

    areaServed: {
      "@type": "City",
      name: "Kathmandu",
    },

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {keywords && <meta name="keywords" content={keywords} />}

      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={currentCanonical} />

      {/* Open Graph */}

      <meta property="og:type" content="website" />

      <meta property="og:locale" content="en_NP" />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={currentCanonical} />

      <meta property="og:image" content={image} />

      <meta property="og:site_name" content="Baishdhara Dental Clinic" />

      {/* Twitter */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* Dentist Schema */}

      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
