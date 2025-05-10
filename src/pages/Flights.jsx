import { useEffect } from "react";
import { FlightDeals, Hero, Testimonials } from "../components";
import Places from "../components/Places";
import NewHero from "../Screens/NewHero";
import Reccomendation from "../Screens/RecommendedFlight/RecommendedFlights.jsx";
import OurService from "../Screens/OurServices/OurServices.jsx";
const Flights = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="scroll-smooth">
      <div className="w-full">
        <NewHero />
      </div>
      <div className="mt-[100px]">
        <FlightDeals />
      </div>
      <div className="px-10">
        <Reccomendation></Reccomendation>
      </div>
      <div className="px-10">
        <OurService></OurService>
      </div>
      <div className="mt-[60px] mb-[60px]">
        <Places />
      </div>
      {/* <div className="mt-[90px]">
        <Testimonials />
      </div> */}
    </div>
  );
};

export default Flights;
