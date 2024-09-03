import React from "react";
import WeatherInfo from "./WeatherInfo";
import PropertyDistances from "./PropertyDistances";

const PropertyFeatures = ({ project }) => {
  const { features, description2, coordinates, distances } = project;

  return (
    <section className="bg-white">
      <hr className="border-gray-200 my-4" />

      {/* Features Section */}
      <article className="grid grid-cols-5 gap-2 justify-center items-center text-center">
        {features.map(({ label, label2 }, index) => (
          <div key={index} className="flex flex-col items-center mx-2 my-2">
            <div className="flex flex-col py-4 px-0 md:px-2">
              <p className="font-light text-lg lg:text-2xl text-gray-900">{label}</p>
              <p className="text-gray-800 font-light text-xs lg:text-sm">{label2}</p>
            </div>
          </div>
        ))}
      </article>

      <div className="lg:px-6 px-0">
        {/* Additional Description */}
        {description2 && (
          <section className="max-w-4xl mx-auto mt-4 mb-12 text-sm sm:text-lg font-light text-gray-700 leading-relaxed text-justify">
            <h2 className="text-2xl font-semibold mb-4"></h2>
            <p>{description2}</p>
          </section>
        )}

        {/* Weather Information */}
        {coordinates && (
          <section aria-labelledby="weather-info">
            <h2 id="weather-info" className="sr-only"></h2>
            <WeatherInfo lat={coordinates.lat} lng={coordinates.lng} />
          </section>
        )}

        {/* Distances to Important Points */}
        {distances && (
          <section aria-labelledby="property-distances">
            <h2 id="property-distances" className="sr-only"></h2>
            <PropertyDistances distances={distances} />
          </section>
        )}
      </div>
    </section>
  );
};

export default PropertyFeatures;
