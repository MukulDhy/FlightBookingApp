import React, { useEffect, useState } from "react";
import { MdAddCircle, MdFlight, MdRemoveCircle } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";
import { BsPostcardFill } from "react-icons/bs";
import { format } from "date-fns";
import SearchLocation from "./SearchLocation";
// import CalendarComponent from "./CalendarComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  storeFilteredFlights,
  storeFlights,
} from "../../redux/features/flightsSlice";
import {
  setIsActive,
  setFlightType,
  setCityCount,
  setDepartureDate,
  setReturnDate,
  setCalendarModal,
  setPassengers,
  setCabinClass,
} from "../../redux/features/searchFilterSlice";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCountdownContext } from "../../providers/CountdownContext";
import { setLoading } from "../../redux/features/globalSlice";
import { setSearchFilterT } from "../../redux/features/finalFlightSlice";
import { searchFlights } from "../../service/AmadeusService";
import axios from "axios";
import { extractFlightInfo } from "../../utils/extractFlightInfo";

// import { errorToast } from "../../utils/toast";

// import React from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file for the calendar
import "react-date-range/dist/theme/default.css"; // Default theme
import { searchFlightsFlightGO } from "../../service/flightLabService";
import { extractFlightInfoFlightGo } from "../../utils/extractFlightLabs";

const CalendarComponent = React.memo(
  ({ date, setDate, minDate = new Date() }) => {
    return (
      <div className="calendar-container">
        <Calendar
          rangeColors={["#262626"]} // Customize the calendar's highlight color
          color="#0891B2" // Highlight color for the selected date
          date={date} // Current date displayed
          direction="vertical" // Vertical layout
          showDateDisplay={false} // Hide the date display at the top
          minDate={minDate} // Minimum selectable date
          onChange={setDate}
          className="w-fit shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md"
        />
      </div>
    );
  }
);

// export default CalendarComponent;

const SearchFilter = ({ bookingType, filterName }) => {
  const { setIsStart } = useCountdownContext();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [locationModal, setLocationModal] = useState("");
  const isActive = useSelector((state) => state?.searchFilter?.isActive);
  const flightType = useSelector((state) => state?.searchFilter?.flightType);
  const cityCount = useSelector((state) => state?.searchFilter?.cityCount);

  const [departureDateCal, setDepartureDateCal] = useState(new Date());
  const [returnDateCal, setReturnDateCal] = useState(departureDateCal);

  const departureDate = useSelector(
    (state) => state?.searchFilter?.departureDate
  );
  const returnDate = useSelector((state) => state?.searchFilter?.returnDate);
  const calendarModal = useSelector(
    (state) => state?.searchFilter?.calendarModal
  );
  const fromCityInfo = useSelector(
    (state) => state?.searchFilter?.fromCityInfo
  );
  const toCityInfo = useSelector((state) => state?.searchFilter?.toCityInfo);
  // Dispatch redux state
  const dispatch = useDispatch();
  // console.log("from City = ", fromCityInfo);
  // handel same destination
  useEffect(() => {
    if (
      fromCityInfo.id ===
      toCityInfo.id
    ) {
      console.log(fromCityInfo);
      console.log(toCityInfo);
      setErrorMsg("From & To airports can't be same");
    } else {
      setErrorMsg("");
    }
  }, [fromCityInfo, toCityInfo]);

  // Convert Date Format
  // Convert Date Format
  const formattedDate = (date) => {
    return format(date, "dd MMM yy"); // Format date as "dd MMM yy"
  };

  const dateName = (date) => {
    return format(date, "EEEE"); // Format date as the day of the week
  };

  // #region Start

  const [isReturnDateValid, setIsReturnDateValid] = useState(true);

  // Handle Departure Date
  const handleDepartureDate = (date) => {
    const isoDate = date.toISOString(); // Convert date to ISO string
    dispatch(setDepartureDate(isoDate));

    if (flightType === "roundTrip") {
      if (new Date(isoDate) >= new Date(returnDate)) {
        // If departure date is after or on return date, adjust return date
        dispatch(setReturnDate(isoDate));
      }
      dispatch(setCalendarModal("return")); // Open return calendar for selection
    } else {
      dispatch(setCalendarModal(null)); // Close calendar for one-way trip
    }
  };

  // Handle Return Date
  const handleReturnDate = (date) => {
    const isoDate = date.toISOString(); // Convert date to ISO string

    if (new Date(isoDate) >= new Date(departureDate)) {
      // Only set return date if it's after or on the departure date
      dispatch(setReturnDate(isoDate));
      setIsReturnDateValid(true); // Mark the return date as valid
      dispatch(setCalendarModal(null)); // Close the calendar
    } else {
      setIsReturnDateValid(false); // Mark the return date as invalid
    }
  };

  const searchFilterData = useSelector((state) => state.searchFilter);
  const allData = useSelector((state) => state.traveState);

  // Amedeous Api Calll
  // const handleSearch = async () => {
  //   setIsStart(false); // Reset Session Countdown
  //   dispatch(setLoading(true));

  //   dispatch(
  //     setSearchFilterT({
  //       flightType,
  //       departureDate,
  //       returnDate,
  //       fromCityInfo,
  //       toCityInfo,
  //       travelers,
  //       searchFilterData: searchFilterData.cabinClass,
  //       total_passanger:
  //         travelers.adults + travelers.children + travelers.infants,
  //     })
  //   );
  //   const fromCity = fromCityInfo?.code;
  //   const toCity = toCityInfo?.code;
  //   const date = format(departureDate, "yyyy-MM-dd");
  //   // const returnDate = format(retur)

  //   const searchQuery = `fromCity=${fromCity}&toCity=${toCity}&departureDate=${date}`;
  //   const url = `/flights/search?${searchQuery}`;
  //   // console.log(allData.searchFilterT);
  //   try {
  //     const response = await searchFlights({
  //       origin: fromCity,
  //       destination: toCity,
  //       departureDate: date,
  //       returnDate:
  //         returnDate && flightType == "roundTrip"
  //           ? format(returnDate, "yyyy-MM-dd")
  //           : false,
  //       adults: travelers.adults,
  //       travelClass: travelClass.toUpperCase(),
  //     });
  //     console.log(response);
  //     // if (Object.keys(response.data).length > 0) {
  //     console.log("Inside Loop");
  //     const data = extractFlightInfo(
  //       response,
  //       null,
  //       travelClass,
  //       fromCityInfo?.destination?.split("/")[1],
  //       toCityInfo?.destination?.split("/")[1],
  //       fromCityInfo?.airportName,
  //       toCityInfo?.airportName
  //     );
  //     console.log(data);
  //     sessionStorage.setItem("search_flight", JSON.stringify(data));
  //     const sesonData = JSON.parse(sessionStorage.getItem("search_flight"));

  //     // Handle the response data here
  //     console.log("sesonData", sesonData);
  //     dispatch(storeFilteredFlights(sesonData));
  //     dispatch(storeFlights(sesonData));
  //     dispatch(setLoading(false));
  //     navigate("/flights");
  //     setIsStart(true);
  //     // }
  //     dispatch(setLoading(false));
  //   } catch (error) {
  //     setIsStart(false); // Reset Session Countdown
  //     dispatch(setLoading(false));
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  //   // Handle any errors here
  // };

  // recall when reload filter page

  // Flight GO Lab code

  const handleSearch = async () => {
    setIsStart(false); // Reset Session Countdown
    dispatch(setLoading(true));

    dispatch(
      setSearchFilterT({
        flightType,
        departureDate,
        returnDate,
        fromCityInfo,
        toCityInfo,
        travelers,
        searchFilterData: searchFilterData.cabinClass,
        total_passanger:
          travelers.adults + travelers.children + travelers.infants,
      })
    );
    const fromCity = fromCityInfo?.code;
    const toCity = toCityInfo?.code;
    const date = format(departureDate, "yyyy-MM-dd");
    // const returnDate = format(retur)

    const searchQuery = `fromCity=${fromCity}&toCity=${toCity}&departureDate=${date}`;
    const url = `/flights/search?${searchQuery}`;
    // console.log(allData.searchFilterT);
    try {
      const response = await searchFlightsFlightGO({
        originSkyId: fromCity,
        destinationSkyId: toCity,
        departureDate: date,
        returnDate:
          returnDate && flightType == "roundTrip"
            ? format(returnDate, "yyyy-MM-dd")
            : false,
        adults: travelers.adults,
        cabinClass: travelClass.toLowerCase(),
        // origin: fromCity,
        // destination: toCity,
        // departureDate: date,
        // returnDate:
        //   returnDate && flightType == "roundTrip"
        //     ? format(returnDate, "yyyy-MM-dd")
        //     : false,
        // adults: travelers.adults,
        // travelClass: travelClass.toUpperCase(),
      });
      // console.log(response);
      // if (Object.keys(response.data).length > 0) {
      // console.log("Inside Loop");
      const data = extractFlightInfoFlightGo(
        response,
        travelClass.toLowerCase(),
        fromCityInfo?.destination?.split("/")[1],
        toCityInfo?.destination?.split("/")[1],
        fromCityInfo?.airportName,
        toCityInfo?.airportName,
        flightType.toLowerCase()
      );
      console.log(data);
      sessionStorage.setItem("search_flight", JSON.stringify(data));
      const sesonData = JSON.parse(sessionStorage.getItem("search_flight"));

      // Handle the response data here
      console.log("sesonData", sesonData);
      dispatch(storeFilteredFlights(sesonData));
      dispatch(storeFlights(sesonData));
      dispatch(setLoading(false));
      navigate("/flights");
      setIsStart(true);
      // }
      dispatch(setLoading(false));
    } catch (error) {
      setIsStart(false); // Reset Session Countdown
      dispatch(setLoading(false));
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
    // Handle any errors here
  };

  useEffect(() => {
    if (filterName === "Modify Search") {
      handleSearch();
    }
  }, [filterName]);

  // THis code is for the travellor or passanger detail
  // #region

  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [travelClass, setTravelClass] = useState("Economy");

  const handleTravelerChange = (type, increment) => {
    setTravelers((prev) => {
      const updatedCount = Math.max(0, prev[type] + (increment ? 1 : -1));
      // console.log(`Updated ${type}: ${updatedCount}`);
      const updatedTravelers = { ...prev, [type]: updatedCount };

      // Dispatch after updating the state
      dispatch(setPassengers(updatedTravelers));

      // Return the updated state
      return updatedTravelers;
    });
  };

  const handleClassChange = (newClass) => {
    // Dispatch the updated class immediately after updating the state
    dispatch(setCabinClass(newClass));
    setTravelClass(newClass); // Update state with the new class
    // console.log(`Updated Travel Class: ${newClass}`);
  };
  // #endregion

  return (
    <div className="max-w-7xl mx-auto dark:text-gray-300 ">
      <div className="p-5 sm:mx-10 text-gray-500 rounded-xl shadow-md bg-white dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 dark:z-50">
        {bookingType === "all" && (
          <div className="flex gap-1  bg-gray-200 p-1 rounded w-fit font-medium text-gray-600 text-sm  ">
            <div
              onClick={() => dispatch(setIsActive("flight"))}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1  ${
                isActive === "flight" ? "bg-cyan-300" : "bg-white "
              }`}
            >
              <MdFlight /> Flight
            </div>

            {/* Hotel and Visa */}
            {/* <div
              // onClick={() => dispatch(setIsActive("hotel"))}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                isActive === "hotel" ? "bg-cyan-300" : "bg-white"
              }`}
            >
              <RiHotelFill /> Hotel{" "}
              <small className="text-xs font-normal hidden sm:block">
                (Upcoming)
              </small>
            </div>
            <div
              // onClick={() => dispatch(setIsActive("visa"))}
              className={`px-4 py-2 cursor-pointer flex items-center gap-1 ${
                isActive === "visa" ? "bg-cyan-300" : "bg-white"
              }`}
            >
              <BsPostcardFill /> Visa{" "}
              <small className="text-xs font-normal  hidden sm:block">
                (Upcoming)
              </small>
            </div> */}
          </div>
        )}
        <div className="flex flex-wrap gap-4 font-semibold text-gray-600 my-4">
          {/* <label className="flex gap-1 dark:text-gray-400">
            <input
              type="radio"
              name="flightType"
              value="oneWay"
              className="radio  radio-accent"
              checked
              onChange={() => dispatch(setFlightType("oneWay"))}
            />
            One Way
          </label> */}
          <div className="relative w-fit">
            <div className="border border-cyan-500 py-1 px-3 rounded-full flex gap-4">
              <label className="flex gap-1 dark:text-gray-400">
                <input
                  type="radio"
                  name="flightType"
                  value="oneWay"
                  className="radio radio-accent"
                  checked={flightType === "oneWay"}
                  onChange={() => dispatch(setFlightType("oneWay"))}
                />
                One Way
              </label>
              <label className="flex gap-1 dark:text-gray-400">
                <input
                  type="radio"
                  name="flightType"
                  value="roundTrip"
                  className="radio radio-accent"
                  checked={flightType === "roundTrip"}
                  onChange={() => dispatch(setFlightType("roundTrip"))}
                  // disabled
                />
                Round Trip
              </label>
              <label className="flex gap-1 dark:text-gray-400">
                <input
                  type="radio"
                  name="flightType"
                  value="multiCity"
                  className="radio radio-accent"
                  checked={flightType === "multiCity"}
                  onChange={() => dispatch(setFlightType("multiCity"))}
                  disabled
                />
                Multi City
              </label>
            </div>
          </div>
        </div>
        {/*  Adding the Features of Multicity Later */}
        <div className="mb-3">
          {flightType === "multiCity" ? (
            <>
              <div className="search-grid gap-2">
                <div className="w-full p-2 border rounded-md">
                  <label htmlFor="fromCity">
                    <p className="text-sm">From</p>
                    <input
                      id="fromCity"
                      type="text"
                      className="text-xl font-semibold outline-none"
                      value={fromCityInfo?.destination?.split(",")[0]}
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {fromCityInfo?.airportName}
                        </span>
                      </small>
                    </div>
                  </label>
                </div>
                <div className="w-full p-2 border rounded-md">
                  <label htmlFor="toCity">
                    <p className="text-sm">To</p>
                    <input
                      id="toCity"
                      type="text"
                      className="text-lg sm:text-xl font-semibold outline-none"
                      value={toCityInfo?.destination.split(",")[0]}
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {toCityInfo?.airportName}
                        </span>
                      </small>
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-2 border rounded-md">
                  <div
                    className="w-full  p-2 border-r relative"
                    onClick={() => dispatch(setCalendarModal(!calendarModal))}
                  >
                    <p className="text-sm">Departure</p>
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="text-lg sm:text-xl font-semibold outline-none bg-transparent"
                        value={formattedDate(departureDate)}
                        readOnly
                      />
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {dateName(departureDate)}
                        </span>
                      </small>
                    </div>
                    {calendarModal === "departure" && (
                      <div className="absolute top-20 left-0 z-40">
                        <CalendarComponent
                          date={departureDateCal}
                          setDate={handleDepartureDate}
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-full p-2">
                    <p className="text-sm">Return</p>
                    <input
                      type="text"
                      className="text-lg sm:text-xl font-semibold outline-none bg-transparent"
                      value={formattedDate(returnDate)}
                      readOnly
                    />
                    <small className="text-xs my-0">
                      <span title="" className="">
                        {dateName(returnDate)}
                      </span>
                    </small>
                  </div>
                </div>
                <div className="w-full p-2 border rounded-md cursor-pointer">
                  <p className="text-sm">Travel & Booking Class</p>
                  <h5 className="text-lg sm:text-xl font-semibold">
                    1 Traveler
                  </h5>
                  <small className="text-xs my-0">
                    <span title="" className="">
                      Business Class
                    </span>
                  </small>
                </div>
              </div>
              {/* {Array.from({ length: cityCount }, (_, index) => (
                <div className="search-grid gap-2 mt-1">
                  <div className="w-full p-2 border rounded-md">
                    <label htmlFor="fromCity">
                      <p className="text-sm">From</p>
                      <input
                        id="fromCity"
                        type="text"
                        className="text-xl  font-semibold outline-none"
                        value="Dhaka"
                      />
                      <div className="cursor-pointer">
                        <small className="text-xs my-0">
                          <span title="" className="">
                            Hazrat Shahjalal International Airport
                          </span>
                        </small>
                      </div>
                    </label>
                  </div>
                  <div className="w-full p-2 border rounded-md">
                    <label htmlFor="toCity">
                      <p className="text-sm">To</p>
                      <input
                        id="toCity"
                        type="text"
                        className="text-lg sm:text-xl font-semibold outline-none"
                        value="Khulna"
                      />
                      <div className="cursor-pointer">
                        <small className="text-xs my-0">
                          <span title="" className="">
                            Khulna International Airport
                          </span>
                        </small>
                      </div>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 border rounded-md">
                    <div className="w-full p-2 border-r relative overflow-hidden">
                      <p className="text-sm">Departure</p>
                      <div className="cursor-pointer">
                        <input
                          type="text"
                          className="text-lg sm:text-xl font-semibold outline-none bg-transparent"
                          value="08 Aug 23"
                          readOnly
                        />
                        <small className="text-xs my-0">
                          <span title="" className="">
                            Tuesday
                          </span>
                        </small>
                      </div>
                    </div>
                    <div className="w-full p-2">
                      <p className="text-sm">Return</p>
                      <h5 className="text-lg sm:text-xl font-semibold">
                        11 Aug 23
                      </h5>
                      <small className="text-xs my-0">
                        <span title="" className="">
                          Friday
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm w-full p-2 border rounded-md cursor-pointer">
                    {index !== cityCount - 1 ? (
                      <button
                        className="flex items-center gap-1 text-red-500"
                        onClick={() =>
                          dispatch(setCityCount((prevCount) => prevCount - 1))
                        }
                      >
                        <MdRemoveCircle /> Remove
                      </button>
                    ) : (
                      <>
                        <button
                          className="border px-3 py-1 flex items-center text-cyan-500"
                          onClick={() =>
                            dispatch(setCityCount((prevCount) => prevCount + 1))
                          }
                        >
                          <MdAddCircle /> Add
                        </button>
                        {index > 0 && (
                          <>
                            <div className="divider divider-horizontal"></div>
                            <button
                              className="flex items-center gap-1 text-red-500"
                              onClick={() =>
                                dispatch(
                                  setCityCount((prevCount) => prevCount - 1)
                                )
                              }
                            >
                              <MdRemoveCircle /> Remove
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))} */}
            </>
          ) : (
            <div className="search-grid gap-2">
              <div className="block lg:flex">
                <div
                  className="w-full lg:w-1/2  p-2 border rounded-md relative"
                  onClick={() => {
                    if (!isModal) {
                      setIsModal(true);
                    }
                    setLocationModal("from");
                  }}
                >
                  <label htmlFor="fromCity">
                    <p className="text-sm">From</p>
                    <input
                      id="fromCity"
                      type="text"
                      className="text-xl  font-semibold outline-none cursor-pointer dark:bg-transparent dark:text-gray-300"
                      value={fromCityInfo.city}
                      readOnly
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {fromCityInfo.airportName}
                        </span>
                      </small>
                    </div>
                  </label>
                  {isModal && locationModal === "from" && (
                    <div className="absolute top-24 left-0 z-40 ">
                      <SearchLocation
                        setIsModal={setIsModal}
                        locationModal={locationModal}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="w-full lg:w-1/2 p-2 border rounded-md relative cursor-pointer"
                  onClick={() => {
                    if (!isModal) {
                      setIsModal(true);
                    }
                    setLocationModal("to");
                  }}
                >
                  {errorMsg && (
                    <div className="absolute -bottom-3 px-2 rounded-full left-0 text-sm bg-red-50 text-red-500">
                      From & To airports can't be same
                    </div>
                  )}
                  <label htmlFor="toCity">
                    <p className="text-sm">To</p>
                    <input
                      id="toCity"
                      type="text"
                      className="text-lg sm:text-xl font-semibold outline-none cursor-pointer dark:bg-transparent dark:text-gray-300"
                      value={toCityInfo.city}
                      readOnly
                    />
                    <div className="cursor-pointer">
                      <small className="text-xs my-0">
                        <span title="" className="">
                          {toCityInfo.airportName}
                        </span>
                      </small>
                    </div>
                  </label>
                  {isModal && locationModal === "to" && (
                    <div className="absolute top-24 left-0 z-40">
                      <SearchLocation
                        setIsModal={setIsModal}
                        locationModal={locationModal}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 border rounded-md">
                {/* Departure Section */}
                <div
                  className="w-full p-2 border-r relative"
                  onClick={() => dispatch(setCalendarModal("departure"))}
                >
                  <p className="text-sm">Departure</p>
                  <div className="cursor-pointer">
                    <input
                      type="text"
                      className="text-lg sm:text-xl w-24 font-semibold outline-none bg-transparent"
                      value={formattedDate(departureDate)}
                      readOnly
                    />
                    <br />
                    <small className="text-xs my-0">
                      <span title="">{dateName(departureDate)}</span>
                    </small>
                  </div>
                  {calendarModal === "departure" && (
                    <div className="absolute top-20 left-0 z-40">
                      <CalendarComponent
                        date={departureDateCal}
                        setDate={handleDepartureDate}
                      />
                    </div>
                  )}
                </div>

                {/* One-Way Flight Type Section */}
                {flightType === "oneWay" && (
                  <div
                    className="w-full p-2 cursor-pointer"
                    onClick={() => {
                      dispatch(setFlightType("roundTrip"));
                      dispatch(setCalendarModal("return"));
                    }}
                  >
                    <p className="text-sm">Return</p>
                    <p className="text-xs my-0 mt-2 cursor-pointer">
                      Tap to book return ticket for more savings
                    </p>
                  </div>
                )}

                {/* Round-Trip Flight Type Section */}
                {flightType === "roundTrip" && (
                  <div
                    className="w-full p-2 relative"
                    onClick={() => dispatch(setCalendarModal("return"))}
                  >
                    <p className="text-sm">Return</p>
                    <div className="cursor-pointer">
                      <input
                        type="text"
                        className="text-lg sm:text-xl w-24 font-semibold outline-none bg-transparent"
                        value={formattedDate(returnDate)}
                        readOnly
                      />
                      <br />
                      <small className="text-xs my-0">
                        <span title="">{dateName(returnDate)}</span>
                      </small>
                    </div>
                    {calendarModal === "return" && (
                      <div className="absolute top-20 left-0 z-40">
                        <CalendarComponent
                          date={returnDateCal}
                          setDate={handleReturnDate}
                          minDate={new Date(departureDate)} // Ensure return date is after departure
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full p-2 border rounded-md cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Left Section: Travelers Count and Class */}
                  <div className="sm:w-1/2">
                    <p className="text-sm">Travel & Booking Class</p>
                    <h5 className="text-lg sm:text-xl font-semibold">
                      {travelers.adults +
                        travelers.children +
                        travelers.infants}{" "}
                      Traveler(s)
                    </h5>
                    <small className="text-xs my-0">
                      <span title="" className="">
                        {travelClass} Class
                      </span>
                    </small>
                  </div>

                  {/* Right Section: Travelers Adjustment */}
                  <div className="flex-1">
                    <h6 className="font-semibold">Travelers</h6>
                    <div className="flex flex-wrap gap-4">
                      {["adults", "children", "infants"].map((type) => (
                        <div key={type} className="flex flex-col items-center">
                          <span className="capitalize">{type}</span>
                          <div className="flex items-center gap-2">
                            <button
                              className="p-1 border rounded bg-gray-100"
                              onClick={() => handleTravelerChange(type, false)}
                            >
                              -
                            </button>
                            <span>{travelers[type]}</span>
                            <button
                              className="p-1 border rounded bg-gray-100"
                              onClick={() => handleTravelerChange(type, true)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Travel Class Selection */}
                <div className="mt-4">
                  <h6 className="font-semibold">Travel Class</h6>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Economy",
                      "Business",

                      "Premium Economy",
                      "First Class",
                    ].map((type) => (
                      <button
                        key={type}
                        className={`p-2 border rounded ${
                          travelClass === type
                            ? "bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white font-semibold"
                            : "bg-gray-100"
                        }`}
                        onClick={() => handleClassChange(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center -mb-11">
          {errorMsg ? (
            <button className="px-10 py-3 rounded bg-gray-400 cursor-not-allowed text-white font-semibold">
              {filterName}
            </button>
          ) : (
            <Link to="/flights">
              <button
                className={`px-10 py-3 rounded text-white font-semibold ${
                  isReturnDateValid
                    ? "bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleSearch}
                disabled={!isReturnDateValid} // Disable if return date is invalid
              >
                {filterName}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
