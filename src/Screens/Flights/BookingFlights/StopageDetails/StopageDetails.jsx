// import React from "react";
import { formatDate } from "../../../../utils/formatDate";
// import { calculateArrivalDate } from "../../../../utils/calculateArrivalDate";
import { extractTime } from "../../../../utils/timeExtraction";
// const FlightDetails = ({ flightFullDetails }) => {
// //   const { airlineName, airlineLogo } = flightFullDetails || {};
// //   const { seats, airportName, city, code, date, terminal, time } =
//     // flightFullDetails?.departure || {};

//     // console.log(date,time);

//     // const dt = new Date(date);
//     // console.log(dt.getMilliseconds())

// //   const { aircraft, cabin, checkIn, operatedBy } =
//     // flightFullDetails?.flightInfo || {};

// //   const { duration, passengerType, stopType } = flightFullDetails || {};

// //   const arrive = flightFullDetails?.arrival || {};

//   return (
//     <section className="mt-3 border-[1px] rounded-sm ">
//       <h1 className=" p-3 border-b-[1px] font-semibold">
//         {/* {city} to {arrive?.city}, {formatDate(date)} */}
//         {"city"} to {"arrive?.city"}, {"formatDate(date)"}
//       </h1>

//       {/* Details Body */}
//       <section className="p-3">
//         {/* Flight Profile */}
//         <div className="flex gap-4 ml-3">
//           <img
//             className="h-16 w-16 rounded-full -ml-2"
//             // src={airlineLogo}
//             alt=""
//           />
//           <div>
//             <h1 className="font-semibold">{"airlineName"}</h1>
//             <h3 className="font-semibold text-[13px]">Aircraft : {"aircraft"}</h3>
//             <h4 className="font-semibold text-[12px]">
//               Operated by : {"operatedBy"}
//             </h4>
//             <h4 className="font-semibold text-[12px]">
//               {"flightFullDetails?.flightInfo?.class"}
//             </h4>
//             <h4 className="font-semibold text-[12px]">
//               Available seats: {"seats"}
//             </h4>
//           </div>
//         </div>

//         {/* flight other details */}
//         <section className="grid grid-cols-3 ml-4 lg:grid-cols-6 mt-4 gap-6 lg:mb-1 mb-8">
//           <div>
//             <h2 className="mt-2 text-[15px] font-semibold">{"time"}</h2>
//             <p className="text-gray-400 mt-2 text-xs">{"formatDate(date)"}</p>
//             <h2 className="text-[13px] font-semibold">{"code"}</h2>
//             <p className="text-gray-400 text-xs">Terminal: {"terminal"}</p>
//             <p className="text-gray-400 text-xs">{"airportName"}</p>
//             <p className="text-gray-400 text-xs"> {"city"}</p>
//           </div>

//           <div align="center" className="space-y-1 pr-2">
//             <p className="text-gray-400 text-xs">
//               {/* {duration < 60
//                 ? `${duration} min`
//                 : `${Math.floor(duration / 60)} hr ${duration % 60} min`} */}
//             </p>
//             <img
//               style={{
//                 WebkitFilter: "grayscale(100%)",
//                 filter: "grayscale(100%)",
//               }}
//               src="https://flightexpert.com/assets/img/non-stop-shape.png"
//               alt=""
//             />
//             <p className="text-xs">{"stopType"}</p>
//           </div>

//           <div>
//             <h2 className="mt-2 text-[15px] font-semibold">{"arrive?.time"}</h2>
//             <p className="text-gray-400 mt-2 text-xs">
//               {"date, time, arrive?.time"}
//             </p>
//             <h2 className="text-xs font-semibold">{"arrive?.code"}</h2>
//             <p className="text-gray-400 text-xs">
//               Terminal: {"arrive?.terminal"}
//             </p>
//             <p className="text-gray-400 text-xs">{"arrive?.airportName"}</p>
//             <p className="text-gray-400 text-xs">{"arrive?.city"}</p>
//           </div>

//           <div>
//             <h2 className="mt-2 text-[14px] font-semibold">Baggage</h2>
//             <p className="text-gray-400 mt-1">
//               <small>{"passengerType"}</small>
//             </p>
//           </div>

//           <div>
//             <h2 className="mt-2 text-[15px] font-semibold">Check In</h2>
//             <p className="text-gray-400 mt-1">
//               <small>{"checkIn"}</small>
//             </p>
//           </div>

//           <div>
//             <h2 className="mt-2 text-[15px] font-semibold">Cabin</h2>
//             <p className="text-gray-400 mt-1">
//               <small>{cabin}</small>
//             </p>
//           </div>
//         </section>
//       </section>
//     </section>
//   );
// };

// export default FlightDetails;

import React from "react";

const StopageDetails = ({ stopageData }) => {
  // console.log(stopageData);

  const departure = stopageData[0];
  const arrival = stopageData[stopageData.length - 1];
  // console.log(departure);
  // console.log(arrival);

  return (
    <section className="mt-3 border-[1px] rounded-sm ">
      <h1 className=" p-3 border-b-[1px] font-semibold">
        {departure?.origin?.name} to {arrival?.destination?.name} {"    "} ||
        {"    "}
        {formatDate(departure?.departure)} {extractTime(departure?.departure)}{" "}
        to {formatDate(arrival?.arrival)} {extractTime(arrival?.arrival)}
        {/* {"city"} to {"arrive?.city"}, {"formatDate(date)"} */}
      </h1>

      {/* Details Body */}
      <section className="p-3">
        {/* Flight Profile */}
        {/* <div className="flex gap-4 ml-3">
          <img
            className="h-16 w-16 rounded-full -ml-2"
            // src={airlineLogo}
            alt=""
          />
          <div>
            <h1 className="font-semibold">{"airlineName"}</h1>
            <h3 className="font-semibold text-[13px]">
              Aircraft : {"aircraft"}
            </h3>
            <h4 className="font-semibold text-[12px]">
              Operated by : {"operatedBy"}
            </h4>
            <h4 className="font-semibold text-[12px]">
              {"flightFullDetails?.flightInfo?.class"}
            </h4>
            <h4 className="font-semibold text-[12px]">
              Available seats: {"seats"}
            </h4>
          </div>
        </div> */}

        {/* flight other details */}
        <section className="flex flex-wrap gap-4 overflow-auto max-w-full">
          {stopageData.length > 1 &&
            stopageData?.map((singleStop, idx) => (
              <section
                className=" flex gap-3 flex-1 min-w-[300px] max-w-[400px] p-4 border rounded-md shadow-md"
                key={idx}
              >
                <div>
                  <h2 className="mt-2 text-[15px] font-semibold">
                    {extractTime(singleStop?.departure)}
                  </h2>
                  <p className="text-gray-400 mt-2 text-xs">
                    {formatDate(singleStop.departure)}
                  </p>
                  <h2 className="text-[13px] font-semibold">
                    {singleStop.origin.name}
                  </h2>
                  <p className="text-gray-400 text-xs">
                    City/Country: {singleStop.origin.country}
                  </p>
                  {/* <p className="text-gray-400 text-xs">{"airportName"}</p>
                  <p className="text-gray-400 text-xs">{"city"}</p> */}
                </div>

                <div align="center" className="space-y-1 translate-y-3 pr-6">
                  <p className="text-gray-400 mt-2 text-xs">
                    Flight Number : {singleStop.flightNumber}
                  </p>
                  <p className="text-red-800 font-bold text-xs">
                    {singleStop.duration < 60
                      ? `${singleStop.duration} min`
                      : `${Math.floor(singleStop.duration / 60)} hr ${
                          singleStop.duration % 60
                        } min`}
                  </p>
                </div>

                <div>
                  <h2 className="mt-2 text-[15px] font-semibold">
                    {extractTime(singleStop?.arrival)}
                  </h2>
                  <p className="text-gray-400 mt-2 text-xs">
                    {formatDate(singleStop.arrival)}
                  </p>
                  <h2 className="text-xs font-semibold">
                    {singleStop.destination.name}
                  </h2>
                  <p className="text-gray-400 text-xs">
                    City/Country: {singleStop.destination.country}
                  </p>
                  {/* <p className="text-gray-400 text-xs">
                    {"arrive?.airportName"}
                  </p>
                  <p className="text-gray-400 text-xs">{"arrive?.city"}</p> */}
                </div>
              </section>
            ))}
        </section>
      </section>
    </section>
  );
};

export default StopageDetails;
