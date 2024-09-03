import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import { VscClose } from "react-icons/vsc";
import { LiaSearchSolid } from "react-icons/lia";
import SearchBar from "./SearchBar";
import PriceSlider from "./PriceSlider";
import { useLocation } from "react-router-dom";

const Filters = ({
  searchTerm,
  setSearchTerm,
  availabilityOptions,
  selectedAvailability,
  setSelectedAvailability,
  states,
  selectedState,
  setSelectedState,
  municipalities,
  selectedMunicipality,
  setSelectedMunicipality,
  propertyTypeOptions,
  selectedPropertyType,
  setSelectedPropertyType,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  resetFilters,
  filteredProperties,
}) => {
  const location = useLocation();
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [selectedAvailabilityState, setSelectedAvailabilityState] = useState(
    selectedAvailability || "inStock"
  );
  const [selectedPropertyTypeState, setSelectedPropertyTypeState] = useState(
    selectedPropertyType || []
  );
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonsRef = useRef([]);

  const handleToggleAvailability = (option, index) => {
    setSelectedAvailabilityState(option);
    setSelectedAvailability(option);
    setFiltersChanged(true);
    moveUnderline(index);
  };

  const moveUnderline = (index) => {
    if (buttonsRef.current[index]) {
      const button = buttonsRef.current[index];
      setUnderlineStyle({
        width: button.offsetWidth,
        left: button.offsetLeft,
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const availability = params.get("availability");

    if (availability) {
      setSelectedAvailabilityState(availability);
      setSelectedAvailability(availability);
    } else {
      setSelectedAvailabilityState("inStock");
      setSelectedAvailability("inStock");
    }
  }, [location.search, setSelectedAvailability]);

  useEffect(() => {
    const selectedIndex = availabilityOptions.findIndex(
      (option) => option.value === selectedAvailabilityState
    );
    if (selectedIndex >= 0) {
      moveUnderline(selectedIndex);
    }
  }, [selectedAvailabilityState, availabilityOptions]);

  const handleTogglePropertyType = (option) => {
    const updatedSelection = selectedPropertyTypeState.includes(option)
      ? selectedPropertyTypeState.filter((item) => item !== option)
      : [...selectedPropertyTypeState, option];
    setSelectedPropertyTypeState(updatedSelection);
    setSelectedPropertyType(updatedSelection);
    setFiltersChanged(true);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setFiltersChanged(true);
  };

  const handleMunicipalityChange = (selectedOption) => {
    setSelectedMunicipality(selectedOption);
    setFiltersChanged(true);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.175rem",
      height: "auto",
      borderColor: "#E5E7EB",
      backgroundColor: "#FFF",
      color: "#333",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#888",
      },
      fontSize: "0.75rem",
      textTransform: "uppercase",
      padding: "0.25rem 0.75rem",
      minHeight: "40px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.175rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#FFF",
      marginTop: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#F0F0F0" : "#FFF",
      color: "#333",
      fontSize: "0.75rem",
      textTransform: "uppercase",
      padding: "0.5rem 1rem",
      "&:hover": {
        backgroundColor: "#F0F0F0",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.75rem",
      textTransform: "uppercase",
      color: "#333",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "0.75rem",
      textTransform: "uppercase",
      color: "#333",
    }),
    input: (provided) => ({
      ...provided,
      fontSize: "0.75rem",
      textTransform: "uppercase",
      color: "#333",
    }),
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedAvailability("inStock");
    setSelectedAvailabilityState("inStock");
    setSelectedState(null);
    setSelectedMunicipality(null);
    setSelectedPropertyType([]);
    setSelectedPropertyTypeState([]);
    setMinPrice(0);
    setMaxPrice(50000000);
    setFiltersChanged(false);

    const selectedIndex = availabilityOptions.findIndex(
      (option) => option.value === "inStock"
    );
    if (selectedIndex >= 0) {
      moveUnderline(selectedIndex);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="lg:hidden p-3 fixed top-1 right-10 z-50">
        <button
          onClick={openModal}
          className="flex items-center justify-center w-11 h-11 text-gray-900 rounded-full transform transition-transform duration-300 hover:scale-105  hover:text-black"
          aria-label="Open Filters"
        >

          <LiaSearchSolid className="w-7 h-7" />
        </button>
      </div>

      {/* Filtros en modal para móviles */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-start lg:hidden transition-opacity duration-300 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-white w-full h-full overflow-y-auto transform transition-transform duration-300 ${
            isModalOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4 fixed top-1 right-0 z-50">
            <button
              onClick={closeModal}
              className="flex items-center justify-center w-11 h-11 bg-white text-black rounded-full transform transition-transform duration-300 hover:scale-110 hover:bg-white hover:text-black"
              aria-label="Close Filters"
            >
              <VscClose className="w-7 h-7" />
            </button>
          </div>
          <div className="p-4 mt-16">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="relative inline-flex justify-center items-center w-full">
                  <div className="flex justify-center space-x-4">
                    {availabilityOptions.map((option, index) => (
                      <button
                        key={option.value}
                        ref={(el) => (buttonsRef.current[index] = el)}
                        onClick={() => handleToggleAvailability(option.value, index)}
                        className={`px-4 py-2 uppercase text-xs tracking-wider third-font transition-all ease-in-out duration-300 ${
                          selectedAvailabilityState === option.value
                            ? "bg-white font-semibold text-gray-900 border-b-2 border-gray-900"
                            : "bg-white text-gray-800 hover:text-gray-900"
                        } focus:outline-none`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <span
                    className="absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-300 ease-in-out"
                    style={underlineStyle}
                  ></span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {propertyTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleTogglePropertyType(option.value)}
                      className={`inline-block px-2 py-3 text-xs uppercase border font-light rounded-sm tracking-widest third-font transition-all ease-in-out duration-300 ${
                        selectedPropertyTypeState.includes(option.value)
                          ? "bg-gray-100 font-medium text-gray-900 ring-2 ring-gray-300/20"
                          : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                      } focus:outline-none`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  options={states}
                  placeholder={
                    <FormattedMessage id="section.statePlaceholder" defaultMessage="Select state" />
                  }
                  className="w-full uppercase third-font text-gray-500 text-xs rounded-lg"
                  styles={customStyles}
                />
              </div>
              <div className="space-y-4">
                <Select
                  value={selectedMunicipality}
                  onChange={handleMunicipalityChange}
                  options={municipalities}
                  placeholder={
                    <FormattedMessage id="section.municipalityPlaceholder" defaultMessage="Select locality" />
                  }
                  className="w-full uppercase third-font text-gray-500 text-xs rounded-lg"
                  styles={customStyles}
                />
              </div>
              <div className="py-1 border-t border-b">
 <PriceSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          formatPrice={formatPrice}
          category={selectedAvailability} // Pasar la categoría seleccionada
        />
      </div>
              {filtersChanged && (
                <div className="text-center transition-all ease-in-out duration-300">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-3 bg-gray-900 uppercase text-white rounded-sm text-xs font-light tracking-wider third-font hover:bg-gray-800 focus:outline-none"
                  >
                    <FormattedMessage id="section.showall" defaultMessage="Show All Properties" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros visibles directamente en pantallas grandes */}
      <div className="hidden lg:block">
        <div className="px-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="space-y-8 mt-4">
            <div className="space-y-4">
              <div className="relative inline-flex justify-center items-center w-full">
                <div className="flex justify-center space-x-4">
                  {availabilityOptions.map((option, index) => (
                    <button
                      key={option.value}
                      ref={(el) => (buttonsRef.current[index] = el)}
                      onClick={() => handleToggleAvailability(option.value, index)}
                      className={`px-4 py-2 uppercase text-xs tracking-wider third-font transition-all ease-in-out duration-300 ${
                        selectedAvailabilityState === option.value
                          ? "bg-white font-semibold text-gray-900 border-b-2 border-gray-900"
                          : "bg-white text-gray-800 hover:text-gray-900"
                      } focus:outline-none`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-300 ease-in-out"
                  style={underlineStyle}
                ></span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {propertyTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTogglePropertyType(option.value)}
                    className={`inline-block px-2 py-3 text-xs uppercase border font-light rounded-sm tracking-widest third-font transition-all ease-in-out duration-300 ${
                      selectedPropertyTypeState.includes(option.value)
                        ? "bg-gray-100 font-medium text-gray-900 ring-2 ring-gray-300/20"
                        : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                    } focus:outline-none`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Select
                value={selectedState}
                onChange={handleStateChange}
                options={states}
                placeholder={
                  <FormattedMessage id="section.statePlaceholder" defaultMessage="Select state" />
                }
                className="w-full uppercase third-font text-gray-500 text-xs rounded-lg"
                styles={customStyles}
              />
            </div>

            <div className="space-y-4">
              <Select
                value={selectedMunicipality}
                onChange={handleMunicipalityChange}
                options={municipalities}
                placeholder={
                  <FormattedMessage id="section.municipalityPlaceholder" defaultMessage="Select locality" />
                }
                className="w-full uppercase third-font text-gray-500 text-xs rounded-lg"
                styles={customStyles}
              />
            </div>

            <div className="py-1 border-t border-b">
              <PriceSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                allProperties={filteredProperties}
                formatPrice={formatPrice}
              />
            </div>

            {filtersChanged && (
              <div className="text-center transition-all ease-in-out duración-300">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-gray-900 uppercase text-white rounded-sm text-xs font-light tracking-wider third-font hover:bg-gray-800 focus:outline-none"
                >
                  <FormattedMessage id="section.showall" defaultMessage="Show All Properties" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
