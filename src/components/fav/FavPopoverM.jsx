import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { FavoritesContext } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

const FavoritesPopover = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="relative w-64 uppercase bg-black text-center rounded-sm overflow-hidden shadow-sm z-50">
      {favorites.length === 0 ? (
        <p className="text-white p-4">
          <FormattedMessage
            id="favorites.empty"
            defaultMessage="No hay propiedades favoritas"
          />
        </p>
      ) : (
        <div>
          {favorites.map((property) => (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              className="block p-2 border-b border-gray-700 hover:bg-stone-800 transition-all ease-in-out"
            >
              <div className="flex items-center">
                <img
                  src={property.image}
                  alt={property.title.props.defaultMessage}
                  className="w-10 h-10 mr-2"
                />
                <div className="text-left">
                  <p className="text-white text-sm font-extralight">
                    {property.title.props.defaultMessage}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {property.location.municipality}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <Link
            to="/favorites"
            className="block p-2 bg-stone-950 hover:bg-stone-800 text-white transition-all ease-in-out rounded-b-sm"
          >
            <FormattedMessage
              id="favorites.view"
              defaultMessage="Ver Favoritos"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPopover;
