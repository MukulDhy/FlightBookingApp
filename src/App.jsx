import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import {
  Confirm,
  Flights,
  Hotels,
  Packages,
  PassengerInfo,
  Payment,
  SeatSelect,
} from "./pages";
import { ToastContainer } from "react-toastify";
import Review from "./Screens/Review/Review/Review";
import "react-toastify/dist/ReactToastify.css";
import FlightExploreNew from "./Screens/Flights/Flights/Flights";
import About from "./Screens/AboutUs/AboutUs";
import Contact from "./Screens/Contact/Contact";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/Privacy";
import GoogleTag from "./service/GoogleTag";
const App = () => {
  const TollFreeBanner = () => {
    return (
      <div className="w-full bg-blue-600 text-white text-center py-2 z-50">
        Call Us:{" "}
        <a href="tel:+1(833)931-6548" className="font-bold underline">
          +1(833)931-6548
        </a>
      </div>
    );
  };

  return (
    <>
      <TollFreeBanner></TollFreeBanner>
      <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
        <GoogleTag />
        <Navbar />

        <Routes>
          <Route path="/" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/packages" element={<Packages />} />
          {/* <Route path="/explore" element={<FlightExplore />} /> */}
          <Route path="/flights" element={<FlightExploreNew />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/review/:id" element={<Review />} />
          <Route path="/passenger-info" element={<PassengerInfo />} />
          <Route path="/seat-selection" element={<SeatSelect />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default App;
