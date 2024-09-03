import React, { useContext, useState } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";
import Select from "react-select";
import { AiOutlineWhatsApp } from "react-icons/ai";
import HeartButton from "../fav/FavButton";
import { PiShareNetworkLight } from "react-icons/pi";
import { FormattedMessage } from "react-intl";

const FavoritesSection = () => {
  const { favorites } = useContext(FavoritesContext);
  const [sortOption, setSortOption] = useState(null);

  const sortOptions = [
    { value: "priceAsc", label: "Precio Ascendente" },
    { value: "priceDesc", label: "Precio Descendente" },
  ];

  const sortedFavorites = favorites.sort((a, b) => {
    if (!sortOption) return 0;
    const priceA = parseFloat(a.price.toString().replace(",", ""));
    const priceB = parseFloat(b.price.toString().replace(",", ""));
    if (sortOption.value === "priceAsc") return priceA - priceB;
    if (sortOption.value === "priceDesc") return priceB - priceA;
    return 0;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      height: "40px",
      borderColor: "#E0E0E0",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#C0C0C0",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#FFFFFF",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#F0F0F0" : "#FFFFFF",
      "&:hover": {
        backgroundColor: "#F0F0F0",
      },
    }),
  };

  const shareProperty = async (property, event) => {
    event.stopPropagation();
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
  };

  const sendToWhatsApp = (property) => {
    const message = `Hola, estoy interesado en la propiedad ${property.title.props.defaultMessage} con ID ${property.id}. ¿Podrías darme más información?`;
    const whatsappUrl = `https://wa.me/+529841003965?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="mt-24 bg-color-bg min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-4xl font-light text-center mb-8">
          <FormattedMessage
            id="favorites.title"
            defaultMessage="Mis Favoritos"
          />
        </h2>
        <div className="mb-8 flex justify-center">
          <Select
            value={sortOption}
            onChange={setSortOption}
            options={sortOptions}
            placeholder="Ordenar por"
            className="lg:w-1/3 w-full text-black rounded-sm z-1 text-sm"
            styles={customStyles}
          />
        </div>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-700">
            <FormattedMessage
              id="favorites.empty"
              defaultMessage="No tienes propiedades favoritas."
            />
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {sortedFavorites.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row items-start lg:items-start p-6 relative hover:scale-105 transition-all ease-in-out"
              >
                <div className="relative w-full lg:w-1/3 flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
                  <Link to={`/properties/${property.id}`}>
                    <img
                      src={property.image}
                      alt={property.title.props.defaultMessage}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <HeartButton property={property} />
                    <button
                      className="text-white bg-gray-500/70 text-lg p-2 rounded-full shadow-sm transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={(event) => shareProperty(property, event)}
                      aria-label="Compartir propiedad"
                    >
                      <PiShareNetworkLight />
                    </button>
                  </div>
                </div>
                <div className="flex-1 lg:pl-4">
                  <Link to={`/properties/${property.id}`}>
                    <h3 className="lg:text-4xl text-xl font-light text-gray-800 mb-2">
                      {property.title.props.defaultMessage}
                    </h3>
                    <p className="lg:text-2xl text-gray-600 mb-4">
                      {property.location.municipality.props.defaultMessage},{" "}
                      {property.location.state.props.defaultMessage}
                    </p>
                    <p className="text-2xl mt-4 font-extralight text-gray-900">
                      ${formatPrice(property.price)}
                    </p>
                  </Link>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => sendToWhatsApp(property)}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-green-600"
                  >
                    <AiOutlineWhatsApp className="mr-2" /> WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesSection;
