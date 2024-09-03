import React, { useState, useEffect, useRef, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import { FavoritesContext } from "../../context/FavoritesContext";
import { FormattedMessage, useIntl } from "react-intl";

const MenuProperty = ({ onClick, property }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
  const intl = useIntl();

  const isFavorite = favorites.some((fav) => fav.id === property.id);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShare = async () => {
    const imageUrl = property.image;
    const propertyTitle =
      typeof property.title === "object" && property.title.props
        ? intl.formatMessage({
            id: property.title.props.id,
            defaultMessage: property.title.props.defaultMessage,
          })
        : property.title;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "property.jpg", { type: "image/jpeg" });

      if (navigator.share) {
        await navigator.share({
          title: propertyTitle,
          text: intl.formatMessage(
            {
              id: "menuProperty.shareText",
              defaultMessage: "Check out this property: {propertyTitle}",
            },
            { propertyTitle }
          ),
          files: [file],
          url: `${window.location.origin}/properties/${property.id}`,
        });
      } else {
        alert(
          intl.formatMessage({
            id: "menuProperty.shareNotSupported",
            defaultMessage: "Sharing is not supported on this browser.",
          })
        );
      }
    } catch (error) {
      console.error(
        intl.formatMessage({
          id: "menuProperty.shareError",
          defaultMessage: "Error sharing the property:",
        }),
        error
      );
    }
  };

  const handleSave = () => {
    if (isFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
    toggleMenu();
  };

  return (
    <div className="relative" ref={menuRef}>
      
      <button
        className="absolute text-xl sm:text-2xl font-normal tracking-wide bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white border py-1 px-1 sm:py-2 sm:px-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        onClick={toggleMenu}
        aria-label={intl.formatMessage({
          id: "menuProperty.toggleMenu",
          defaultMessage: "Toggle Menu",
        })}
      >
        <AiOutlinePlus className="text-gray-800" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-12 sm:bottom-16 left-10 sm:left-14 bg-white border py-1 z-30 rounded-lg shadow-lg"
        >
          <button
            className="flex items-center third-font font-light text-sm sm:text-lg text-gray-700 hover:bg-gray-100 px-3 sm:px-4 py-1 w-full transition-colors duration-200"
            onClick={handleShare}
          >
            <FormattedMessage id="menuProperty.share" defaultMessage="Share" />
          </button>
          {/* <div className="border-t border-gray-200"></div>
          <button
            className={`flex items-center third-font font-light text-sm sm:text-lg hover:bg-gray-100 px-3 sm:px-4 py-1 w-full transition-colors duration-200 ${
              isFavorite ? "text-gray-500" : "text-gray-700"
            }`}
            onClick={handleSave}
          >
            <FormattedMessage
              id={isFavorite ? "menuProperty.unsave" : "menuProperty.save"}
              defaultMessage={isFavorite ? "Unsave" : "Save"}
            />
          </button> */}
        </motion.div>
      )}
    </div>
  );
};

export default MenuProperty;
