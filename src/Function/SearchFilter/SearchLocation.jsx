import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setFromCityInfo,
  setToCityInfo,
} from "../../redux/features/searchFilterSlice";

const SearchLocation = ({ setIsModal, locationModal }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [locations, setLocations] = useState([]);
  // console.log(locations[0]?.destination?.split("/")[1]);
  // console.log(locations);
  const [allLocations, setAllLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data once on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/locations.json");
        const data = await response.json();
        setAllLocations(data); // Cache all entries
        setLocations(data.slice(0, 10)); // Initial display
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Debounced Search Function
  const handleInputSearch = useCallback(
    (e) => {
      const inputValue = e.target.value;
      setSearchValue(inputValue);

      if (inputValue.trim() !== "") {
        const searchValueLower = inputValue.toLowerCase();
        const filteredLocations = allLocations.filter((item) =>
          ["airportName", "code", "destination", "city"].some((key) =>
            item[key]?.toLowerCase().includes(searchValueLower)
          )
        );
        setLocations(filteredLocations);
      } else {
        setLocations(allLocations.slice(0, 10)); // Reset to initial 10 entries
      }
    },
    [allLocations]
  );

  return (
    <div className="text-gray-600 w-80 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md bg-white overflow-hidden">
      <div className="flex gap-1 items-center mb-1 pt-2 px-2">
        <FaSearch className="text-cyan-600 text-xl" />
        <input
          type="text"
          placeholder="Type for the location name"
          className="w-full p-1 outline-none"
          onChange={handleInputSearch}
        />
      </div>
      <hr />
      <div className="max-h-80 overflow-y-scroll">
        {locations.length === 0 ? (
          <div className="p-3 text-center text-red-500">No match found!</div>
        ) : (
          locations.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setIsModal(false);
                if (locationModal === "from") {
                  dispatch(setFromCityInfo(item));
                } else if (locationModal === "to") {
                  dispatch(setToCityInfo(item));
                }
              }}
              className="flex items-center justify-between gap-1 px-2 py-1 hover:bg-slate-100 cursor-pointer"
            >
              <div>
                <h5 className="text-sm font-semibold">{item?.city}</h5>
                <p className="text-sm">
                  <small>{item.airportName}</small>
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-500">{item.code}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchLocation;
