import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard } from "../container";
import { hawaiian } from "../assets/logo";
import { creditCard } from "../assets/icons";
import { map1 } from "../assets/images";
import { ConfirmShop } from "../components";
import Loader from "../components/Loader/Loader";

const Confirm = () => {
  const [loading, setLoading] = useState(true);
  const [close, setClose] = useState(true);
  const [numbers, setNumbers] = useState([]);
  const generateRandomNumbers = () => {
    let newNumbers = Array.from(
      { length: 1 },
      () =>
        "1" +
        Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join(
          ""
        )
    );
    setNumbers(newNumbers);
  };
  useEffect(() => {
    generateRandomNumbers();
    window.scrollTo(0, 0); // Scroll to the top of the page
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const userInfo = JSON.parse(sessionStorage.getItem("user_info_T")) || {};
  const flightInfo = JSON.parse(sessionStorage.getItem("flight_info_T")) || {};

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
      <div className="w-full lg:w-[756px] flex flex-col items-start gap-16">
        {close && (
          <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#007B65] bg-[#EAFFFB] rounded p-2 hidden md:flex items-center justify-center">
            <p className="w-full h-full flex items-center justify-start text-[#007B65] text-xs sm:text-base">
              Your flight has been booked successfully! Your confirmation number
              is #{numbers}
            </p>
            <MdOutlineClose
              className="text-[#52527A] font-medium cursor-pointer"
              onClick={() => setClose(false)}
            />
          </div>
        )}

        {/* Passenger Details */}
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <h1 className="titleh1">
            {`${userInfo.title || ""} ${userInfo.first_name || ""} ${
              userInfo.last_name || ""
            }`}
          </h1>
          <p className="text-[#6E7491] text-base sm:text-lg font-semibold">
            Confirmation number: #{numbers}
          </p>
          <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">
            Thank you for booking your travel with TraveLove! Below is a summary
            of your trip to {flightInfo?.arrival?.airportName || ""} in{" "}
            {flightInfo?.arrival?.city || ""}. We’ve sent a copy of your booking
            confirmation to your email address:{" "}
            <span className="text-[#605DEC]">
              {userInfo.traveler_email || ""}
            </span>
            .
          </p>
        </div>

        {/* Flight Summary */}
        <div className="w-full flex flex-col items-start justify-start gap-4">
          <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
            Flight summary
          </h1>
          <div className="w-full flex flex-col items-start gap-4">
            <div className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300">
              <FlightCard
                img={flightInfo.airlineLogo || ""}
                name={flightInfo.airlineName || ""}
                time={`${flightInfo?.departure?.time || ""} - ${
                  flightInfo?.arrival?.time || ""
                }`}
                duration={`${flightInfo.duration || "N/A"} min`}
                stop={flightInfo.stopType || "N/A"}
                trip="One Way"
              />
            </div>
            <p className="text-[#7C8DB0] text-sm sm:text-base font-normal">
              Departure: {flightInfo?.departure?.city || ""} (
              {flightInfo?.departure?.airportName || ""}), Terminal{" "}
              {flightInfo?.departure?.terminal || ""}
            </p>
            <p className="text-[#7C8DB0] text-sm sm:text-base font-normal">
              Arrival: {flightInfo?.arrival?.city || ""} (
              {flightInfo?.arrival?.airportName || ""}), Terminal{" "}
              {flightInfo?.arrival?.terminal || ""}
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="w-full flex flex-col items-start gap-5">
          <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
            Price breakdown
          </h1>
          <div className="w-full sm:w-[400px] flex flex-col items-start gap-3">
            <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base">
              <p>Base Fare</p>
              <p>${flightInfo?.fareSummary?.baseFare || "0"}</p>
            </div>
            <div className="flex items-center justify-between w-full text-[#6E7491] text-sm sm:text-base">
              <p>Taxes and Fees</p>
              <p>${flightInfo?.fareSummary?.taxesAndFees || "0"}</p>
            </div>
            <hr className="w-full mt-5" />
            <div className="flex items-center justify-between w-full text-[#36374A] text-sm sm:text-base">
              <p>Total</p>
              <p>${flightInfo?.fareSummary?.total || "0"}</p>
            </div>
            <div className="my-4 w-full h-full flex flex-col items-start justify-start gap-5">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
                Payment method
              </h1>
              <div className="w-[300px] h-[188px]">
                <img
                  src={creditCard}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {/* <div className="w-full h-full flex flex-col items-start justify-start gap-4">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
                Share your travel itinerary
              </h1>
              <p className="text-[#7C8DB0] text-base sm:text-lg font-normal">
                You can email your itinerary to anyone by entering their email
                address here.
              </p>
              <form className="w-full h-full flex flex-col items-start justify-start gap-5 mt-5">
                <input
                  type="text"
                  placeholder="Email address "
                  className="w-full sm:w-[400px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <input
                  type="text"
                  placeholder="Email address "
                  className="w-full sm:w-[400px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
                <input
                  type="text"
                  placeholder="Email address "
                  className="w-full sm:w-[400px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                />
              </form>
              <div className="flex justify-center items-center mt-2">
                <button className="bg-[#605DEC] text-[#FAFAFA] text-base px-2 py-3 rounded hover:bg-white border-[1px] border-[#605DEC] hover:text-[#605DEC] transition-all duration-200">
                  Email itinerary
                </button>
              </div>
            </div> */}
            <div className="my-6 w-full h-full flex flex-col items-start justify-start gap-4">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
                Flight Route
              </h1>
              <div className="w-full h-full md:w-[750px] md:h-[400px]">
                <img
                  src={map1}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-[400px] h-full flex flex-col items-start gap-28">
        <ConfirmShop />
      </div>
    </div>
  );
};

export default Confirm;
