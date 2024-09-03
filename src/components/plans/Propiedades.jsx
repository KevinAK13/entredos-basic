import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import properties from "../plans/Data";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import { FormattedMessage } from "react-intl";
import MapComponent from "../plans/MapaPropiedades";
import Navbar from "../navbar/NavbarS";
import Filters from "./Filters";

// Custom hook to handle the filtering logic
const useFilteredProperties = ({
  properties,
  searchTerm,
  minPrice,
  maxPrice,
  selectedState,
  selectedMunicipality,
  selectedPropertyType,
  selectedAvailability,
  sortOption,
}) => {
  const normalizeText = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];

    return properties
      .filter((property) => {
        const normalizedSearchTerm = normalizeText(searchTerm);

        const matchesSearchTerm =
          normalizeText(property.title.props.defaultMessage || "").includes(
            normalizedSearchTerm
          ) ||
          normalizeText(property.description.props.defaultMessage || "").includes(
            normalizedSearchTerm
          ) ||
          normalizeText(property.location.city || "").includes(normalizedSearchTerm) ||
          normalizeText(property.location.state || "").includes(
            normalizedSearchTerm
          ) ||
          (property.features || []).some((feature) =>
            normalizeText(feature.label || "").includes(normalizedSearchTerm)
          ) ||
          (property.keywords || []).some((keyword) =>
            normalizeText(keyword || "").includes(normalizedSearchTerm)
          );

        const matchesPriceRange =
          property.price >= minPrice && property.price <= maxPrice;

        const matchesState = selectedState
          ? property.location.state === selectedState.value
          : true;

        const matchesMunicipality = selectedMunicipality
          ? property.location.municipality === selectedMunicipality.value
          : true;

        const matchesPropertyType = selectedPropertyType.length
          ? selectedPropertyType.some(
              (type) => property.propertyType === type
            )
          : true;

        const matchesAvailability =
          (selectedAvailability === "inStock" && property.availableForSale === true) ||
          (selectedAvailability === "preOrder" && property.availableForPreSale === true) ||
          (selectedAvailability === "forRent" && property.availableForRent === true);

        return (
          matchesSearchTerm &&
          matchesPriceRange &&
          matchesState &&
          matchesMunicipality &&
          matchesPropertyType &&
          matchesAvailability
        );
      })
      .sort((a, b) => {
        if (!sortOption) return 0;
        if (sortOption === "priceAsc") return a.price - b.price;
        if (sortOption === "priceDesc") return b.price - a.price;
        return 0;
      });
  }, [
    properties,
    searchTerm,
    minPrice,
    maxPrice,
    selectedState,
    selectedMunicipality,
    selectedPropertyType,
    selectedAvailability,
    sortOption,
  ]);

  return filteredProperties;
};

const PropertiesSection = () => {
 const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState("inStock");
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [sortOption,] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const availability = params.get("availability");

    if (availability) {
      setSelectedAvailability(availability);
    }
  }, [location.search]);

  const filteredProperties = useFilteredProperties({
    properties,
    searchTerm,
    minPrice,
    maxPrice,
    selectedState,
    selectedMunicipality,
    selectedPropertyType,
    selectedAvailability,
    sortOption,
  });

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    if (selectedAvailability === "forRent") {
      const rentPrices = properties
        .filter((property) => property.availableForRent)
        .map((property) => property.price);

      if (rentPrices.length > 0) {
      } else {
        setMinPrice(0);
        setMaxPrice(50000000);
      }
    } else if (selectedAvailability === "preOrder") {
      setMinPrice(0);
      setMaxPrice(50000000);
    } else {
      setMinPrice(0);
      setMaxPrice(50000000);
    }
  }, [selectedAvailability, properties]);

  useEffect(() => {
    if (selectedState) {
      setSelectedMunicipality(null);
    }
  }, [selectedState]);

  useEffect(() => {
    const maxPage = Math.ceil(filteredProperties.length / propertiesPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [
    currentPage,
    filteredProperties.length,
    propertiesPerPage,
    searchTerm,
    selectedState,
    selectedMunicipality,
    selectedPropertyType,
    selectedAvailability,
    minPrice,
    maxPrice,
  ]);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedState(null);
    setSelectedMunicipality(null);
    setSelectedPropertyType([]);
    setSelectedAvailability("inStock");
    setMinPrice(0);
    setMaxPrice(50000000);
  }, []);

  const shareProperty = useCallback(async (property) => {
    const imageUrl = property.image;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "property.jpg", { type: "image/jpeg" });

      if (navigator.share) {
        await navigator.share({
          title: property.title.props.defaultMessage,
          text: `Echa un vistazo a esta propiedad: ${property.title.props.defaultMessage}`,
          files: [file],
          url: `${window.location.origin}/properties/${property.id}`,
        });
      } else {
        alert("La función de compartir no está soportada en este navegador.");
      }
    } catch (error) {
      console.error("Error al compartir la propiedad:", error);
    }
  }, []);

  const currentProperties = useMemo(() => {
    return filteredProperties.slice(
      (currentPage - 1) * propertiesPerPage,
      currentPage * propertiesPerPage
    );
  }, [filteredProperties, currentPage, propertiesPerPage]);

  const availabilityOptions = useMemo(
    () => [
      { value: "inStock", label: <FormattedMessage id="availability.inStock" defaultMessage="Venta" /> },
      { value: "preOrder", label: <FormattedMessage id="availability.preOrder" defaultMessage="Preventa" /> },
      { value: "forRent", label: <FormattedMessage id="availability.forRent" defaultMessage="Renta" /> },
    ],
    []
  );

  const propertyTypeOptions = useMemo(
    () => [
      { value: "house", label: <FormattedMessage id="propertyType.house" defaultMessage="Casa" /> },
      { value: "apartment", label: <FormattedMessage id="propertyType.apartment" defaultMessage="Departamento" /> },
      { value: "land", label: <FormattedMessage id="propertyType.land" defaultMessage="Terreno" /> },
      { value: "commercial", label: <FormattedMessage id="propertyType.commercial" defaultMessage="Comercial" /> },
    ],
    []
  );

  const states = useMemo(
    () =>
      [...new Set(properties.map((property) => property.location.state))].map(
        (state) => ({ value: state, label: state })
      ),
    [properties]
  );

  const municipalities = useMemo(
    () =>
      selectedState
        ? [
            ...new Set(
              properties
                .filter(
                  (property) => property.location.state === selectedState.value
                )
                .map((property) => property.location.municipality)
            ),
          ].map((municipality) => ({ value: municipality, label: municipality }))
        : [],
    [selectedState, properties]
  );

  return (
    <div>
      <Navbar/>
      <section className="bg-white relative">
        <div className="flex flex-col lg:flex-row h-screen">
          {/* Filter container (full screen on mobile) */}
          <div className="w-full lg:w-3/12 lg:h-screen overflow-y-auto">
            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              availabilityOptions={availabilityOptions}
              selectedAvailability={selectedAvailability}
              setSelectedAvailability={setSelectedAvailability}
              states={states}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              municipalities={municipalities}
              selectedMunicipality={selectedMunicipality}
              setSelectedMunicipality={setSelectedMunicipality}
              propertyTypeOptions={propertyTypeOptions}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              resetFilters={resetFilters}
              filteredProperties={filteredProperties}
            />
          </div>

          {/* Map container (hidden on mobile) */}
          <div className="hidden lg:block lg:w-1/2 lg:h-screen">
            <MapComponent
              properties={filteredProperties}
              hoveredProperty={hoveredProperty}
            />
          </div>

          {/* Properties container (full screen on mobile) */}
          <div className="w-full lg:w-3/12 lg:h-screen overflow-y-auto">
            <div className="px-4 mt-24 lg:mt-0 lg:px-2">
              {currentProperties.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {currentProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      shareProperty={shareProperty}
                      setHoveredProperty={setHoveredProperty}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-4xl lg:text-2xl font-light text-gray-700">
                    <FormattedMessage
                      id="noPropertiesFound"
                      defaultMessage="No se encontraron propiedades"
                    />
                  </p>
                </div>
              )}
              {currentProperties.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  propertiesPerPage={propertiesPerPage}
                  totalProperties={filteredProperties.length}
                  paginate={(pageNumber) => {
                    setCurrentPage(pageNumber);
                    localStorage.setItem("currentPage", pageNumber); // Save the current page to localStorage
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesSection;
