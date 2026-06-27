import Contact from "../components/Contact";
import GoogleReviewsWidget from "google-reviews-widget";
import SEO from "../components/SEO";

const ContactPage = () => {
  return (
    <>
      <SEO
        title="Contact| Bsishdhara Dental Clinic"
        description="Book Your Appointment and get Expert Dental Care"
        keywords="Book Appointment, Dentist Near Me, Contact for Services"
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
