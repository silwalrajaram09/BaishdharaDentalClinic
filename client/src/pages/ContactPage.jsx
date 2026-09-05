import Contact from "../components/Contact";
import GoogleReviewsWidget from "google-reviews-widget";
import SEO from "../components/SEO";

const ContactPage = () => {
  return (
    <>
      <SEO
        title="Contact Baishdhara Dental Clinic | Book an Appointment"
        description="Contact Baishdhara Dental Clinic in Kathmandu to book your dental appointment. Get expert dental care, consultations, and advanced oral health services."
        keywords="contact dentist Kathmandu, book dental appointment Kathmandu, dentist near me, Baishdhara Dental Clinic contact, dental consultation Kathmandu, dental services"
      />
      <div className="bg-gray-50">
        <Contact />

        {/* <GoogleReviewsWidget instanceId="ihEarA4zdADUvuMpEctp" /> */}

        {/* <div data-instance-id="ihEarA4zdADUvuMpEctp">
        <script
          src="https://reviews.beaver.codes/widget/web-google-reviews.js"
          async="true"
        ></script> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default ContactPage;
