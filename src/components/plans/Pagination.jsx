import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  currentPage,
  propertiesPerPage,
  totalProperties,
  paginate,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-6 mb-12 space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => {
            paginate(currentPage - 1);
            localStorage.setItem("currentPage", currentPage - 1);
          }}
          className="p-2 bg-white text-gray-900 border border-gray-300 rounded-full shadow hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          <IoIosArrowBack />
        </button>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => {
            paginate(number);
            localStorage.setItem("currentPage", number);
          }}
          className={`px-3.5 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out shadow ${
            currentPage === number
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => {
            paginate(currentPage + 1);
            localStorage.setItem("currentPage", currentPage + 1);
          }}
          className="p-2 bg-white text-gray-900 border border-gray-300 rounded-full shadow hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default Pagination;
