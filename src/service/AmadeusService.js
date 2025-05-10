import axios from "axios";

const CLIENT_ID = "mUKtxfVHGQzDkMAPraYascXGyPHKxUIT";
const CLIENT_SECRET = "0AribkbzknlgA6Jy";

// Get Access Token from Amadeus API
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Unable to fetch access token");
  }
};

// Search Flights
export const searchFlights = async ({
  origin,
  destination,
  departureDate,
  returnDate,
  adults,
  //   children,
  travelClass,
}) => {
  try {
    const accessToken = await getAccessToken();

    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: adults,
      travelClass: travelClass || "ECONOMY",
    };

    if (returnDate) params.returnDate = returnDate;
    // if (children > 0) params.children = children;

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching flights:", error);
    throw new Error("Unable to fetch flight data");
  }
};
