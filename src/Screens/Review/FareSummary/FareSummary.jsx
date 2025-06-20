import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import CountdownTimer from "../../../Components/CountdownTimer/CountdownTimer";
import { useSelector } from "react-redux";

const FareSummary = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  // const flightInfo = useSelector((state) => state?.userBookingInfo?.flightInfo);
  const flightInfo = JSON.parse(sessionStorage.getItem("flightInfo"));
  // const userDetails =
  const { airlineLogo, airlineName, fareSummary } = flightInfo;
  const insuranceStatus = useSelector((state) => state?.insurance?.insurance);
  const travelerPassanger = useSelector(
    (state) => state.traveState.searchFilterT.total_passanger
  );
  const extractPrice = (priceString) => {
    if (!priceString) return 0; // Handle undefined/null case
    return parseInt(priceString.replace(/[$,]/g, ""), 10) || 0;
  };

  return (
    <div>
      <div className="shadow-lg rounded-xl overflow-hidden dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500">
        <div className="px-5">
          <div className="flex items-center gap-1 mb-2">
            <img className="h-12 w-12 rounded-full" src={airlineLogo} alt=" " />{" "}
            <h5 className="font-semibold text-gray-600 dark:text-gray-500">
              {airlineName}
            </h5>
          </div>
          <hr />
          <div className="text-end -mt-3">
            <button onClick={() => setIsCollapse(!isCollapse)}>
              {isCollapse ? (
                <MdKeyboardArrowUp className="text-2xl rounded-full bg-gray-300 dark:bg-gray-500 dark:text-cyan-500" />
              ) : (
                <MdKeyboardArrowDown className="text-2xl rounded-full bg-gray-300" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`duration-500 ${
            isCollapse ? "max-h-[411.52px]" : "max-h-0"
          } transition-all ease-linear overflow-hidden`}
        >
          <div className="p-5">
            <h5 className="font-semibold text-gray-600">Fare Summary</h5>
            <p className="mt-2">{`Adult (${travelerPassanger} Traveler)`}</p>
            <div className="flex justify-between mt-1">
              <p className="text-gray-500 text-sm">Base Fare</p>
              <div className="text-end">
                <p>
                  USD ${" "}
                  <span className="font-semibold">{fareSummary?.baseFare}</span>
                </p>
                <p className="text-xs text-gray-500">{`( 1 x ${fareSummary?.baseFare} )`}</p>
              </div>
            </div>
            <div className="flex justify-between mt-1 mb-2">
              <p className="text-gray-500 text-sm">Taxes + Fees</p>
              <div className="text-end">
                <p>
                  USD ${"  "}
                  <span className="font-semibold">
                    {fareSummary?.taxesAndFees ? fareSummary?.taxesAndFees : 0}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{`( 1 x ${fareSummary?.taxesAndFees} )`}</p>
              </div>
            </div>
            {insuranceStatus && (
              <div className="flex justify-between mt-1 mb-2">
                <p className="text-gray-500 text-sm">Policy Premium</p>
                <div className="text-end">
                  <p>
                    USD{" "}
                    <span className="font-semibold">
                      {(0.05 * fareSummary?.total).toFixed()}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{`( 1 x ${(
                    0.05 * fareSummary?.total
                  ).toFixed()} )`}</p>
                </div>
              </div>
            )}
            <hr />
            <div className="flex justify-between mt-2">
              <p className="text-gray-500 text-sm">Sub Total</p>
              <p>
                USD <span className="font-semibold">{fareSummary?.total}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between p-5 bg-cyan-100 dark:bg-slate-800">
            <p>
              <span className="font-semibold text-slate-400">You Pay</span>{" "}
              <span className="text-sm text-gray-500">
                {`(for ${travelerPassanger} traveler)`}
              </span>
            </p>
            <p className="font-semibold text-slate-400">
              USD ${extractPrice(fareSummary?.total) * (travelerPassanger || 1)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 shadow-lg rounded-xl ">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default FareSummary;
