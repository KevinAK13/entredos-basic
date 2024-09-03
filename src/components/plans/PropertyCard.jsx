import React from "react";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GoShare } from "react-icons/go";
import { FormattedMessage } from "react-intl";

const PropertyCard = ({ property, shareProperty, setHoveredProperty }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  return (
    <div
      className="p-3"
      onMouseEnter={() => setHoveredProperty(property)}
      onMouseLeave={() => setHoveredProperty(null)}
    >
      <div className="bg-white rounded-md shadow-lg overflow-hidden mb-1 transform transition-transform hover:scale-105 duration-300">
        <div className="relative">
          <img
            className="w-full h-80 lg:h-80 object-cover font-light uppercase"
            src={property.image}
            alt={property.title.props.defaultMessage}
          />
          <Link
            to={`/properties/${property.id}`}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 hover:bg-black/20 to-transparent flex items-end p-4 transition-all ease-in-out"
          >
            <div className="text-white text-xs font-light">
              <div className="flex items-center">
                <FiMapPin className="mr-2" aria-hidden="true" />
                <p className="text-sm">
                  {property.location.municipality}, {property.location.state}
                </p>
              </div>
              <h3 className="text-lg lg:text-base font-light">
                {property.title}
              </h3>
              <h3 className="text-lg lg:text-base font-light uppercase">
                ${formatPrice(property.price)} MXN
               
                {property.landpermt === true && (
                  <span className="text-xs ml-1">
                    <FormattedMessage id="property.perSquareMeter" defaultMessage="/ por m²" />
                  </span>
                )}
              </h3>
            </div>
          </Link>
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <button
              className="text-white bg-white/10 text-lg p-2 rounded-full backdrop-blur-sm shadow-sm transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => shareProperty(property)}
              aria-label="Share property"
            >
              <GoShare />
            </button>
            {/* <HeartButton property={property} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
