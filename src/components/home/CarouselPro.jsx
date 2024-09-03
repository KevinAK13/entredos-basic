import React from "react";
import { FormattedMessage } from "react-intl";

import img from "../../assets/img/property/22/6.jpg";
import img3 from "../../assets/img/property/22/1.jpg";
import img2 from "../../assets/img/property/22/14.jpg";

const CTA = () => {
  return (
    <section className="w-full py-16" aria-label="Call to Action Section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-12">
        {/* Columna Izquierda */}
        <div className="lg:w-1/2 flex flex-col">
          <div>
            {/* Título y descripción */}
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-gray-800 mb-8 lg:mb-16">
              <FormattedMessage id="cta.title" defaultMessage="Tu nuevo hogar te espera" />
            </h1>
            <p className="text-base md:text-xl font-light text-gray-900 mb-8">
              <FormattedMessage
                id="cta.description"
                defaultMessage="En Entre Dos Inmobiliaria, te ofrecemos propiedades que combinan elegancia, confort y una ubicación privilegiada. Explora nuestra selección de viviendas y encuentra el espacio perfecto para ti y tu familia."
              />
            </p>
          </div>

          {/* Imagen pequeña en la parte inferior izquierda */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={img}
              alt="Casa con diseño moderno y elegante"
              className="object-cover rounded-lg shadow-lg w-full h-64 md:h-80 lg:w-[600px] lg:h-[450px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="w-full h-60 md:h-80 lg:h-[450px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={img2}
              alt="Interior luminoso y sofisticado"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="w-full h-60 md:h-80 lg:h-[450px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={img3}
              alt="Amplio jardín bien cuidado"
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
