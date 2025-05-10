import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFlightInfo } from "../../../../redux/features/bookingInfoSlice";
import { setFlightInfoT } from "../../../../redux/features/finalFlightSlice";
import { Link } from "react-router";
import { formatDate } from "../../../../utils/formatDate";
import FlightDetails from "../FlightDetails/FlightDetails";
import FlightSummery from "../FlightSummery/FlightSummery";
import FareRuls from "../FareRuls/FareRuls";
import StopageDetails from "../StopageDetails/StopageDetails";

const RoundTripFlights = ({ singleFlight, type }) => {
  const dispatch = useDispatch();
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [showFlightSummary, setShowFlightSummary] = useState(false);
  const [showFareRules, setShowFareRules] = useState(false);
  const [showStopageRule, setShowStopageRule] = useState(false);

  const handleFlightDetailsClick = () => {
    setShowFlightDetails(true);
    setShowFlightSummary(false);
    setShowFareRules(false);
    setShowStopageRule(false);
  };

  const handleFlightSummaryClick = () => {
    setShowFlightDetails(false);
    setShowFlightSummary(true);
    setShowFareRules(false);
    setShowStopageRule(false);
  };

  const handleFareRulesClick = () => {
    setShowFlightDetails(false);
    setShowFlightSummary(false);
    setShowFareRules(true);
    setShowStopageRule(false);
  };

  const handleStopageClick = () => {
    setShowFlightDetails(false);
    setShowFlightSummary(false);
    setShowFareRules(false);
    setShowStopageRule(true);
  };

  return (
    <>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">
        <div>
          <img
            className="h-16 w-16 object-cover rounded-full -ml-2"
            src={
              singleFlight?.airlineLogo ||
              "https://i.ibb.co/30FqcLm/airplane-sky-1308-31202-removebg-preview.png"
            }
            alt={singleFlight?.airlineName}
          />
          <p className="text-gray-400 text-xs md:text-sm mt-2 md:mt-1">
            {singleFlight?.airlineName}
          </p>
        </div>

        <div>
          <h4 className="text-gray-400 text-[12px]">Depart</h4>
          <h2 className="text-xs md:text-sm mt-2 font-semibold">
            {singleFlight?.departure?.time}
          </h2>
          <p className="pr-2 text-xs mt-2 md:mt-1">
            {formatDate(singleFlight?.departure?.date)}
          </p>
          <h3 className="text-xs mt-1">{singleFlight?.departure?.city}</h3>
        </div>

        <div align="center" className="space-y-1 pr-2">
          <p className="text-gray-400 text-xs">
            {singleFlight?.duration < 60
              ? `${singleFlight?.duration} min`
              : `${Math.floor(singleFlight?.duration / 60)} hr ${
                  singleFlight?.duration % 60
                } min`}
          </p>
          <img
            style={{
              WebkitFilter: "grayscale(100%)",
              filter: "grayscale(100%)",
            }}
            src="https://flightexpert.com/assets/img/non-stop-shape.png"
            alt=""
          />
          <p className="text-xs pt-1">{singleFlight?.stopType}</p>
          <p className="text-xs">{singleFlight?.totalStop} Stops</p>
        </div>

        <div>
          <h4 className="text-gray-400 text-[13px]">Arrive</h4>
          <h2 className="mt-1 text-sm font-semibold">
            {singleFlight?.arrival?.time}
          </h2>
          <p className="pr-2 text-xs mt-2 md:mt-1">
            {formatDate(singleFlight?.arrival?.date)}
          </p>
          <h3 className="text-xs mt-2 md:mt-1">
            {singleFlight?.arrival?.city}
          </h3>
        </div>

        {type === "going" && (
          <>
            <div>
              <h4 className="text-gray-400 text-[13px]">Price</h4>
              <h2 className="mt-1 text-xs md:text-sm font-semibold">
                USD {singleFlight?.fareSummary?.total}
              </h2>
            </div>
            <div align="center">
              <Link to={`/review/${singleFlight?._id}`}>
                <button
                  onClick={() => {
                    dispatch(setFlightInfo(singleFlight));
                    dispatch(setFlightInfoT(singleFlight));
                  }}
                  className="btn p-2 bg-cyan-600 hover:bg-white hover:border-2 hover:text-cyan-600 hover:border-cyan-600 text-white rounded-md"
                >
                  Book Now
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-8 lg:mt-1">
        <p className="text-cyan-500">
          <small>{singleFlight?.refundableStatus}</small>
        </p>
        <p
          onClick={() => setVisibleDetails(!visibleDetails)}
          className="hover:cursor-pointer link-hover text-cyan-500"
        >
          <small>
            {visibleDetails ? "Hide Flight Details" : "View Flight Details"}
          </small>
        </p>
      </div>

      {visibleDetails && (
        <section className="mt-6">
          <hr />
          <section className="flex justify-start items-center mt-5 text-[12px]">
            <p
              onClick={handleFlightDetailsClick}
              className={`border-2 p-2 rounded-md cursor-pointer ${
                showFlightDetails ? "bg-cyan-600 text-white" : ""
              }`}
            >
              Flight Details
            </p>
            <p
              onClick={handleFlightSummaryClick}
              className={`border-2 p-2 rounded-md cursor-pointer ${
                showFlightSummary ? "bg-cyan-600 text-white" : ""
              }`}
            >
              Fare Summary
            </p>
            <p
              onClick={handleFareRulesClick}
              className={`border-2 p-2 rounded-md cursor-pointer ${
                showFareRules ? "bg-cyan-600 text-white" : ""
              }`}
            >
              Fare Rules
            </p>
            <p
              onClick={handleStopageClick}
              className={`border-2 p-2 rounded-md cursor-pointer ${
                showStopageRule ? "bg-cyan-600 text-white" : ""
              }`}
            >
              Stopage Details
            </p>
          </section>

          <section>
            {showFlightDetails && (
              <FlightDetails flightFullDetails={singleFlight} />
            )}
            {showFlightSummary && (
              <FlightSummery flightFullDetails={singleFlight} />
            )}
            {showFareRules && <FareRuls flightFullDetails={singleFlight} />}
            {showStopageRule && (
              <StopageDetails
                stopageData={singleFlight?.stopageInfo}
              ></StopageDetails>
            )}
          </section>
        </section>
      )}
    </>
  );
};

export default RoundTripFlights;
