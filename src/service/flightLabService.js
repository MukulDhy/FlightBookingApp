import axios from "axios";

// Replace with your actual API access key
const API_ACCESS_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZmNkODQ2ZTU1YWY2YTU5N2EzY2Q1YTFhZTdmNDQwMTc1OTcxZjJjZjVjYzAwY2EwZmU3M2Y4ZTkzNmQ1ZjQwMzRhMTEwOGUyZDBhODgzODUiLCJpYXQiOjE3MzcyNTUxMTYsIm5iZiI6MTczNzI1NTExNiwiZXhwIjoxNzY4NzkxMTE2LCJzdWIiOiIyNDE0MyIsInNjb3BlcyI6W119.KXAXcipt7yl6IB2IH1Zr-_AsCGYjR3uqAct0MUWnxu3kxK7EsSNbAlXD63aQ-DkMoyPIDiGiJVNWWpL08mfo0A";

// Utility to validate non-empty strings
const validateString = (str, fieldName) => {
  if (typeof str !== "string" || str.trim() === "") {
    throw new Error(`Invalid or missing value for ${fieldName}`);
  }
};

// Utility to validate date format (YYYY-MM-DD)
const validateDate = (dateStr, fieldName) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error(`Invalid or missing date for ${fieldName}: ${dateStr}`);
  }
};

// Retrieve Airports
export const retrieveAirports = async (query) => {
  validateString(query, "query");

  try {
    const response = await axios.get(
      `https://www.goflightlabs.com/retrieveAirport`,
      {
        params: { access_key: API_ACCESS_KEY, query },
      }
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("No airport data found for the query");
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error fetching airports for query "${query}":`,
      error.message
    );
    throw new Error("Unable to retrieve airport data. Please try again later.");
  }
};

// Search Flights
export const searchFlightsFlightGO = async ({
  originSkyId,
  destinationSkyId,
  departureDate,
  returnDate = null,
  adults = 1,
  cabinClass = "economy",
  children = 0,
  infants = 0,
  currency = "USD",
  market = "en-US",
  countryCode = "US",
  sortBy = "best",
}) => {
  // Validate required parameters
  validateString(originSkyId, "originSkyId");
  validateString(destinationSkyId, "destinationSkyId");
  validateDate(departureDate, "departureDate");
  if (returnDate) validateDate(returnDate, "returnDate");

  if (!Number.isInteger(adults) || adults <= 0) {
    throw new Error("Adults must be a positive integer");
  }

  if (!Number.isInteger(children) || children < 0) {
    throw new Error("Children must be a non-negative integer");
  }

  if (!Number.isInteger(infants) || infants < 0) {
    throw new Error("Infants must be a non-negative integer");
  }

  if (
    !["economy", "premium_economy", "business", "first"].includes(
      cabinClass.toLowerCase()
    )
  ) {
    throw new Error(`Invalid cabin class: ${cabinClass}`);
  }

  if (
    ![
      "best",
      "price_high",
      "fastest",
      "outbound_take_off_time",
      "outbound_landing_time",
      "return_take_off_time",
      "return_landing_time",
    ].includes(sortBy)
  ) {
    throw new Error(`Invalid sortBy value: ${sortBy}`);
  }

  try {
    // Fetch airport data to get entity IDs
    const [originAirport] = await retrieveAirports(originSkyId);
    const [destinationAirport] = await retrieveAirports(destinationSkyId);

    if (!originAirport?.entityId || !destinationAirport?.entityId) {
      throw new Error(
        "Entity IDs could not be resolved for the given airports"
      );
    }

    // Create params object
    const params = {
      originSkyId: originSkyId,
      destinationSkyId: destinationSkyId,
      date: departureDate,
      adults,
      cabinClass: cabinClass.toLowerCase() || "economy",
      children,
      infants,
      currency,
      market,
      countryCode,
      sortBy,
    };

    // Add returnDate only if provided
    if (returnDate) {
      params.returnDate = returnDate;
    }

    const response = await axios.get(
      `https://www.goflightlabs.com/retrieveFlights`,
      {
        params: {
          access_key: API_ACCESS_KEY,
          ...params,
          originEntityId: originAirport.entityId,
          destinationEntityId: destinationAirport.entityId,
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("No flights found for the given criteria");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching flight data:", error.message);
    throw new Error("Unable to fetch flight data. Please try again later.");
  }
};
