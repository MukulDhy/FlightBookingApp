import { createSlice } from "@reduxjs/toolkit";

// Utility to load from sessionStorage
const loadFromSession = (key, defaultValue) => {
  const storedData = sessionStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

// Utility to save to sessionStorage
const saveToSession = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// Initial State with sessionStorage support
const initialState = {
  searchFilterT: loadFromSession("search_filter_T", {}),
  flightInfoT: loadFromSession("flight_info_T", {}),
  userInfoT: loadFromSession("user_info_T", {}),
  passengerInfoT: loadFromSession("passenger_info_T", []),
  cancelRequestsT: loadFromSession("cancel_requests_T", []),
  airlinesT: loadFromSession("airlines_T", []),
  recipient_email:"",
  fare_summary_t: loadFromSession("fare_summary_T", {}),
  selectedCardT: loadFromSession("selected_card_T", null),
  bookingsRefetchT: loadFromSession("bookings_refetch_T", false),
};

export const traveLoveSlice = createSlice({
  name: "traveLoveSlice",
  initialState,
  reducers: {
    setFlightInfoT: (state, action) => {
      state.flightInfoT = action.payload;
      saveToSession("flight_info_T", state.flightInfoT);
    },
    setUserInfoT: (state, action) => {
      state.userInfoT = action.payload;
      saveToSession("user_info_T", state.userInfoT);
    },
    setSearchFilterT: (state, action) => {
      state.searchFilterT = action.payload;
      saveToSession("search_filter_T", state.searchFilterT);
    },
    setSelectedCardT: (state, action) => {
      state.selectedCardT = action.payload;
      saveToSession("selected_card_T", state.selectedCardT);
    },
    setPassengerInfoT: (state, action) => {
      state.passengerInfoT = action.payload;
      saveToSession("passenger_info_T", state.passengerInfoT);
    },
    setCancelRequestsT: (state, action) => {
      state.cancelRequestsT = action.payload;
      saveToSession("cancel_requests_T", state.cancelRequestsT);
    },
    setAirlinesT: (state, action) => {
      state.airlinesT = action.payload;
      saveToSession("airlines_T", state.airlinesT);
    },
    setBookingsRefetchT: (state, action) => {
      state.bookingsRefetchT = action.payload;
      saveToSession("bookings_refetch_T", state.bookingsRefetchT);
    },
    setRecipientEmail: (state, action) => {
      state.recipient_email = action.payload;
      saveToSession("recipient_email", state.recipient_email);
    },
    setFareSummaryT: (state, action) => {
      state.fare_summary_t = action.payload;
      saveToSession("fare_summary_T", state.fare_summary_t);
    },
  },
});

// Export actions and reducer
export const {
  setFlightInfoT,
  setUserInfoT,
  setSearchFilterT,
  setSelectedCardT,
  setPassengerInfoT,
  setCancelRequestsT,
  setAirlinesT,
  setBookingsRefetchT,
  setRecipientEmail, // New action
  setFareSummaryT, // New action
} = traveLoveSlice.actions;

export default traveLoveSlice.reducer;
