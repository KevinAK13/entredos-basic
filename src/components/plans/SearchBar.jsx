import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useIntl } from "react-intl";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const intl = useIntl();

  return (
    <div className="relative w-full lg:w-full border-b border-gray-200 py-2 mb-6">
      <div className="flex items-center bg-white overflow-hidden">
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "section.searchPlaceholder",
            defaultMessage: "Search by property type, city, state...",
          })}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent py-3 px-6 text-xs font-light uppercase tracking-wider text-gray-900 focus:outline-none placeholder-gray-600 third-font"
          aria-label={intl.formatMessage({
            id: "section.searchAriaLabel",
            defaultMessage: "Search properties",
          })}
        />
        <button
          className="flex items-center justify-center p-3"
          aria-label={intl.formatMessage({
            id: "section.searchButtonAriaLabel",
            defaultMessage: "Search",
          })}
        >
          <IoIosSearch className="text-black" size={24} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
