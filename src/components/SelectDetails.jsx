import { departure, arrival, calendar, person } from "../assets/icons";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useState } from "react";

const SelectDetails = ({departureDetail,destinationDetail}) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    minor: 0,
  });

  const handleOptions = (name, oparetion) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: oparetion === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="lg:w-[872px] w-full flex flex-col gap-10">
          <div className="flex w-full h-12 lg:flex-row items-center flex-col lg:shadowCard  relative ">
            <div className="flex w-full lg:w-[173.92px] h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2 rounded-t-[4px] lg:rounded-l-[4px]">
              <img src={departure} alt="departure" />
              <input
                type="text"
                placeholder={departureDetail?.code ? departureDetail.code : "NER"}
                className="outline-none cursor-not-allowed border-none ml-2 placeholder:text-[#7C8DB0] placeholder:text-sm placeholder:leading-6"
              />
            </div>

            <div className="flex w-full lg:w-[173.92px] h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
              <img src={arrival} alt="departure" />
              <input
                type="text"
                placeholder={destinationDetail?.code ? destinationDetail.code : "SUF"}
                className="outline-none cursor-not-allowed border-none ml-2 placeholder:text-[#7C8DB0] placeholder:text-sm placeholder:leading-6"
              />
            </div>

            <div className="flex w-full  h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
              <img src={calendar} alt="calendar" />
              <span
                className="text-[#7C8DB0] text-sm leading-6 ml-2 cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >
                {openDate
                  ? `${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                      date[0].endDate,
                      "dd/MM/yyyy"
                    )}`
                  : "Depart to Return"}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="absolute top-64 lg:top-20 z-10 "
                />
              )}
            </div>

            <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6]  p-2">
              <img src={person} alt="person" />
              <span
                className="text-[#7C8DB0] text-sm leading-6 ml-2 cursor-pointer"
                onClick={() => setOpenOptions(!openOptions)}
              >
                {`${options.adult} Adult - ${options.minor} Minor `}
              </span>
              {openOptions && (
                <div className="w-52 h-fit flex flex-col gap-4 rounded-md bg-white shadowCard absolute lg:top-[70px] top-64 p-4 z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[#7C8DB0] text-base leading-6">
                      Adults:
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                        onClick={() => handleOptions("adult", "d")}
                        disabled={options.adult <= 1}
                      >
                        -
                      </button>
                      <span className="text-[#7C8DB0]">{options.adult}</span>
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                        onClick={() => handleOptions("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7C8DB0] text-base leading-6">
                      Minors:
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                        onClick={() => handleOptions("minor", "d")}
                        disabled={options.minor <= 0}
                      >
                        -
                      </button>
                      <span className="text-[#7C8DB0]">{options.minor}</span>
                      <button
                        className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                        onClick={() => handleOptions("minor", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full lg:w-[96px] ">
              <button className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[48px] px-5   rounded-b-[4px] lg:rounded-r-[4px]">
                Search
              </button>
            </div>
          </div>

          {/* Select section */}

        </div>
      </div>
    </>
  );
};

export default SelectDetails;
