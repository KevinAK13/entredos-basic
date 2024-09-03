import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { FormattedMessage } from "react-intl";

const LocationWithButton = ({ location, nextImage, openModal }) => {
  return (
    <div className="absolute top-8 sm:top-14 left-4 sm:left-10 bg-white third-font p-2 rounded-2xl shadow-md flex flex-row items-center space-x-2 sm:space-x-4">
      <div className="flex flex-col space-y-1 sm:space-y-2">
        <div className="text-gray-900 text-xs sm:text-lg px-2 font-light mb-1 sm:mb-2 max-w-[150px] sm:max-w-[180px]">
          {location}
        </div>

        <div className="relative group">
          <FormattedMessage id="button.openGallery" defaultMessage="Open Gallery">
            {(msg) => (
              <button
                className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 text-lg sm:text-2xl hover:scale-105 rounded-full bg-black text-white transition-all duration-300"
                onClick={openModal}
                aria-label={msg}
              >
                <MdArrowOutward className="text-white" />
              </button>
            )}
          </FormattedMessage>
        </div>
      </div>

      <div className="w-20 sm:w-32 h-16 sm:h-28 rounded-xl overflow-hidden shadow-md cursor-pointer border-white">
        <FormattedMessage id="image.next" defaultMessage="Next in Gallery">
          {(msg) => (
            <img
              src={nextImage}
              alt={msg}
              className="w-full h-full object-cover"
              onClick={openModal}
            />
          )}
        </FormattedMessage>
      </div>
    </div>
  );
};

export default LocationWithButton;
