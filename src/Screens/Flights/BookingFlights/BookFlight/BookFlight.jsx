import React, { useEffect } from "react";
import FlightDetails from "../FlightDetails/FlightDetails";
import FlightSummery from "../FlightSummery/FlightSummery";
import FareRuls from "../FareRuls/FareRuls";
import ShortingFlight from "../../ShortingFlight/ShortingFlight";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFlightInfo } from "../../../../redux/features/bookingInfoSlice";
import { calculateArrivalDate } from "../../../../utils/calculateArrivalDate";
import { formatDate } from "../../../../utils/formatDate";
import { setSelectedCard } from "../../../../redux/features/bookingInfoSlice";

import {
  setIsLoading,
  setVisibleDetails,
  setShowFlightDetails,
  setShowFlightSummary,
  setShowFareRules,
  setSelectedButton,
  setFlightData,
  setsingleFlightDetails,
  setCurrentPage,
  setFlightDetailsVisibility,
  setShowStopageRule,
} from "../../../../redux/features/bookTicketSlice.js";
import { setFlightInfoT } from "../../../../redux/features/finalFlightSlice.js";
import RandomPage from "../../../../components/Error/RandomPage.jsx";
import StopageDetails from "../StopageDetails/StopageDetails.jsx";
import RoundTripFlights from "./RoundTripFlights.jsx";
// import useAuth from "../../../../hooks/useAuth";

const ITEMS_PER_PAGE = 4;

const BookFlight = () => {
  const isLoading = useSelector((state) => state.bookTicket.isLoading);
  const visibleDetails = useSelector(
    (state) => state.bookTicket.visibleDetails
  );
  const showFlightDetails = useSelector(
    (state) => state.bookTicket.showFlightDetails
  );
  const showFlightSummary = useSelector(
    (state) => state.bookTicket.showFlightSummary
  );
  const showFareRules = useSelector((state) => state.bookTicket.showFareRules);
  const showStopageRule = useSelector(
    (state) => state.bookTicket.showStopageRule
  );

  // const stopageDetails = useSelector((state) => state.)
  const selectedButton = useSelector(
    (state) => state.bookTicket.selectedButton
  );
  // const flightData = useSelector((state) => state.bookTicket.flightData);
  const flightData = useSelector((state) => state?.flights?.filteredFlights);
  // console.log("FILTEREDDD DATA", flightData);
  const singleFlightDetails = useSelector(
    (state) => state.bookTicket.singleFlightDetails
  );
  const currentPage = useSelector((state) => state.bookTicket.currentPage);
  const flightDetailsVisibility = useSelector(
    (state) => state.bookTicket.flightDetailsVisibility
  );

  const dispatch = useDispatch();
  const flight = useSelector((state) => state?.flights?.filteredFlights);

  const handlePaginationNext = () => {
    const totalPages = Math.ceil(flightData.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };
  const handlePaginationPrev = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  // Move the sorting logic inside a useEffect hook to avoid infinite re-renders
  useEffect(() => {
    if (flight) {
      const sortedData = flight?.slice();
      sortedData.sort((a, b) => b.fareSummary.total - a.fareSummary.total);
      dispatch(setFlightData(sortedData));
      dispatch(setIsLoading(false));
    }
  }, [flight, dispatch]);

  const handelVisible = (singleDataFlight) => {
    const flightId = singleDataFlight._id;
    const newVisibility = !flightDetailsVisibility[flightId];
    dispatch(
      setFlightDetailsVisibility({
        ...flightDetailsVisibility,
        [flightId]: newVisibility,
      })
    );
    dispatch(setsingleFlightDetails(singleDataFlight));
    handleFlightDetailsClick();
  };

  const handleFlightDetailsClick = () => {
    dispatch(setShowFlightDetails(true));
    dispatch(setShowFlightSummary(false));
    dispatch(setShowFareRules(false));
    dispatch(setShowStopageRule(false));
  };

  const handleFlightSummaryClick = () => {
    dispatch(setShowFlightDetails(false));
    dispatch(setShowFlightSummary(true));
    dispatch(setShowFareRules(false));
    dispatch(setShowStopageRule(false));
  };

  const handleFareRulesClick = () => {
    dispatch(setShowFlightDetails(false));
    dispatch(setShowFlightSummary(false));
    dispatch(setShowFareRules(true));
    dispatch(setShowStopageRule(false));
  };
  const handleStopageClick = () => {
    dispatch(setShowFlightDetails(false));
    dispatch(setShowFlightSummary(false));
    dispatch(setShowFareRules(false));
    dispatch(setShowStopageRule(true));
  };

  const handelCardComapnyFilter = (airlineName) => {
    dispatch(setSelectedCard(airlineName));

    const filteredData = flight?.filter(
      (item) => item.airlineName === airlineName
    );

    dispatch(setFlightData(filteredData));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // const { user } = useAuth()
  // const navigate = useNavigate();
  // const location = useLocation();
  // let from = location.state?.from?.pathname || "/";

  // const handleBooking = () => {
  //   if (!user) {

  //     navigate(from, { replace: true });
  //   }

  // }
  if (flightData.length === 0) {
    return (
      <RandomPage
        first="Oops! No Flights Found"
        second="It seems we couldn't find any flights matching your search"
        third="Try exploring different dates, cabin classes, or departure airports to discover available options."
      ></RandomPage>
    );
  }

  const traveState = useSelector((state) => state?.traveState);
  // console.log(traveState);
  const searchData = traveState?.searchFilterT;
  // console.log(searchData);
  // const flightData = traveState?.flightInfoT;

  // console.log(flightData);
  return (
    <section className="mb-16 ">
      {isLoading ? (
        <RandomPage
          first="Oops! No Flights Found"
          second="It seems we couldn't find any flights matching your search"
          third="Try exploring different dates, cabin classes, or departure airports to discover available options."
        ></RandomPage>
      ) : (
        <section>
          {/* Filter Card */}
          <ShortingFlight
            destenation={flight}
            handelCardComapnyFilter={handelCardComapnyFilter}
          />

          {/* Flight Details Card  Container*/}
          <section className=" mt-6">
            {/* Card Design */}

            {flightData
              ?.slice(startIndex, endIndex)
              ?.map((singleFlight, idx) => (
                <>
                  <section key={idx}>
                    {searchData.flightType === "roundTrip" && (
                      <>
                        <section
                          key={singleFlight?._id}
                          className="shadow-md w-full rounded-md px-6 pt-4 pb-12 mt-8 border-[1px] flex flex-col gap-3  border-gray-100 dark:border-0 dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500"
                        >
                          <h2 className="text-xl font-bold">Outbound Flight</h2>
                          <RoundTripFlights
                            singleFlight={singleFlight.goingFlight}
                            type={"going"}
                          ></RoundTripFlights>
                          <div>
                            <hr className="my-2" />
                            <h2 className="text-xl font-bold">Return Flight</h2>
                          </div>
                          <RoundTripFlights
                            singleFlight={singleFlight.returnFlight}
                            type={"coming"}
                          ></RoundTripFlights>
                        </section>
                      </>
                    )}

                    {searchData.flightType === "oneWay" && (
                      <section
                        key={singleFlight?._id}
                        className="shadow-md w-full rounded-md px-6 py-8 mt-8 border-[1px] border-gray-100 dark:border-0 dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500"
                      >
                        <div>
                          <div className=" grid grid-cols-3 lg:grid-cols-6 gap-5 ">
                            <div>
                              <img
                                className="h-16 w-16 object-cover rounded-full -ml-2"
                                src={
                                  singleFlight?.airlineLogo
                                    ? singleFlight?.airlineLogo
                                    : "https://i.ibb.co/30FqcLm/airplane-sky-1308-31202-removebg-preview.png"
                                }
                                alt={singleFlight?.airlineName}
                              />
                              <div>
                                <p className="text-gray-400 text-xs md:text-sm mt-2 md:mt-1">
                                  {singleFlight?.airlineName}
                                </p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-gray-400 text-[12px]">
                                Depart
                              </h4>
                              <h2 className=" text-xs md:text-sm mt-2 font-semibold">
                                {singleFlight?.departure?.time}
                              </h2>
                              <p className=" pr-2 text-xs mt-2 md:mt-1">
                                {formatDate(singleFlight?.departure?.date)}
                              </p>
                              <h3 className="text-xs mt-1">
                                {singleFlight?.departure?.city}
                              </h3>
                            </div>

                            <div align="center" className="space-y-1  pr-2">
                              <p className="text-gray-400 text-xs">
                                {singleFlight?.duration < 60
                                  ? `${singleFlight?.duration} min`
                                  : `${Math.floor(
                                      singleFlight?.duration / 60
                                    )} hr ${singleFlight?.duration % 60} min`}
                              </p>
                              <img
                                style={{
                                  WebkitFilter: "grayscale(100%)",
                                  filter: "grayscale(100%)",
                                }}
                                src="https://flightexpert.com/assets/img/non-stop-shape.png"
                                alt=""
                              />
                              <p className="text-xs pt-1">
                                {singleFlight?.stopType}
                              </p>
                              <p className="text-xs">
                                {singleFlight?.totalStop} Stops
                              </p>
                            </div>

                            <div>
                              <h4 className="text-gray-400 text-[13px]">
                                Arrive
                              </h4>
                              <h2 className="mt-1 text-sm font-semibold">
                                {singleFlight?.arrival?.time}
                              </h2>
                              <p className="pr-2 text-xs mt-2 md:mt-1">
                                {new Date(singleFlight?.arrival?.date)
                                  .toLocaleDateString("en-GB", {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                  .replace(/,/g, "")}
                              </p>

                              <h3 className="text-xs mt-2 md:mt-1">
                                {singleFlight?.arrival?.city}
                              </h3>
                            </div>

                            <div>
                              <h4 className="text-gray-400 text-[13px]">
                                Prise
                              </h4>
                              <h2 className="mt-1 text-xs md:text-sm font-semibold">
                                USD {singleFlight?.fareSummary?.total}
                              </h2>
                            </div>

                            <div align="center">
                              <Link to={`/review/${singleFlight?._id}`}>
                                <button
                                  onClick={() => {
                                    dispatch(
                                      setFlightInfo(singleFlight),
                                      dispatch(setFlightInfoT(singleFlight))
                                    );
                                  }}
                                  className="btn p-2 bg-cyan-600 hover:bg-white hover:border-2 hover:text-cyan-600 hover:border-cyan-600 text-white rounded-md dark:border-0"
                                >
                                  Book Now
                                </button>
                              </Link>
                            </div>
                          </div>
                          {/* View Details Section */}
                          <div className="w-full flex justify-between items-center mt-8 lg:mt-1">
                            <div>
                              <p className="text-cyan-500">
                                {singleFlight?.refundableStatus}
                              </p>
                              <p className="text-xs">
                                Seats may be upgraded to Main Cabin with a fare
                                difference if not available in Basic Economy.
                              </p>
                            </div>
                            <div
                              onClick={() => handelVisible(singleFlight)}
                              className="hover:cursor-pointer link-hover text-cyan-500"
                            >
                              <small>
                                {visibleDetails
                                  ? "Hide Flight Details"
                                  : "View Flight Details"}
                              </small>
                            </div>
                          </div>
                        </div>

                        {/* View Details Card Section */}

                        {flightDetailsVisibility[singleFlight._id] && (
                          <section className="mt-6 ">
                            <hr />
                            <section className="flex justify-start items-center mt-5 text-[12px]">
                              <p
                                onClick={() => handleFlightDetailsClick()}
                                className={`border-2 p-2 rounded-md cursor-pointer ${
                                  showFlightDetails
                                    ? "bg-cyan-600 text-white"
                                    : ""
                                }`}
                              >
                                Flight Details
                              </p>
                              <p
                                onClick={() => handleFlightSummaryClick()}
                                className={`border-2 p-2 rounded-md cursor-pointer ${
                                  showFlightSummary
                                    ? "bg-cyan-600 text-white"
                                    : ""
                                }`}
                              >
                                Fare Summary
                              </p>
                              <p
                                onClick={() => handleFareRulesClick()}
                                className={`border-2 p-2 rounded-md cursor-pointer ${
                                  showFareRules ? "bg-cyan-600 text-white" : ""
                                }`}
                              >
                                Fare Rules
                              </p>
                              <p
                                onClick={() => handleStopageClick()}
                                className={`border-2 p-2 rounded-md cursor-pointer ${
                                  showStopageRule
                                    ? "bg-cyan-600 text-white"
                                    : ""
                                }`}
                              >
                                Stopage Details
                              </p>
                            </section>

                            {showFlightDetails && (
                              <FlightDetails
                                flightFullDetails={singleFlightDetails}
                              />
                            )}
                            {showFlightSummary && (
                              <FlightSummery
                                flightFullDetails={singleFlightDetails}
                              />
                            )}
                            {showFareRules && (
                              <FareRuls
                                flightFullDetails={singleFlightDetails}
                              />
                            )}
                            {showStopageRule && (
                              <StopageDetails
                                stopageData={singleFlight.stopPageInfo}
                              ></StopageDetails>
                            )}
                          </section>
                        )}
                      </section>
                    )}
                  </section>
                </>
              ))}

            {/* Paination Button Section */}

            <section className="mt-12 mr-6 mb-8 flex justify-end items-center">
              <button
                className="border-[1px] p-2 rounded-l-md dark:bg-gray-500"
                onClick={handlePaginationPrev}
              >
                <GrPrevious size={20} />
              </button>
              {/* Render pagination buttons based on the total number of pages */}
              {Array.from(
                { length: Math.ceil(flightData.length / ITEMS_PER_PAGE) },
                (_, index) => (
                  <h3
                    key={index}
                    className={`pl-3 pr-3 pt-[6px] pb-[6px] border-[1px] ${
                      index + 1 === currentPage ? "bg-cyan-600 text-white" : ""
                    }`}
                    onClick={() => dispatch(setCurrentPage(index + 1))}
                  >
                    {index + 1}
                  </h3>
                )
              )}
              <button
                className="border-[1px] p-2 rounded-r-md dark:bg-gray-500 "
                onClick={handlePaginationNext}
              >
                <GrNext size={20} />
              </button>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default BookFlight;
