import Contact from "../components/Contact";
import GoogleReviewsWidget from "google-reviews-widget";

const ContactPage = () => {
  return (
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
  );
};

export default ContactPage;
