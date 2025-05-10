import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdRMobiledata,
  MdVerifiedUser,
} from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/features/bookingInfoSlice";
import emailjs from "emailjs-com";
import {
  setRecipientEmail,
  setUserInfoT,
} from "../../../redux/features/finalFlightSlice";

const TravelerDetailsForm = () => {
  // const [isCollapse, setIsCollapse] = useState(true);

  const [countries, setCountries] = useState([]);
  // const [firstInputValue, setFirstInputValue] = useState("");
  // const [secondInputValue, setSecondInputValue] = useState("");
  // const [isSecondInputDisabled, setIsSecondInputDisabled] = useState(true);
  const [isContinue, setContinue] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userBookingInfo.userInfo); // get user information from redux
  const flightInfo = useSelector((state) => state.userBookingInfo.flightInfo); // get flight information from redux
  const totalPassanger = useSelector(
    (state) => state.traveState.searchFilterT.total_passanger
  ); // get flight information from redux
  // const insuranceStatus = useSelector((state) => state.insurance.insurance);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); //for Check box checked State
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [isCollapse, setIsCollapse] = useState(
    Array(totalPassanger).fill(true)
  );

  const [firstInputValue, setFirstInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");
  const [isSecondInputDisabled, setIsSecondInputDisabled] = useState(true);

  const handleFirstInputChange = (event) => {
    const value = event.target.value;
    setFirstInputValue(value);
    setIsSecondInputDisabled(!value); // Enable second input only if first input has a value
  };

  const handleSecondInputChange = (event) => {
    setSecondInputValue(event.target.value);
  };
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track form submission
  const allData = useSelector((state) => state.userBookingInfo);
  const traveData = useSelector((state) => state.traveState);
  const [passengerData, setPassengerData] = useState([]);

  // console.log(passengerData);

  // Handle form submission
  const onSubmit = (data) => {
    // console.log(data);

    setPassengerData((prevData) => {
      const newPassengerData = [];
      for (let i = 1; i < totalPassanger; i++) {
        newPassengerData.push({
          first_name: data[`first_name${i}`],
          last_name: data[`last_name${i}`],
          date_of_birth: data[`date_of_birth${i}`],
        });
      }
      return newPassengerData;
    });

    console.log(passengerData);
    dispatch(setUserInfo(data));
    dispatch(setUserInfoT(data));

    // Once the dispatch completes, trigger the email submission
    dispatch(setRecipientEmail(allData.userInfo.traveler_email));
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  // Wait for state to update before sending email
  useEffect(() => {
    if (isFormSubmitted && allData.userInfo && traveData.userInfoT) {
      handleEmailSubmit(traveData);
      setIsFormSubmitted(false); // Reset after email is sent
    }
  }, [isFormSubmitted, allData, traveData]); // Effect triggers when state updates
  const flightInfoT = useSelector((state) => state.traveState.flightInfoT);
  console.log(flightInfoT);
  const handleEmailSubmit = (traveData) => {
    const { userInfoT, flightInfoT, searchFilterT } = traveData;

    // console.log("Data to be sent in email:");
    // console.log("User Info:", userInfoT);
    // console.log("Flight Info:", flightInfoT);
    // console.log("Search Filter:", searchFilterT);
    // console.log(traveData);
    // Ensure all fields are present
    if (!userInfoT || !flightInfoT || !searchFilterT) {
      console.error("Some data fields are missing! Email will not be sent.");
      return;
    }

    setContinue(true);

    const formattedPassengers = passengerData
      .map(
        (passenger, index) =>
          `Passenger ${index + 1}:\nName: ${passenger.first_name}\nPhone: ${
            passenger.phone_number
          }\nDOB: ${passenger.date_of_birth}\n\n`
      )
      .join("");

    const flightData = flightInfoT;
    const formattedEmailFlight = `
      <h2>Flight Booking Details</h2>
      <img src="${flightData.airlineLogo}" alt="${
      flightData.airlineName
    }" width="100" />
      <p><strong>Airline:</strong> ${flightData.airlineName}</p>
      <p><strong>Passenger Type:</strong> ${flightData.passengerType}</p>
      <p><strong>Stop Type:</strong> ${flightData.stopType}</p>
      <p><strong>Total Stops:</strong> ${flightData.totalStop}</p>
  
      <h3>Flight Itinerary</h3>
      ${flightData.stopPageInfo
        .map(
          (stop, index) => `
        <h4>Segment ${index + 1}</h4>
        <p><strong>Flight Number:</strong> ${stop.flightNumber}</p>
        <p><strong>From:</strong> ${stop.origin.name} (${
            stop.origin.country
          })</p>
        <p><strong>To:</strong> ${stop.destination.name} (${
            stop.destination.country
          })</p>
        <p><strong>Departure:</strong> ${new Date(
          stop.departure
        ).toLocaleString()}</p>
        <p><strong>Arrival:</strong> ${new Date(
          stop.arrival
        ).toLocaleString()}</p>
        <p><strong>Duration:</strong> ${stop.duration} minutes</p>
      `
        )
        .join("")}
  
      <h3>Flight Information</h3>
      <p><strong>Flight Number:</strong> ${
        flightData.flightInfo.flightNumber
      }</p>
      <p><strong>Aircraft:</strong> ${flightData.flightInfo.aircraft}</p>
      <p><strong>Operated By:</strong> ${flightData.flightInfo.operatedBy}</p>
      <p><strong>Class:</strong> ${flightData.flightInfo.class}</p>
      <p><strong>Baggage Allowance:</strong> ${
        flightData.flightInfo.baggage
      }</p>
  
      <h3>Departure & Arrival</h3>
      <p><strong>Departure Airport:</strong> ${
        flightData.departure.airportName
      } (${flightData.departure.city})</p>
      <p><strong>Departure Time:</strong> ${flightData.departure.date} at ${
      flightData.departure.time
    }</p>
      <p><strong>Arrival Airport:</strong> ${flightData.arrival.airportName} (${
      flightData.arrival.city
    })</p>
      <p><strong>Arrival Time:</strong> ${flightData.arrival.date} at ${
      flightData.arrival.time
    }</p>
  
      <h3>Fare Summary</h3>
      <p><strong>Base Fare:</strong> $${flightData.fareSummary.baseFare}</p>
      <p><strong>Total Fare:</strong> ${flightData.fareSummary.total}</p>
  
      <h3>Available Seats</h3>
      <p><strong>Total Seats:</strong> ${
        flightData.availableSeats.totalSeat
      }</p>
      <p><strong>Available Seats:</strong> ${
        flightData.availableSeats.available
      }</p>
    `;
    // console.log(
    //   "Date",
    //   new Date(searchFilterT.departureDate).toLocaleDateString()
    // );
    const templateParams = {
      from_name: `${traveData.userInfoT.first_name} ${traveData.userInfoT.last_name}`,
      to_email: allData.userInfo.traveler_email, // Using dynamic email from state
      flightInfoT: traveData.flightInfoT,
      searchFilterT: traveData.searchFilterT,
      userInfoT: traveData.userInfoT,
      otherPassengers: passengerData,
      message: formattedPassengers,
      flightMessage: formattedEmailFlight,
      basicT: {
        currency_type: "USD",
        totalPassanger: totalPassanger,
        phone_type: "America",
        departureDate: new Date(
          searchFilterT.departureDate
        ).toLocaleDateString(),
        returnDate: new Date(searchFilterT.returnDate).toLocaleDateString(),
      },
    };

    emailjs
      .send(
        "service_dpx7jph",
        "template_xldtloh",
        templateParams,
        "5eC-dmfVbyr9ziC0E"
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.log("Failed to send email:", error);
        }
      );
  };

  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate("/confirm");
  };
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const EditIcon = ({ height, width, color = "black" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill={color}
      >
        <path d="M2 17.25V21h3.75L17.81 8.94l-3.75-3.75L2 17.25zm3 2.09L3.91 18.5 14.06 8.34l1.59 1.59L5 19.34zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L15.13 4.42l3.75 3.75 1.83-1.83z" />
      </svg>
    );
  };

  return (
    <section>
      {isContinue ? (
        <div className=" dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 dark:p-2">
          <div className="flex items-center h-10 justify-between">
            <h2 className="text-xl font-bold mb-4 px-2">Traveler Details</h2>
            <button
              onClick={() => setContinue(false)}
              className="flex gap-1 items-center h-10 text-center py-1 px-4 dark:border-0 md:pt-2 mr-5 btn btn-xs md:btn-sm  bg-cyan-600 text-white rounded-md hover:bg-white hover:border-2 hover:border-cyan-600 hover:text-gray-500"
              disabled={!isContinue}
            >
              <span>Edit</span>
              <EditIcon width={24} height={14} color="black" />
            </button>
          </div>
          <div className="w-full ">
            <div className=" px-5 md:px-10  grid grid-cols-1 md:grid-cols-2">
              <div className="flex justify-start items-start gap-4">
                <div>
                  <p className="mb-3 font-semibold">Name: </p>
                  <p className="mb-3 font-semibold hidden md:block">Email: </p>
                  <p className="mb-3 font-semibold">Gender: </p>
                  <p className="mb-3 font-semibold">Date of Birth: </p>
                  {/* <p className="mb-3 font-semibold">City: </p> */}
                </div>
                <div className="ml-9 md:ml-0">
                  <p className="mb-3">
                    {userInfo.title} {userInfo.first_name} {userInfo.last_name}
                  </p>
                  <p className="mb-3 hidden md:block">
                    {userInfo.traveler_email}
                  </p>
                  <p className="mb-3">
                    {userInfo.title === "Mr." ? "Male" : "Female"}
                  </p>
                  <p className="mb-3">{userInfo.date_of_birth}</p>
                  {/* <p className="mb-3">{userInfo.city}</p> */}
                </div>
              </div>
              <div className="flex justify-start gap-4">
                <div>
                  {/* <p className="mb-3 font-semibold">Country: </p> */}
                  {/* <p className="mb-3 font-semibold">Passport Number: </p> */}
                  <p className="mb-3 font-semibold">Phone Number: </p>
                  <p className="mb-3 font-semibold">Frequent Flyer: </p>
                </div>
                <div>
                  {/* <p className="mb-3">{userInfo.country}</p> */}
                  {/* <p className="mb-3">{userInfo.passport_number}</p> */}
                  <p className="mb-3">{userInfo.phone_number}</p>
                  <p className="mb-3">
                    {userInfo.frequent_flyer ? userInfo.frequent_flyer : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="form-control mt-5 mx-5 md:mx-10 text-xs md:text-[15px]">
              <label className="cursor-pointer flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={() => setIsCheckboxChecked(true)}
                  className="checkbox checkbox-accent"
                />
                <span className="">
                  By clicking Book Now or confrim tickets option I agree with
                  the Website Name{" "}
                  <Link to="" className="text-cyan-800  font-semibold">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="" className="text-cyan-800 font-semibold">
                    Terms & Conditions
                  </Link>
                </span>
              </label>
            </div>

            <div className="mx-5  md:mx-10 flex items-center flex-col md:flex-row  gap-3 mt-5">
              <button
                className={`${
                  isCheckboxChecked
                    ? "hover:bg-cyan-600 hover:tracking-wide hover:text-white"
                    : "opacity-50 cursor-not-allowed"
                } text-cyan-700 border w-48 border-cyan-700  rounded-md h-[50px]  font-semibold text-sm t`}
                disabled={!isCheckboxChecked}
                onClick={handleConfirm}
              >
                Book Now
              </button>
              {/* <button
                className={`${
                  isCheckboxChecked
                    ? "hover:bg-cyan-600 hover:tracking-wide"
                    : "opacity-50 cursor-not-allowed"
                } bg-cyan-700  w-48 rounded-md h-[50px] text-white font-semibold text-sm`}
                disabled={!isCheckboxChecked}
              >
                Pay Now
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        Array.from({ length: totalPassanger }).map((_, index) => (
          <>
            <div
              key={index}
              className="relative dark:bg-slate-800 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500 rounded px-2 py-6  my-2  dark:text-gray-400"
            >
              <div className="shadow-lg rounded-xl">
                <div className="px-5 ">
                  <div className="flex items-center gap-2  mb-2">
                    <h2 className="text-2xl font-semibold">
                      Traveler {index + 1}
                    </h2>
                    Traveler {index + 1}
                    <span className="px-2 py-1 border bg-[#e4dede] dark:bg-gray-700 dark:border-0 rounded text-sm ">
                      Adult
                    </span>
                    {index === 0 && (
                      <>
                        {" "}
                        <span className="px-2 py-1 border bg-red-800 dark:bg-red-700 dark:border-0 rounded text-sm ">
                          Main
                        </span>
                      </>
                    )}
                    <span className="font-semibold text-gray-600">
                      Primary Contact
                    </span>
                  </div>
                  <hr />

                  <div className=" absolute top-5 right-5">
                    <button onClick={() => setIsCollapse(!isCollapse)}>
                      {isCollapse ? (
                        <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300 dark:text-cyan-500 dark:bg-gray-500" />
                      ) : (
                        <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300 dark:text-cyan-500 dark:bg-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div
                  className={`duration-500 ${
                    isCollapse ? "max-h-[1875px] md:max-h-[1925px]" : "max-h-0"
                  } transition-all ease-linear overflow-hidden`}
                >
                  <div className="p-5">
                    <h2 className="font-semibold text-2xl">
                      Personal Details (Adult)
                    </h2>
                    <div className=" text-gray-400  text-sm mt-2">
                      <span>
                        <span className="px-2 rounded-full bg-gray-100 text-red-400">
                          !
                        </span>{" "}
                        as mentioned on your passport or government approved IDs
                      </span>
                    </div>
                  </div>
                  <div className="py-2 px-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {index === 0 && (
                        <>
                          <label className="font-semibold mb-2">
                            Select Title<span className="text-red-600">*</span>
                          </label>
                          <div className="flex gap-2 mt-1 mb-3">
                            Mr.
                            <input
                              className="join-item btn dark:bg-gray-700 dark:text-gray-300"
                              type="radio"
                              name="options"
                              {...register(`title`)}
                              value="Mr."
                              aria-label="Mr."
                            />
                            Mrs.
                            <input
                              className="join-item btn dark:bg-gray-700 dark:text-gray-300"
                              type="radio"
                              name="options"
                              {...register("title")}
                              value="Mrs."
                              aria-label="Mrs."
                            />
                            Ms.
                            <input
                              className="join-item btn dark:bg-gray-700 dark:text-gray-300"
                              type="radio"
                              name="options"
                              {...register("title")}
                              value="Ms."
                              aria-label="Ms."
                            />
                          </div>
                        </>
                      )}

                      {index === 0 ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                              <label className="font-semibold">
                                First Name
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                {...register("first_name", { required: true })}
                                placeholder="First Name"
                                className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:bg-gray-700 border rounded-md dark:border-0 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                  errors.first_name
                                    ? "focus:border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                            </div>

                            <div className="flex flex-col">
                              <label className="font-semibold">
                                Last Name<span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                {...register("last_name", { required: true })}
                                placeholder="Last Name"
                                className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:bg-gray-700 border rounded-md dark:border-0 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                  errors.last_name
                                    ? "focus:border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                            </div>

                            <div className="flex flex-col">
                              <label className="font-semibold">
                                Date of Birth
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="date"
                                {...register("date_of_birth", {
                                  required: true,
                                })}
                                className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:text-gray-200 border rounded-md dark:border-0 dark:bg-gray-700 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                  errors.date_of_birth
                                    ? "focus:border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                            </div>

                            {/* <div className="flex flex-col">
              <label className="font-semibold">
                Passport Number<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                {...register("passport_number", { required: true })}
                placeholder="Passport Number"
                className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:border-0 dark:bg-gray-700 border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.passport_number
                    ? "focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
            </div> */}

                            {/* <div className="flex flex-col">
              <label className="font-semibold">
                Passport Expiry Date
                <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="date"
                {...register("passport_expiry_date")}
                placeholder="Passport Expiry Date"
                className="block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:text-gray-200 dark:border-0 dark:bg-gray-700 rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div> */}

                            {/* <div className="flex flex-col">
              <label className="font-semibold">
                City<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                {...register("city", { required: true })}
                placeholder="City"
                className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:border-0 dark:bg-gray-700 border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.city
                    ? "focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
            </div> */}

                            {/* <div className="flex flex-col">
              <label className="font-semibold">
                Country<span className="text-red-600">*</span>
              </label>
              <select
                {...register("country", { required: true })}
                className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:border-0 dark:bg-gray-700 rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.country
                    ? "focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div> */}
                          </div>

                          <div className="mt-10">
                            <h2 className="font-semibold text-2xl">
                              Contact Details
                            </h2>
                            <div className="text-gray-400 text-sm mt-2">
                              <span>
                                <span className="px-2 rounded-full bg-gray-100 text-red-400">
                                  !
                                </span>{" "}
                                receive booking confirmation & updates
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                              <label className="font-semibold">
                                Email<span className="text-red-600">*</span>
                              </label>
                              <input
                                type="email"
                                {...register("traveler_email", {
                                  required: true,
                                })}
                                placeholder="Write your Email Id Here"
                                className="block w-full px-2 py-2 mt-1 dark:border-0 dark:bg-gray-700 dark:text-gray-400 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="font-semibold mb-1">
                                Phone Number
                                <span className="text-red-600">*</span>
                              </label>
                              <PhoneInput
                                country={"us"}
                                {...register("phone_number", {
                                  required: true,
                                })}
                                value={getValues("phone_number")}
                                onChange={(value) =>
                                  setValue("phone_number", `+ ${value}`)
                                }
                                inputProps={{
                                  name: "phone_number",
                                  required: true,
                                }}
                                inputStyle={{
                                  width: "100%",
                                  padding: "20px 40px",
                                  border: "1px solid rgba(158, 158, 158, 0.2)",
                                }}
                              />
                              {errors.phone_number && (
                                <span className="text-red-500">
                                  Phone number is required
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-10">
                            <h2 className="font-semibold text-2xl">
                              Payment Information
                            </h2>
                            <div className="text-gray-400 text-sm mt-2">
                              <span>
                                <span className="px-2 rounded-full bg-gray-100 text-red-400">
                                  !
                                </span>{" "}
                                Secure and encrypted payment processing
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                              {/* Card Number */}
                              <div className="flex flex-col">
                                <label className="font-semibold">
                                  Card Holder Name
                                  <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  {...register("card_name", { required: true })}
                                  placeholder={"Enter your Card Holder Name"}
                                  className="block w-full px-2 py-2 mt-1 dark:border-0 dark:bg-gray-700 dark:text-gray-400 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.card_number && (
                                  <span className="text-red-500">
                                    Card Holder Name is required Or See other Fields 
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <label className="font-semibold">
                                  Card Number
                                  <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  {...register("card_number", {
                                    required: true,
                                    pattern: {
                                      value: /^\d{16}$/,
                                      message:
                                        "Card Number must be exactly 16 digits",
                                    },
                                  })}
                                  placeholder={"Enter your card number"}
                                  className="block w-full px-2 py-2 mt-1 dark:border-0 dark:bg-gray-700 dark:text-gray-400 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.card_number && (
                                  <span className="text-red-500">
                                    Card number is required or Enter 16 digit Card Number
                                  </span>
                                )}
                              </div>

                              {/* Expiration Date */}
                              <div className="flex flex-col">
                                <label className="font-semibold">
                                  Expiration Date
                                  <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  {...register("card_expiry", {
                                    required: true,
                                    pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})?$/,
                                  })}
                                  placeholder={"MM/YY"}
                                  maxLength={5}
                                  onInput={(e) => {
                                    let value = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    ); // Remove non-digits
                                    if (value.length >= 2) {
                                      value =
                                        value.slice(0, 2) +
                                        "/" +
                                        value.slice(2, 4);
                                    }
                                    e.target.value = value;
                                  }}
                                  className="block w-full px-2 py-2 mt-1 dark:border-0 dark:bg-gray-700 dark:text-gray-400 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.card_expiry && (
                                  <span className="text-red-500">
                                    Expiration date is required in this Format (MM/DD)
                                  </span>
                                )}
                              </div>

                              {/* CVV */}
                              <div className="flex flex-col">
                                <label className="font-semibold">
                                  CVV/CVC<span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="password"
                                  {...register("card_cvv", {
                                    required: "CVV is required",
                                    pattern: {
                                      value: /^\d{3,4}$/, // Allows 3 or 4 digits
                                      message: "CVV must be 3 or 4 digits",
                                    },
                                  })}
                                  placeholder={"3 or 4-digit code"}
                                  className="block w-full px-2 py-2 mt-1 dark:border-0 dark:bg-gray-700 dark:text-gray-400 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.card_cvv && (
                                  <span className="text-red-500">
                                    {errors.card_cvv.message}
                                  </span>
                                )}
                              </div>
                              {/* Billing Address */}
                              <div className="flex flex-col md:col-span-2">
                                <label className="font-semibold">
                                  Billing Address
                                  <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  {...register("billing_address", {
                                    required: true,
                                  })}
                                  placeholder={"Enter your billing address"}
                                  className="block w-full px-2 py-2 mt-1 dark:border-0 dark:bg-gray-700 dark:text-gray-400 text-gray-500 bg-white border rounded-md focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-10 flex justify-center mb-5">
                            <button
                              type="submit"
                              className="flex  items-center lg:pt-3 pt-4 pb-3 px-6 dark:border-0 md:pt-2 mr-5 btn btn-xs md:btn-sm  bg-cyan-600 text-white font-bold rounded-md hover:bg-white hover:border-2 hover:border-cyan-600 hover:text-gray-500"
                            >
                              Confirm Your Details (Next form)
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            key={index + 100}
                          >
                            <div className="flex flex-col">
                              <label className="font-semibold">
                                First Name
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                {...register(`first_name${index}`, {
                                  required: "Name is required",
                                })}
                                placeholder="First Name"
                                className={`block w-full px-2 py-2 mt-1 text-black bg-white dark:bg-gray-700 border rounded-md dark:border-0 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                  errors[`first_name${index}`]
                                    ? "focus:border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                              {errors[`first_name${index}`] && (
                                <span className="text-red-500">
                                  {errors[`first_name${index}`].message}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <label className="font-semibold">
                                Last Name
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                {...register(`last_name${index}`, {
                                  required: "Name is required",
                                })}
                                placeholder="Last Name"
                                className={`block w-full px-2 py-2 mt-1 text-black bg-white dark:bg-gray-700 border rounded-md dark:border-0 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                  errors[`last_name${index}`]
                                    ? "focus:border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                              {errors[`last_name${index}`] && (
                                <span className="text-red-500">
                                  {errors[`last_name${index}`].message}
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label className="font-semibold">
                                Date of Birth
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="date"
                                {...register(`date_of_birth${index}`, {
                                  required: true,
                                })}
                                className={`block w-full px-2 py-2 mt-1 text-gray-500 bg-white dark:text-gray-200 border rounded-md dark:border-0 dark:bg-gray-700 focus:border-gray-500 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-40 ${
                                  errors.date_of_birth
                                    ? "focus:border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                            </div>
                            {/* <div className="flex flex-col">
                              <label className="font-semibold mb-1">
                                Phone Number
                                <span className="text-red-600">*</span>
                              </label>
                              <PhoneInput
                                country={"us"}
                                value={getValues(`phone_number${index}`) || ""}
                                onChange={(value) =>
                                  setValue(`phone_number${index}`, `+${value}`)
                                }
                                inputProps={{
                                  name: `phone_number${index}`,
                                  required: true,
                                }}
                                inputStyle={{
                                  width: "100%",
                                  padding: "10px",
                                  paddingLeft: "45px",
                                  border: "1px solid rgba(158, 158, 158, 0.2)",
                                }}
                              />
                              {errors[`phone_number${index}`] && (
                                <span className="text-red-500">
                                  Phone number is required
                                </span>
                              )}
                            </div> */}
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      )}
    </section>
  );
};

export default TravelerDetailsForm;
