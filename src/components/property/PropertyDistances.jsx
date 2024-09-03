import React, { useState, useEffect, useRef } from "react";
import { PiCaretRightLight } from "react-icons/pi";

const PropertyDistances = ({ distances }) => {
  const [showArrow, setShowArrow] = useState(true);
  const galleryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current.scrollLeft > 0) {
        setShowArrow(false);
      }
    };

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      galleryElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (galleryElement) {
        galleryElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="bg-white mt-8">

      {/* Contenedor principal de la galería */}
      <div
        ref={galleryRef}
        className="relative w-full h-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide"
      >
        <div className="flex space-x-4">
          {distances.map((distance, index) => {
            // Renderizar solo si alguna de las propiedades es true
            if (
              distance.hasAirport ||
              distance.hasBeach ||
              distance.hasFamousStreet ||
              distance.hasMall ||
              distance.hasRoad ||
              distance.hasCity
            ) {
              return (
                <div
  key={index}
  className="relative inline-block w-full sm:w-full z-5 h-48 sm:h-80 flex-shrink-0 rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 ease-in-out"
>
  <div className="w-full h-full relative rounded-xl overflow-hidden">
    <img
      src={distance.image}
      alt={distance.point.props.defaultMessage}
      className="w-full h-full object-cover rounded-xl"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4 sm:p-6 rounded-xl">
      <div className="text-white max-w-full text-left">
        <div className="text-lg sm:text-3xl font-thin third-font truncate">
          {distance.distance}
        </div>
        <div className="text-base sm:text-xl third-font font-light mb-1 truncate">
          {distance.point}
        </div>
      </div>
    </div>
  </div>
</div>



              );
            }
            return null; // No renderizar si todos los flags son false
          })}
        </div>

        {/* Flecha indicadora si es necesario */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 right-4 transition-opacity duration-700 ease-in-out ${
            showArrow ? "opacity-100" : "opacity-0"
          }`}
        >
          <PiCaretRightLight
            className="text-white animate-pulse"
            size={40} // Tamaño para dispositivos móviles
            // Tamaño para pantallas más grandes
            style={{ fontSize: "4rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDistances;
