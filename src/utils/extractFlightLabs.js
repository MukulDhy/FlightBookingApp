// _id: itinerary.id || null,
// airlineLogo:
//   itinerary.legs[0]?.carriers?.marketing?.[0]?.logoUrl || null,
// airlineName: itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
// passengerType: "Adult",
// stopType: stopType, // Non-stop or With Stops
// refundableStatus: null,
// flightInfo: {
//   flightNumber: `${firstSegment.flightNumber || ""}`,
//   aircraft: "Airbus A320 or Boeing 737",
//   operatedBy: firstSegment.operatingCarrier?.name || null,
//   class: classType || null,
//   baggage: "26 Kg(s)", // Add baggage logic if available
//   checkIn: "26 Kg(s)",
//   cabin: "7 Kg(s)",
// },
// cancellationRules: [
//   {
//     rule: "Maximum penalty amount",
//     amountPerKm: 50,
//   },
// ],
// dateChangeRules: [
//   {
//     rule: "Maximum penalty amount",
//     amountPerKm: 30,
//   },
// ],
// notes: [
//   "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
//   "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
// ],
// duration: itinerary.legs.reduce((sum, leg) => {
//   if (!leg.durationInMinutes) {
//     return sum; // Skip if duration is missing
//   }
//   return sum + leg.durationInMinutes;
// }, 0),
// availableSeats: {
//   flightId: itinerary.id || null,
//   totalSeat: totalSeats?.toString() || (112).toString() || null,
//   available: totalSeats?.toString() || (64).toString() || null,
// },
// departure: {
//   code: firstSegment.origin?.displayCode || null,
//   time: new Date(firstSegment.departure || "").toLocaleTimeString(
//     "en-US",
//     {
//       hour: "2-digit",
//       minute: "2-digit",
//     }
//   ),
//   date: firstSegment.departure?.split("T")[0] || null,
//   airlineName:
//     itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
//   city: cityDepartureName || null,
//   terminal:
//     firstSegment.origin?.terminal ||
//     firstSegment.origin?.name ||
//     "Notify through mail.",
//   airportName: airportDestinationName || null,
//   seats: 112,
// },
// arrival: {
//   code: lastSegment.destination?.displayCode || null,
//   time: new Date(lastSegment.arrival || "").toLocaleTimeString(
//     "en-US",
//     {
//       hour: "2-digit",
//       minute: "2-digit",
//     }
//   ),
//   date: lastSegment.arrival?.split("T")[0] || null,
//   city: cityArrivalName || null,
//   airlineName:
//     itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
//   terminal:
//     lastSegment.destination?.terminal || "Notify through mail." || null,
//   airportName: airportArrivalName || null,
// },
// fareSummary: {
//   baseFare: price.raw || null,
//   taxesAndFees:
//     price.fees?.reduce((sum, fee) => sum + parseFloat(fee.amount), 0) ||
//     null,
//   total: price.formatted || null,
// },
// stopPageInfo: extractDetails(stopageInfo),
// totalStop: stop,
// // _id: itinerary.id || null,
// goingFlight: {
//   _id: itinerary.id || null,
//   airlineLogo:
//     itinerary.legs[0]?.carriers?.marketing?.[0]?.logoUrl || null,
//   airlineName:
//     itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
//   passengerType: "Adult",
//   stopType: stopType, // Non-stop or With Stops
//   refundableStatus: null,
//   totalDuration: goingFlightInfo.durationInMinutes,
//   stopCount: goingFlightInfo.stopCount,
//   flightInfo: {
//     flightNumber: `${goingFlightStopage[0].flightNumber || ""}`,
//     aircraft: "Airbus A320 or Boeing 737",
//     operatedBy: goingFlightStopage[0].operatingCarrier?.name || null,
//     class: classType || null,
//     baggage: "26 Kg(s)", // Add baggage logic if available
//     checkIn: "26 Kg(s)",
//     cabin: "7 Kg(s)",
//   },
//   cancellationRules: [
//     {
//       rule: "Maximum penalty amount",
//       amountPerKm: 50,
//     },
//   ],
//   dateChangeRules: [
//     {
//       rule: "Maximum penalty amount",
//       amountPerKm: 30,
//     },
//   ],
//   notes: [
//     "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
//     "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
//   ],
//   duration: itinerary.legs.reduce((sum, leg) => {
//     if (!leg.durationInMinutes) {
//       return sum; // Skip if duration is missing
//     }
//     return sum + leg.durationInMinutes;
//   }, 0),
//   availableSeats: {
//     flightId: itinerary.id || null,
//     totalSeat: totalSeats?.toString() || (112).toString() || null,
//     available: totalSeats?.toString() || (64).toString() || null,
//   },
//   departure: {
//     code: goingFlightStopage[0].origin?.displayCode || null,
//     time: new Date(
//       goingFlightStopage[0].departure || ""
//     ).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//     date: goingFlightStopage[0].departure?.split("T")[0] || null,
//     airlineName:
//       itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
//     city: goingFlightStopage[0].origin.parent.name || null,
//     terminal:
//       goingFlightStopage[0].origin?.terminal ||
//       goingFlightStopage[0].origin?.name ||
//       "Notify through mail.",
//     airportName: goingFlightStopage[0].origin.name || null,
//     seats: 112,
//   },
//   arrival: {
//     code: lastSegment.destination?.displayCode || null,
//     time: new Date(lastSegment.arrival || "").toLocaleTimeString(
//       "en-US",
//       {
//         hour: "2-digit",
//         minute: "2-digit",
//       }
//     ),
//     date: lastSegment.arrival?.split("T")[0] || null,
//     city: cityArrivalName || null,
//     airlineName:
//       itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
//     terminal:
//       lastSegment.destination?.terminal ||
//       "Notify through mail." ||
//       null,
//     airportName: airportArrivalName || null,
//   },
//   fareSummary: {
//     baseFare: price.raw || null,
//     taxesAndFees:
//       price.fees?.reduce(
//         (sum, fee) => sum + parseFloat(fee.amount),
//         0
//       ) || null,
//     total: price.formatted || null,
//   },
//   stopageInfo: extractDetails(goingFlightStopage),
// },
// returnFlight: {
//   _id: itinerary.id || null,
//   airlineLogo:
//     itinerary.legs[1]?.carriers?.marketing?.[0]?.logoUrl || null,
//   airlineName:
//     itinerary.legs[1]?.carriers?.marketing?.[0]?.name || null,
//   passengerType: "Adult",

//   stopType: stopType, // Non-stop or With Stops
//   refundableStatus: null,
//   totalDuration: comingFlightInfo.durationInMinutes,
//   stopCount: comingFlightInfo.stopCount,
//   flightInfo: {
//     flightNumber: `${comingFlightStopage[0].flightNumber || ""}`,
//     aircraft: "Airbus A320 or Boeing 737",
//     operatedBy: comingFlightStopage[0].operatingCarrier?.name || null,
//     class: classType || null,
//     baggage: "26 Kg(s)", // Add baggage logic if available
//     checkIn: "26 Kg(s)",
//     cabin: "7 Kg(s)",
//   },
//   cancellationRules: [
//     {
//       rule: "Maximum penalty amount",
//       amountPerKm: 50,
//     },
//   ],
//   dateChangeRules: [
//     {
//       rule: "Maximum penalty amount",
//       amountPerKm: 30,
//     },
//   ],
//   notes: [
//     "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
//     "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
//   ],
//   duration: itinerary.legs.reduce((sum, leg) => {
//     if (!leg.durationInMinutes) {
//       return sum; // Skip if duration is missing
//     }
//     return sum + leg.durationInMinutes;
//   }, 0),
//   availableSeats: {
//     flightId: itinerary.id || null,
//     totalSeat: totalSeats?.toString() || (112).toString() || null,
//     available: totalSeats?.toString() || (64).toString() || null,
//   },
//   departure: {
//     code: comingFlightStopage[0].origin?.displayCode || null,
//     time: new Date(
//       comingFlightStopage[0].departure || ""
//     ).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//     date: comingFlightStopage[0].departure?.split("T")[0] || null,
//     airlineName:
//       itinerary.legs[1]?.carriers?.marketing?.[0]?.name || null,
//     city: comingFlightStopage[0].origin.parent.name || null,
//     terminal:
//       firstSegment.origin?.terminal ||
//       firstSegment.origin?.name ||
//       "Notify through mail.",
//     airportName: comingFlightStopage[0].origin.name || null,
//     seats: 112,
//   },
//   arrival: {
//     code:
//       comingFlightStopage[comingFlightStopage.length - 1].destination
//         ?.displayCode || null,
//     time: new Date(
//       comingFlightStopage[comingFlightStopage.length - 1].arrival || ""
//     ).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//     date:
//       comingFlightStopage[
//         comingFlightStopage.length - 1
//       ].arrival?.split("T")[0] || null,
//     city:
//       comingFlightStopage[comingFlightStopage.length - 1].origin.parent
//         .name || null,
//     airlineName:
//       itinerary.legs[1]?.carriers?.marketing?.[0]?.name || null,
//     terminal:
//       lastSegment.destination?.terminal ||
//       "Notify through mail." ||
//       null,
//     airportName:
//       comingFlightStopage[comingFlightStopage.length - 1].destination
//         .name || null,
//   },
//   fareSummary: {
//     baseFare: price.raw || null,
//     taxesAndFees:
//       price.fees?.reduce(
//         (sum, fee) => sum + parseFloat(fee.amount),
//         0
//       ) || null,
//     total: price.formatted || null,
//   },
// },

const extractDetails = (stopageInfo) => {
  const extractedData = stopageInfo.map((segment) => ({
    flightId: segment.id,
    origin: {
      name: segment.origin.name,
      country: segment.origin.country,
    },
    destination: {
      name: segment.destination.name,
      country: segment.destination.country,
    },
    departure: segment.departure,
    arrival: segment.arrival,
    flightNumber: segment.flightNumber,
    duration: segment.durationInMinutes,
  }));
  return extractedData;
};

export const extractFlightInfoFlightGo = (
  apiResponse,
  classType,
  cityDepartureName,
  cityArrivalName,
  airportDestinationName,
  airportArrivalName,
  flightType
) => {
  const flights = apiResponse.itineraries.map((itinerary) => {
    const firstSegment = itinerary.legs[0]?.segments[0] || {};
    const lastSegment =
      itinerary.legs[itinerary.legs.length - 1]?.segments.slice(-1)[0] || {};
    const price = itinerary.price || {};
    const totalSeats = itinerary.numberOfBookableSeats || null;

    // const firstFlight = itinerary.legs[0];
    // const secondFlight = itinerary.legs[1];

    // Check if the flight is non-stop or has stops
    const stopType = itinerary.legs.some((leg) => leg.stopCount > 0)
      ? "With Stops"
      : "Non-stop";

    const stopageInfo = itinerary.legs[0]?.segments;
    const stop = stopageInfo.length - 1;

    // console.log("PAPA = ", flightType);

    if (flightType === "oneway") {
      // console.log("dfgfggrtgrgrtg");

      return {
        _id: itinerary.id || null,
        airlineLogo:
          itinerary.legs[0]?.carriers?.marketing?.[0]?.logoUrl || null,
        airlineName: itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
        passengerType: "Adult",
        stopType: stopType, // Non-stop or With Stops
        refundableStatus: null,
        stopPageInfo: extractDetails(stopageInfo) || "No Stopage Info",
        totalStop: stop,
        flightInfo: {
          flightNumber: `${firstSegment.flightNumber || ""}`,
          aircraft: "Airbus A320 or Boeing 737",
          operatedBy: firstSegment.operatingCarrier?.name || null,
          class: classType || null,
          baggage: "26 Kg(s)", // Add baggage logic if available
          checkIn: "26 Kg(s)",
          cabin: "7 Kg(s)",
        },
        cancellationRules: [
          {
            rule: "Maximum penalty amount",
            amountPerKm: 50,
          },
        ],
        dateChangeRules: [
          {
            rule: "Maximum penalty amount",
            amountPerKm: 30,
          },
        ],
        notes: [
          "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
          "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
        ],
        duration: itinerary.legs.reduce((sum, leg) => {
          if (!leg.durationInMinutes) {
            return sum; // Skip if duration is missing
          }
          return sum + leg.durationInMinutes;
        }, 0),
        availableSeats: {
          flightId: itinerary.id || null,
          totalSeat: totalSeats?.toString() || (112).toString() || null,
          available: totalSeats?.toString() || (64).toString() || null,
        },
        departure: {
          code: firstSegment.origin?.displayCode || null,
          time: new Date(firstSegment.departure || "").toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          date: firstSegment.departure?.split("T")[0] || null,
          airlineName:
            itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
          city: cityDepartureName || null,
          terminal:
            firstSegment.origin?.terminal ||
            firstSegment.origin?.name ||
            "Notify through mail.",
          airportName: airportDestinationName || null,
          seats: 112,
        },
        arrival: {
          code: lastSegment.destination?.displayCode || null,
          time: new Date(lastSegment.arrival || "").toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          date: lastSegment.arrival?.split("T")[0] || null,
          city: cityArrivalName || null,
          airlineName:
            itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
          terminal:
            lastSegment.destination?.terminal || "Notify through mail." || null,
          airportName: airportArrivalName || null,
        },
        fareSummary: {
          baseFare: price.raw || null,
          taxesAndFees:
            price.fees?.reduce((sum, fee) => sum + parseFloat(fee.amount), 0) ||
            null,
          total: price.formatted || null,
        },
      };
    }

    const goingFlightInfo = itinerary.legs[0] || null;
    const comingFlightInfo = itinerary.legs[1] || null;

    const goingStopageInfo = goingFlightInfo.segments;
    const comingStopageInfo = comingFlightInfo.segments;

    const goingStop = goingStopageInfo.length - 1;
    const comingStop = comingStopageInfo.length - 1;

    if (flightType === "roundtrip" && goingFlightInfo && comingFlightInfo) {
      return {
        _id: itinerary.id || null,
        airlineLogo:
          itinerary.legs[0]?.carriers?.marketing?.[0]?.logoUrl || null,
        airlineName: itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
        passengerType: "Adult",
        stopType: stopType, // Non-stop or With Stops
        refundableStatus: null,
        // totalStop:
        flightInfo: {
          flightNumber: `${firstSegment.flightNumber || ""}`,
          aircraft: "Airbus A320 or Boeing 737",
          operatedBy: firstSegment.operatingCarrier?.name || null,
          class: classType || null,
          baggage: "26 Kg(s)", // Add baggage logic if available
          checkIn: "26 Kg(s)",
          cabin: "7 Kg(s)",
        },
        cancellationRules: [
          {
            rule: "Maximum penalty amount",
            amountPerKm: 50,
          },
        ],
        dateChangeRules: [
          {
            rule: "Maximum penalty amount",
            amountPerKm: 30,
          },
        ],
        notes: [
          "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
          "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
        ],
        duration: itinerary.legs.reduce((sum, leg) => {
          if (!leg.durationInMinutes) {
            return sum; // Skip if duration is missing
          }
          return sum + leg.durationInMinutes;
        }, 0),
        availableSeats: {
          flightId: itinerary.id || null,
          totalSeat: totalSeats?.toString() || (112).toString() || null,
          available: totalSeats?.toString() || (64).toString() || null,
        },
        departure: {
          code: firstSegment.origin?.displayCode || null,
          time: new Date(firstSegment.departure || "").toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          date: firstSegment.departure?.split("T")[0] || null,
          airlineName:
            itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
          city: cityDepartureName || null,
          terminal:
            firstSegment.origin?.terminal ||
            firstSegment.origin?.name ||
            "Notify through mail.",
          airportName: airportDestinationName || null,
          seats: 112,
        },
        arrival: {
          code: lastSegment.destination?.displayCode || null,
          time: new Date(lastSegment.arrival || "").toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          date: lastSegment.arrival?.split("T")[0] || null,
          city: cityArrivalName || null,
          airlineName:
            itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
          terminal:
            lastSegment.destination?.terminal || "Notify through mail." || null,
          airportName: airportArrivalName || null,
        },
        fareSummary: {
          baseFare: price.raw || null,
          taxesAndFees:
            price.fees?.reduce((sum, fee) => sum + parseFloat(fee.amount), 0) ||
            null,
          total: price.formatted || null,
        },
        stopPageInfo: extractDetails(stopageInfo),
        goingFlight: {
          _id: itinerary.id || null,
          airlineLogo:
            goingFlightInfo?.carriers?.marketing?.[0]?.logoUrl || null,
          airlineName: goingFlightInfo?.carriers?.marketing?.[0]?.name || null,
          passengerType: "Adult",
          stopType: goingFlightInfo.stopCount === 0 ? "Non-stop" : "With Stops", // Non-stop or With Stops
          refundableStatus: null,
          totalStop: goingFlightInfo.stopCount,
          totalDuration: goingFlightInfo.durationInMinutes,
          stopCount: goingFlightInfo.stopCount,
          flightInfo: {
            flightNumber: `${goingStopageInfo[0].flightNumber || ""}`,
            aircraft: "Airbus A320 or Boeing 737",
            operatedBy: goingStopageInfo[0].operatingCarrier?.name || null,
            class: classType || null,
            baggage: "26 Kg(s)", // Add baggage logic if available
            checkIn: "26 Kg(s)",
            cabin: "7 Kg(s)",
          },
          cancellationRules: [
            {
              rule: "Maximum penalty amount",
              amountPerKm: 50,
            },
          ],
          dateChangeRules: [
            {
              rule: "Maximum penalty amount",
              amountPerKm: 30,
            },
          ],
          notes: [
            "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
            "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
          ],
          duration: goingFlightInfo?.durationInMinutes,
          availableSeats: {
            flightId: itinerary.id || null,
            totalSeat: totalSeats?.toString() || (112).toString() || null,
            available: totalSeats?.toString() || (64).toString() || null,
          },
          departure: {
            code: goingFlightInfo?.origin?.displayCode || null,
            time: new Date(goingFlightInfo?.departure || "").toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            date: goingFlightInfo?.departure?.split("T")[0] || null,
            airlineName:
              itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
            city: goingFlightInfo?.origin.city || null,
            terminal:
              goingStopageInfo[0].origin?.terminal || "Notify through mail.",
            airportName: goingFlightInfo?.origin.name || null,
            seats: 112,
          },
          arrival: {
            code: goingFlightInfo?.destination?.displayCode || null,
            time: new Date(goingFlightInfo?.arrival || "").toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            date: goingFlightInfo?.arrival?.split("T")[0] || null,
            city: goingFlightInfo?.destination.city || null,
            airlineName:
              itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
            terminal:
              goingStopageInfo[0].destination?.terminal ||
              "Notify through mail." ||
              null,
            airportName: goingFlightInfo?.destination.name || null,
          },
          fareSummary: {
            baseFare: price.raw || null,
            taxesAndFees:
              price.fees?.reduce(
                (sum, fee) => sum + parseFloat(fee.amount),
                0
              ) || null,
            total: price.formatted || null,
          },
          stopageInfo: extractDetails(goingStopageInfo),
        },

        returnFlight: {
          _id: itinerary.id || null,
          airlineLogo:
            comingFlightInfo?.carriers?.marketing?.[0]?.logoUrl || null,
          airlineName: comingFlightInfo?.carriers?.marketing?.[0]?.name || null,
          passengerType: "Adult",
          stopType:
            comingFlightInfo.stopCount === 0 ? "Non-stop" : "With Stops", // Non-stop or With Stops
          refundableStatus: null,
          totalDuration: comingFlightInfo.durationInMinutes,
          stopCount: comingFlightInfo.stopCount,
          totalStop: comingFlightInfo.stopCount,
          flightInfo: {
            flightNumber: `${comingStopageInfo[0].flightNumber || ""}`,
            aircraft: "Airbus A320 or Boeing 737",
            operatedBy: comingStopageInfo[0].operatingCarrier?.name || null,
            class: classType || null,
            baggage: "26 Kg(s)", // Add baggage logic if available
            checkIn: "26 Kg(s)",
            cabin: "7 Kg(s)",
          },
          cancellationRules: [
            {
              rule: "Maximum penalty amount",
              amountPerKm: 50,
            },
          ],
          dateChangeRules: [
            {
              rule: "Maximum penalty amount",
              amountPerKm: 30,
            },
          ],
          notes: [
            "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
            "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
          ],
          duration: comingFlightInfo?.durationInMinutes,
          availableSeats: {
            flightId: itinerary.id || null,
            totalSeat: totalSeats?.toString() || (118).toString() || null,
            available: totalSeats?.toString() || (94).toString() || null,
          },
          departure: {
            code: comingFlightInfo?.origin?.displayCode || null,
            time: new Date(
              comingFlightInfo?.departure || ""
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: comingFlightInfo?.departure?.split("T")[0] || null,
            airlineName:
              itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
            city: comingFlightInfo?.origin.city || null,
            terminal:
              comingStopageInfo[0].origin?.terminal || "Notify through mail.",
            airportName: comingFlightInfo?.origin.name || null,
            seats: 112,
          },
          arrival: {
            code: comingFlightInfo?.destination?.displayCode || null,
            time: new Date(comingFlightInfo?.arrival || "").toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            date: comingFlightInfo?.arrival?.split("T")[0] || null,
            city: comingFlightInfo?.destination.city || null,
            airlineName:
              itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
            terminal:
              comingStopageInfo[0].destination?.terminal ||
              "Notify through mail." ||
              null,
            airportName: comingFlightInfo?.destination.name || null,
          },
          fareSummary: {
            baseFare: price.raw || null,
            taxesAndFees:
              price.fees?.reduce(
                (sum, fee) => sum + parseFloat(fee.amount),
                0
              ) || null,
            total: price.formatted || null,
          },
          stopageInfo: extractDetails(comingStopageInfo),
        },
      };
    }

    return {
      _id: itinerary.id || null,
      airlineLogo: itinerary.legs[0]?.carriers?.marketing?.[0]?.logoUrl || null,
      airlineName: itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
      passengerType: "Adult",

      stopType: stopType, // Non-stop or With Stops
      refundableStatus: null,
      flightInfo: {
        flightNumber: `${firstSegment.flightNumber || ""}`,
        aircraft: "Airbus A320 or Boeing 737",
        operatedBy: firstSegment.operatingCarrier?.name || null,
        class: classType || null,
        baggage: "26 Kg(s)", // Add baggage logic if available
        checkIn: "26 Kg(s)",
        cabin: "7 Kg(s)",
      },
      cancellationRules: [
        {
          rule: "Maximum penalty amount",
          amountPerKm: 50,
        },
      ],
      dateChangeRules: [
        {
          rule: "Maximum penalty amount",
          amountPerKm: 30,
        },
      ],
      notes: [
        "*Note For Voluntary Cancellation: Service fees & gateway charges will be additionally applied on top of penalty amount. Some taxes may not be refundable",
        "*Note For Date Change: Service Fees, Fare difference and Tax difference will be additionally applied on top of penalty amount which is nonrefundable in any circumstances.",
      ],
      duration: itinerary.legs.reduce((sum, leg) => {
        if (!leg.durationInMinutes) {
          return sum; // Skip if duration is missing
        }
        return sum + leg.durationInMinutes;
      }, 0),
      availableSeats: {
        flightId: itinerary.id || null,
        totalSeat: totalSeats?.toString() || (112).toString() || null,
        available: totalSeats?.toString() || (64).toString() || null,
      },
      departure: {
        code: firstSegment.origin?.displayCode || null,
        time: new Date(firstSegment.departure || "").toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        date: firstSegment.departure?.split("T")[0] || null,
        airlineName: itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
        city: cityDepartureName || null,
        terminal:
          firstSegment.origin?.terminal ||
          firstSegment.origin?.name ||
          "Notify through mail.",
        airportName: airportDestinationName || null,
        seats: 112,
      },
      arrival: {
        code: lastSegment.destination?.displayCode || null,
        time: new Date(lastSegment.arrival || "").toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: lastSegment.arrival?.split("T")[0] || null,
        city: cityArrivalName || null,
        airlineName: itinerary.legs[0]?.carriers?.marketing?.[0]?.name || null,
        terminal:
          lastSegment.destination?.terminal || "Notify through mail." || null,
        airportName: airportArrivalName || null,
      },
      fareSummary: {
        baseFare: price.raw || null,
        taxesAndFees:
          price.fees?.reduce((sum, fee) => sum + parseFloat(fee.amount), 0) ||
          null,
        total: price.formatted || null,
      },
    };
  });

  return flights;
};
