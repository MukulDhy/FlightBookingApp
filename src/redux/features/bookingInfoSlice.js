import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightInfo: {},
  userInfo: {},
  allBookings: [],
  searchFilter: {},
  cancelRequests: [],
  airlines: [],
  selectedCard: null,
  bookingsRefetch: false,
};

export const bookingInfoSlice = createSlice({
  name: "userBookingInfo",
  initialState,
  reducers: {
    setFlightInfo: (state, action) => {
      state.flightInfo = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAllBookings: (state, action) => {
      state.allBookings = action.payload;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    setCancelRequests: (state, action) => {
      state.cancelRequests = action.payload;
    },
    setAirlines: (state, action) => {
      state.airlines = action.payload;
    },
    setBookingsRefetch: (state, action) => {
      state.bookingsRefetch = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload; // Handle setting search filter
    },
    updateSearchFilter: (state, action) => {
      state.searchFilter = { ...state.searchFilter, ...action.payload }; // Update search filter
    },
  },
});

export const {
  setFlightInfo,
  setUserInfo,
  setAllBookings,
  setCancelRequests,
  setBookingsRefetch,
  setAirlines,
  setSelectedCard,
  setSearchFilter,
  updateSearchFilter,
} = bookingInfoSlice.actions;
export default bookingInfoSlice.reducer;
