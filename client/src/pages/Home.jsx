import Contact from "../components/Contact";
import Heroslider2 from "../components/heroslider2";
import ExpertiseGrid from "../components/ExpertiseGrid";
import HappyPatients from "../components/HappyPatients";
import MeetOurDoctors from "../components/MeetOurDoctors";
import WhyChooseUs from "../components/WhyChooseUs";
import SEO from "../components/SEO";

const Home = () => {
  // const {
  //   formData,
  //   isSubmitting,
  //   successMessage,
  //   errorMessage,
  //   fieldErrors,
  //   handleChange,
  //   handleSubmit,
  //   getAvailableTimeSlots,
  // } = useAppointmentForm();

  // const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <SEO
        title="Best Dental Clinic in Kathmandu | Baishdhara Dental Clinic"
        description="Baishdhara Dental Clinic in Kathmandu offers advanced care, including dental implants, root canal treatments, and complete oral health services."
        keywords="best dental clinic in Kathmandu, dentist in Kathmandu, dental clinic Kathmandu, dental implants Kathmandu, braces Kathmandu, root canal treatment Kathmandu, teeth whitening, oral health care"
      />
      <div className="bg-gray-50">
        <h1 className="sr-only">
          Baishdhara Dental Clinic - Professional Dental Care in Kathmandu
        </h1>
        {/* HERO */}
        <Heroslider2 />


        {/* <MeetOurDoctors /> */}
        <MeetOurDoctors />


        {/* WHY CHOOSE US */}
        <WhyChooseUs />
        <hr
          className=" mt-5 border-0.5 border-gray-200 mx-auto max-w-6xl"
          style={{
            borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          }}
        />
        {/* EXPERTISE */}
        <ExpertiseGrid />
        <HappyPatients />
        {/* <hr className="border-0.5 border-gray-200 mx-auto max-w-6xl" /> */}
        {/* CONTACT */}
        <Contact />
      </div>
    </>
  );
};

export default Home;
