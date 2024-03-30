import React, { useState } from "react";

const FilterPrice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <button
        id="dropdownPriceButton"
        data-dropdown-toggle="dropdownPrice"
        data-dropdown-placement="bottom"
        className="text-indigo-500 bg-white border border-indigo-400 focus:ring-2 focus:outline-none focus:ring-indigo-500 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleDropdown} // Add onClick event to toggle dropdown
      >
        Price
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdownPrice"
        className={`z-10 ${
          isOpen ? "" : "hidden"
        }  w-40 py-2 bg-white border border-gray-200 rounded-lg shadow-lg absolute mt-1`}
      >
        <ul className="flex flex-col gap-2">
          <li
            className={`text-gray-700 px-4 py-2 rounded-lg cursor-pointer ${
              selectedOption === "$0 - $100" ? "bg-gray-100" : ""
            }`}
            onClick={() => handleOptionClick("$0 - $100")}
          >
            $0 - $100
          </li>
          <li
            className={`text-gray-700 px-4 py-2 rounded-lg cursor-pointer ${
              selectedOption === "$100 - $500" ? "bg-gray-100" : ""
            }`}
            onClick={() => handleOptionClick("$100 - $500")}
          >
            $100 - $500
          </li>
          <li
            className={`text-gray-700 px-4 py-2 rounded-lg cursor-pointer ${
              selectedOption === "$500 - $1000" ? "bg-gray-100" : ""
            }`}
            onClick={() => handleOptionClick("$500 - $1000")}
          >
            $500 - $1000
          </li>
          <li
            className={`text-gray-700 px-4 py-2 rounded-lg cursor-pointer ${
              selectedOption === "$1000 - $5000" ? "bg-gray-100" : ""
            }`}
            onClick={() => handleOptionClick("$1000 - $5000")}
          >
            $1000 - $5000
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterPrice;
