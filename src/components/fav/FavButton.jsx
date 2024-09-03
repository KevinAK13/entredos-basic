// components/fav/FavButton.js
import React, { useContext } from "react";
import { FiHeart } from "react-icons/fi";
import { FavoritesContext } from "../../context/FavoritesContext";

const HeartButton = ({ property }) => {
  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoritesContext);

  const isFavorite = favorites.some((fav) => fav.id === property.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`text-lg p-2 rounded-full shadow-sm transition duration-300 ease-in-out transform hover:scale-105 ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-500/70 text-white"
      }`}
      aria-label="Agregar a favoritos"
    >
      <FiHeart />
    </button>
  );
};

export default HeartButton;
