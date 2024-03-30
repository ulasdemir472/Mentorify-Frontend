import React, { useState } from "react";

const DropdownSearch = () => {
  const [options, setOptions] = useState([
    "Yazılım",
    "Mekatronik",
    "Elektrik",
    "Makine",
    "Endüstri",
    "İnşaat",
    "Kimya",
    "Gıda",
    "Metalurji",
    "Malzeme",
    "Bilgisayar",
    "Biyomedikal",
    "Çevre",
    "İşletme",
    "Mim",
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase());
        });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className="text-indigo-500 bg-white border border-indigo-400 focus:ring-2 focus:outline-none focus:ring-indigo-500 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleDropdown} // Add onClick event to toggle dropdown
      >
        Skills
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

      {/* Dropdown menu */}
      <div
        id="dropdownSearch"
        className={`z-10 ${
          isOpen ? "" : "hidden"
        } bg-white rounded-lg shadow-sm w-60 border absolute mt-1`} // Toggle visibility based on isOpen state
      >
        <div className="p-3">
          <label htmlFor="input-group-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-black-500 dark:text-black-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full p-2 ps-10 text-sm text-black border border-black-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search user"
            />
          </div>
        </div>
        <ul
          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-black-700 dark:text-black-200"
          aria-labelledby="dropdownSearchButton"
        >
          {filtered.map((option, index) => (
            <li key={index}>
              <div className="flex items-center ps-2 rounded hover:bg-black-100 dark:hover:bg-black-600">
                <input
                  id={`checkbox-item-${index}`}
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 bg-black-100 border-black-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black-700 dark:focus:ring-offset-black-700 focus:ring-2 dark:bg-black-600 dark:border-black-500"
                />
                <label
                  htmlFor={`checkbox-item-${index}`}
                  className="w-full py-2 ms-2 text-sm font-medium text-black-900 rounded dark:text-black-300"
                >
                  {option}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownSearch;
