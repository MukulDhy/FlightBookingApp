// src/services/emailService.js

import emailjs from "@emailjs/browser";

export const sendEmail = (flightInfo, recipientEmail) => {
  // Format the email template with flight information
  const emailTemplate = `
    <h2>Flight Information</h2>
    <h3>Airline: ${flightInfo.flightInfo.airlineName}</h3>
    <h4>Flight Details:</h4>
    <p><strong>Flight Number:</strong> ${flightInfo.flightInfo.flightNumber}</p>
    <p><strong>Aircraft:</strong> ${flightInfo.flightInfo.aircraft}</p>
    <p><strong>Operated By:</strong> ${flightInfo.flightInfo.operatedBy}</p>
    <p><strong>Class:</strong> ${flightInfo.flightInfo.class}</p>
    <p><strong>Baggage:</strong> ${flightInfo.flightInfo.baggage}</p>
    <p><strong>Check-In Baggage:</strong> ${flightInfo.flightInfo.checkIn}</p>
    <p><strong>Cabin Baggage:</strong> ${flightInfo.flightInfo.cabin}</p>

    
    <h4>Notes:</h4>
    `;

    // <ul>
    //   ${flightInfo.notes.map((note) => `<li>${note}</li>`).join("")}
    // </ul>
    
  // Define templateParams with the recipient's email and the message (formatted with flightInfo)
  const templateParams = {
    to_email: recipientEmail, // Recipient's email address
    message: emailTemplate, // Formatted message with dynamic data
  };

  // Service ID
  // service_dpx7jph

  emailjs
    .send(
      "service_dpx7jph",
      "template_1qi4cob",
      templateParams,
      "5eC-dmfVbyr9ziC0E"
    )
    .then((response) => {
      console.log("Email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};


{/* <h4>Departure:</h4>
    <p><strong>Airport:</strong> ${flightInfo.departure.airportName}</p>
    <p><strong>City:</strong> ${flightInfo.departure.city}</p>
    <p><strong>Terminal:</strong> ${flightInfo.departure.terminal}</p>
    <p><strong>Code:</strong> ${flightInfo.departure.code}</p>
    <p><strong>Date:</strong> ${flightInfo.departure.date}</p>
    <p><strong>Time:</strong> ${flightInfo.departure.time}</p>

    <h4>Arrival:</h4>
    <p><strong>Airport:</strong> ${flightInfo.arrival.airportName}</p>
    <p><strong>City:</strong> ${flightInfo.arrival.city}</p>
    <p><strong>Code:</strong> ${flightInfo.arrival.code}</p>
    <p><strong>Date:</strong> ${flightInfo.arrival.date}</p>
    <p><strong>Time:</strong> ${flightInfo.arrival.time}</p>

    <h4>Fare Summary:</h4>
    <p><strong>Base Fare:</strong> ${flightInfo.fareSummary.baseFare}</p>
    <p><strong>Taxes and Fees:</strong> ${
      flightInfo.fareSummary.taxesAndFees
    }</p>
    <p><strong>Total Fare:</strong> ${flightInfo.fareSummary.total}</p> */}
