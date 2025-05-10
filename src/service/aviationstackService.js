import axios from "axios";

const API_KEY = "5f276e380c619f237f3cb44e917778c1";
const BASE_URL = "https://api.aviationstack.com/v1";

// Helper function to get flight data from Aviationstack API
export const getFlightData = async (params) => {
  try {
    // Create the full API URL with parameters
    const response = await axios.get(`${BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        ...params, // Spread any additional parameters passed to the function
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    throw new Error("Unable to fetch flight data from Aviationstack");
  }
};

// Search for flights based on dynamic params (origin, destination, date, etc.)
export const searchFlights = async ({ origin, destination, departureDate, returnDate }) => {
  const params = {
    dep_iata: origin,    // Origin IATA code
    arr_iata: destination, // Destination IATA code
    flight_date: departureDate, // Departure date (yyyy-mm-dd format)
    return_date: returnDate, // Optional: for round-trip flights
  };

  const data = await getFlightData(params);
  return data;
};

// Get live flight status by flight number
export const getFlightStatus = async (flightNumber) => {
  const params = {
    flight_iata: flightNumber, // Flight number (e.g. "AA100")
  };

  const data = await getFlightData(params);
  return data;
};

// Get real-time flight data for a given airport
export const getAirportFlights = async (airportIata) => {
  const params = {
    dep_iata: airportIata, // Airport IATA code (e.g. "JFK")
  };

  const data = await getFlightData(params);
  return data;
};
