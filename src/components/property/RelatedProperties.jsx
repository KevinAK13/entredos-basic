import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { PiArrowUp, PiArrowDown } from "react-icons/pi";
import { FormattedMessage } from "react-intl";
import properties from "../../components/plans/Data";

const RelatedProperties = ({ currentProjectId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = properties.filter((prop) => prop.id !== currentProjectId);
  const totalProjects = filteredProjects.length;

  const nextProject = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects);
  const prevProject = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);

  const formatPrice = (price) => new Intl.NumberFormat("en-US").format(price);

  return (
    <section className="py-24">
      <div className="mx-auto px-4 max-w-screen-lg">
        <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl md:text-4xl font-thin third-font text-gray-800">
            <FormattedMessage id="relatedProperties.title" defaultMessage="Descubre más propiedades" />
          </h2>
        </div>

        <div className="relative w-full max-w-2xl h-[350px] sm:h-[450px] flex justify-center items-center overflow-visible">
          {filteredProjects.map((otherProject, index) => {
            const isCurrent = index === currentIndex;
            return (
              <div
                key={otherProject.id}
                className={`absolute transition-transform duration-500 ease-in-out ${
                  isCurrent
                    ? "z-20 scale-105 opacity-100 w-full sm:w-[640px] h-[300px] sm:h-[420px]"
                    : index === (currentIndex + 1) % totalProjects
                    ? "z-10 scale-100 opacity-90 w-full sm:w-[540px] h-[270px] sm:h-[360px] translate-y-4"
                    : index === (currentIndex + 2) % totalProjects
                    ? "z-5 scale-95 opacity-80 w-full sm:w-[480px] h-[240px] sm:h-[320px] translate-y-8"
                    : "z-0 scale-90 opacity-70 w-full sm:w-[440px] h-[220px] sm:h-[300px] translate-y-12"
                }`}
                style={{
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <article className="p-2 sm:p-4">
                  <div className="rounded-lg overflow-hidden transform duration-300 flex flex-col transition-all ease-in-out">
                    <div className="relative">
                      {isCurrent ? (
                        <Link to={`/properties/${otherProject.id}`}>
                          <img
                            className="w-full h-[240px] sm:h-[320px] object-cover transition-transform hover:scale-105 duration-300"
                            src={otherProject.image}
                            alt={otherProject.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4 sm:p-6 transition-all ease-in-out">
                            <div className="text-white text-xs sm:text-sm font-light">
                              <div className="flex items-center mb-1 sm:mb-2">
                                <FiMapPin className="mr-1 sm:mr-2" aria-hidden="true" />
                                <p className="text-xs sm:text-sm">
                                  {otherProject.location.city}, {otherProject.location.state}
                                </p>
                              </div>
                              <h3 className="text-lg sm:text-xl font-light third-font leading-tight">
                                {otherProject.title}
                              </h3>
                              <h3 className="text-base sm:text-lg uppercase mt-1 sm:mt-2">
                                {formatPrice(otherProject.price)} MXN
                              </h3>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <img
                          className="w-full h-[240px] sm:h-[320px] object-cover transition-transform hover:scale-105 duration-300"
                          src={otherProject.image}
                          alt={otherProject.title}
                        />
                      )}
                      {isCurrent && (
                        <div className="absolute inset-y-0 right-0 flex flex-col justify-center items-center space-y-1 sm:space-y-2 px-1 sm:px-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevProject();
                            }}
                            className="p-1 sm:p-2 rounded-full text-white transition"
                            style={{
                              backdropFilter: "blur(20px)",
                              WebkitBackdropFilter: "blur(20px)",
                              backgroundColor: "rgba(0, 0, 0, 0.0)",
                            }}
                          >
                            <PiArrowUp size={20} sm={24} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextProject();
                            }}
                            className="p-1 sm:p-2 rounded-full text-white transition"
                            style={{
                              backdropFilter: "blur(20px)",
                              WebkitBackdropFilter: "blur(20px)",
                              backgroundColor: "rgba(0, 0, 0, 0.0)",
                            }}
                          >
                            <PiArrowDown size={20} sm={24} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedProperties;
