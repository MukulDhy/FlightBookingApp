import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flightsSlice";
import globalReducer from "../features/globalSlice";
import searchFilterReducer from "../features/searchFilterSlice";
import bookingInfoReducer from "../features/bookingInfoSlice";
import usersReducer from "../features/usersSlice";
import ticketHistorySlice from "../features/ticketHistorySlice";
import trackingNavigationReducer from "../features/trakingNavigationSlice";
import bookTicketReducer from "../features/bookTicketSlice";
import addFlightReducer from "../features/addFlightSlice";
import insuranceReducer from "../features/insuranceSlice";
import services from "../features/servicesSlice";
import manageFlightReducer from "../features/manageFlightSlice";
import traveLoveReducer from "../features/finalFlightSlice";

export const store = configureStore({
  reducer: {
    traveState: traveLoveReducer,
    flights: flightsReducer,
    global: globalReducer,
    searchFilter: searchFilterReducer,
    userBookingInfo: bookingInfoReducer,
    insurance: insuranceReducer,
    userInfo: usersReducer,
    booking: ticketHistorySlice,
    trackingNavigation: trackingNavigationReducer,
    bookTicket: bookTicketReducer,
    addFlight: addFlightReducer,
    ourServices: services,
    manageFlight: manageFlightReducer,
  },
});
