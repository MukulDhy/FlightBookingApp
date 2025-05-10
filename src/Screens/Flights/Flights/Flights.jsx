import React, { useEffect } from "react";
import BookFlight from "../BookingFlights/BookFlight/BookFlight";
import SpecialOffer from "../../../Components/SpecialOffer/SpecialOffer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";

const Flights = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    flightType,
    departureDate,
    returnDate,
    fromCityInfo,
    toCityInfo,
    passengers,
    cabinClass,
  } = useSelector((state) => state.searchFilter);

  const {
    airportName: airportNameDepart,
    code: codeDepart,
    destination: destinationDepart,
  } = fromCityInfo;
  const {
    airportName: airportNameArrive,
    code: codeArrive,
    destination: destinationArrive,
  } = toCityInfo;

  const handleModifySearch = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const { loading, error } = useSelector((state) => state.global);

  // Conditional Rendering Logic
  if (loading) {
    return <Loader></Loader>;
  }

  if (error) {
    navigate("/");
    return null; // Prevent further rendering
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto lg:-mt-10">
        <div className="px-5 sm:px-10">
          <SpecialOffer />
        </div>
        <div className="grid md:grid-cols-3 gap-10 mt-5 px-5 sm:px-10">
          {/* Sidebar: Flight Details */}
          <div className="col-span-1 hidden lg:block">
            <div className="bg-white shadow-md rounded-lg p-5 border border-gray-300">
              <h2 className="text-lg font-bold mb-4 text-blue-600">
                Flight Details
              </h2>

              {/* Departure and Arrival Details */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">Departure:</p>
                <p className="font-semibold">
                  {airportNameDepart} ({codeDepart})
                </p>
                <p className="text-sm text-gray-600">Destination:</p>
                <p className="font-semibold">{destinationDepart}</p>
                <p className="text-sm text-gray-600">Arrival:</p>
                <p className="font-semibold">
                  {airportNameArrive} ({codeArrive})
                </p>
                <p className="text-sm text-gray-600">Destination:</p>
                <p className="font-semibold">{destinationArrive}</p>
              </div>

              {/* Date Information */}
              <div className="mb-4 flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Departure Date:</p>
                  <p className="font-semibold">
                    {new Date(departureDate).toLocaleDateString()}
                  </p>
                </div>
                {flightType === "roundTrip" && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Return Date:</p>
                      <p className="font-semibold">
                        {new Date(returnDate).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Passenger Information */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">Passengers:</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Adults</span>
                    <span>{passengers.adults}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Children</span>
                    <span>{passengers.children}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Infants</span>
                    <span>{passengers.infants}</span>
                  </div>
                </div>
              </div>

              {/* Cabin Class and Flight Type */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">Cabin Class:</p>
                <p className="font-semibold">{cabinClass}</p>
                <p className="text-sm text-gray-600">Flight Type:</p>
                <p className="font-semibold">{flightType}</p>
              </div>

              {/* Modify Search Button */}
              <div className="mt-5 text-center">
                <button
                  className="btn p-2 bg-cyan-600 hover:bg-white hover:text-cyan-600 hover:border-cyan-600 text-white rounded-md dark:border-0"
                  onClick={handleModifySearch}
                >
                  Modify Search
                </button>
              </div>
            </div>
          </div>

          {/* Main Content: Book Flight */}
          <div className="col-span-2">
            <BookFlight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
