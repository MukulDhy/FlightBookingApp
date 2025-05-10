import React from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file for the calendar
import "react-date-range/dist/theme/default.css"; // Default theme

const CalendarComponent = ({ date, setDate, minDate = new Date() }) => {
  return (
    <div className="calendar-container">
      <Calendar
        rangeColors={["#262626"]} // Customize the calendar's highlight color
        color="#0891B2" // Highlight color for the selected date
        date={date} // Current date displayed
        direction="vertical" // Vertical layout
        showDateDisplay={false} // Hide the date display at the top
        minDate={minDate} // Minimum selectable date
        onChange={(selectedDate) => {
          const validDate = new Date(selectedDate); // Ensure selectedDate is valid
          if (!isNaN(validDate)) {
            setDate(validDate); // Set the selected date
          } else {
            console.error("Invalid date selected", selectedDate);
          }
        }}
        className="w-fit shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md"
      />
    </div>
  );
};

export default CalendarComponent;
