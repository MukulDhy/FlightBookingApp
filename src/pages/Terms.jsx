import React, { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="p-6">
        <div className=" mx-20 bg-white p-6 rounded-lg ">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Terms and Conditions
          </h1>
          <p className="mb-4 text-gray-700">
            These Terms and Conditions (the "Agreement") govern your use of the
            website and services provided by Travelove, which is operated by
            Travelove LLC ("we", "us", or "our"). By accessing and using the
            Travelove platform, you agree to be bound by these Terms and
            Conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            General Information
          </h2>
          <p className="text-gray-700">
            Travelove, operated by Travelove LLC, is a travel service provider
            offering a platform for comparing and booking flight options. Our
            website enables users to compare prices across multiple airlines and
            make bookings. The information provided on the website is intended
            for personal and non-commercial use only.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Booking and Payment Terms
          </h2>
          <h3 className="text-xl font-medium mt-4">Payment Authorization</h3>
          <p className="text-gray-700">
            The prices displayed on our website include all applicable taxes and
            fees unless otherwise specified. Payment authorization is processed
            when you accept these Terms and Conditions and confirm your booking.
          </p>

          <h3 className="text-xl font-medium mt-4">Booking Confirmation</h3>
          <p className="text-gray-700">
            Airfares and travel bookings are only guaranteed once the ticket is
            issued. No payment or booking can be considered final until the
            ticket is issued.
          </p>

          <h3 className="text-xl font-medium mt-4">Refunds and E-Credits</h3>
          <p className="text-gray-700">
            All tickets purchased through Travelove are subject to E-Credit for
            the base fare value in the event of cancellation. Additional fees,
            taxes, or services are non-refundable.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Ticketing and Itinerary
          </h2>
          <h3 className="text-xl font-medium mt-4">
            E-Tickets and Confirmation
          </h3>
          <p className="text-gray-700">
            Once your booking is confirmed, an electronic ticket ("e-ticket")
            will be sent to your email. You must verify the booking details
            immediately upon receipt.
          </p>

          <h3 className="text-xl font-medium mt-4">Name Matching</h3>
          <p className="text-gray-700">
            Traveler names must exactly match the names on the government-issued
            ID. Discrepancies may result in denied boarding and additional
            change fees.
          </p>

          <h3 className="text-xl font-medium mt-4">Changes to Itinerary</h3>
          <p className="text-gray-700">
            Any changes after the e-ticket is issued are subject to airline
            rules, penalties, fare differences, and service fees.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Baggage Policies</h2>
          <h3 className="text-xl font-medium mt-4">Baggage Fees</h3>
          <p className="text-gray-700">
            Prices quoted may not include baggage fees. Contact the airline
            directly for the most up-to-date baggage information.
          </p>

          <h3 className="text-xl font-medium mt-4">Excess Baggage</h3>
          <p className="text-gray-700">
            Additional charges for excess baggage, extra bags, or optional
            services are the traveler's responsibility and are non-refundable.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Cancellations, Changes, and Force Majeure
          </h2>
          <h3 className="text-xl font-medium mt-4">Cancellations</h3>
          <p className="text-gray-700">
            Cancellations after ticket issuance are subject to E-Credits for the
            base fare value. Service fees, taxes, and additional charges are
            non-refundable.
          </p>

          <h3 className="text-xl font-medium mt-4">Force Majeure</h3>
          <p className="text-gray-700">
            Travelove shall not be responsible for any loss, delay, or
            inconvenience due to events beyond our control, such as war,
            terrorism, natural disasters, or technical failures.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Travel Insurance</h2>
          <p className="text-gray-700">
            We strongly recommend obtaining comprehensive travel insurance to
            cover trip cancellations, medical emergencies, baggage loss, and
            other unforeseen circumstances.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Visa and Travel Documentation
          </h2>
          <p className="text-gray-700">
            Travelers are responsible for ensuring they meet visa and entry
            requirements. We recommend consulting the relevant embassy or
            consulate for visa information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
