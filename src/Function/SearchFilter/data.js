export const extractFlightInfo = (
  apiResponse,
  airlineLogo,
  classType,
  cityDepartureName,
  cityArrivalName,
  airportDestinationName,
  airportArivalName
) => {
  const flights = apiResponse.data.map((flight) => {
    const firstSegment = flight.itineraries[0]?.segments[0] || {};
    const lastSegment =
      flight.itineraries[flight.itineraries.length - 1]?.segments.slice(
        -1
      )[0] || {};
    const price = flight.price || {};
    const totalSeats = flight.numberOfBookableSeats || null;

    return {
      _id: flight.id || null,
      airlineLogo: airlineLogo || null, // Add logic for fetching the airline logo URL if available
      airlineName: flight.validatingAirlineCodes?.[0] || null,
      passengerType: "Adult", // Hardcoded as this info is not in the API response
      stopType: flight.itineraries.some(
        (itinerary) => itinerary.segments.length > 1
      )
        ? "With Stops"
        : "Non-stop",
      refundableStatus: null, // Add logic if refundable status is present in response
      flightInfo: {
        flightNumber: `${firstSegment.carrierCode || ""} | ${
          firstSegment.number || ""
        }`,
        aircraft: firstSegment.aircraft?.code || null,
        operatedBy: firstSegment.operating?.carrierCode || null,
        class: classType || null, // Add logic if class info is available in response
        baggage: "26 Kg(s)", // Add baggage logic if available
        checkIn: "26 Kg(s)",
        cabin: "7 Kg(s)",
      },
      cancellationRules: [
        {
          rule: "Maximum penalty amount",
          amountPerKm: 50,
        },
      ], // Add cancellation rules if available in response
      dateChangeRules: [
        {
          rule: "Maximum penalty amount",
          amountPerKm: 30,
        },
      ], // Add date change rules if available in response
      notes: [
        '*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable","*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.',
      ], // Add any specific notes if available in response
      duration: flight.itineraries.reduce((sum, itinerary) => {
        const timeMatch = itinerary.duration.match(/PT(\d+)H(\d+)M/);
        return (
          sum + (parseInt(timeMatch[1] || 0) * 60 + parseInt(timeMatch[2] || 0))
        );
      }, 0),
      availableSeats: {
        flightId: flight.id || null,
        totalSeat: totalSeats?.toString() || null,
        available: totalSeats?.toString() || null,
      },
      departure: {
        code: firstSegment.departure?.iataCode || null,
        time: new Date(firstSegment.departure?.at || "").toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        date: firstSegment.departure?.at?.split("T")[0] || null,
        airlineName: flight.validatingAirlineCodes?.[0] || null,
        city: cityDepartureName || null, // Add logic to fetch city if available
        terminal: firstSegment.departure?.terminal || null,
        airportName: airportDestinationName || null, // Add logic to fetch airport name if available
        seats: totalSeats?.toString() || null,
      },
      arrival: {
        code: lastSegment.arrival?.iataCode || null,
        time: new Date(lastSegment.arrival?.at || "").toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        date: lastSegment.arrival?.at?.split("T")[0] || null,
        city: cityArrivalName || null, // Add logic to fetch city if available
        airlineName: flight.validatingAirlineCodes?.[0] || null, // Add logic if airline name is available
        terminal: lastSegment.arrival?.terminal || null,
        airportName: airportArivalName || null, // Add logic to fetch airport name if available
      },
      fareSummary: {
        baseFare: price.base || null,
        taxesAndFees:
          price.fees?.reduce((sum, fee) => sum + parseFloat(fee.amount), 0) ||
          null,
        total: price.grandTotal || null,
      },
    };
  });

  return flights;
};

// Example API response
const apiResponse = {
  data: [
    // Add API response data here for testing
  ],
};

console.log(extractFlightInfo(apiResponse));
