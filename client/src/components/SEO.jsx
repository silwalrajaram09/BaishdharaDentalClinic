import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Baishdhara Dental Clinic",
  description = "Professional dental care in Kathmandu.",
  keywords = "",
  canonical = "https://baishdharadental.com/",
  image = "https://baishdharadental.com/og-image.jpg",
}) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Baishdhara Dental Clinic",
    url: "https://baishdharadental.com",
    telephone: "+977-1-4962513",
    image,
    logo: "https://baishdharadental.com/logo.png",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Baishdhara",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "NP",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.738446",
      longitude: "85.302198",
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
        opens: "09:00",
        closes: "18:00",
      },
    ],

    sameAs: [
      // Replace these with your actual profiles
      "https://www.facebook.com/search/top?q=baishdhara%20dental%20clinic",
      "https://www.instagram.com/your-page",
    ],
  };

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      {keywords && <meta name="keywords" content={keywords} />}

      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Baishdhara Dental Clinic" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
