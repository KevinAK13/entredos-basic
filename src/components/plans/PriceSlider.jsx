import React from "react";
import Slider from "react-slider";
import { FormattedMessage } from "react-intl";

const PriceSlider = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, formatPrice }) => {
  const sliderMin = 0; // Define el valor mínimo del rango del slider
  const sliderMax = 50000000; // Define el valor máximo del rango del slider (puedes ajustarlo según lo que necesites)

  return (
    <div className="price-slider-container w-full">
      <div className="slider-container w-full px-4 lg:px-0 mt-8">
        <h2 className="my-2 py-2 text-sm text-center uppercase third-font font-light">
          <FormattedMessage id="slider.priceRange" defaultMessage="Price Range" />
        </h2>
        {/* Slider de Precio Minimalista */}
        <Slider
          value={[minPrice, maxPrice]}
          min={sliderMin} // Establece el rango mínimo fijo del slider
          max={sliderMax} // Establece el rango máximo fijo del slider
          step={1000} // Ajuste fino para el slider
          onChange={(value) => {
            setMinPrice(value[0]); // Actualiza el precio mínimo
            setMaxPrice(value[1]); // Actualiza el precio máximo
          }}
          className="price-slider w-full mt-4"
          renderTrack={(props, state) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "4px", // Ajuste del grosor para mejor visibilidad
                borderRadius: "2px",
                background: state.index === 1 ? "#333" : "#F3F4F6", // Cambia el color fuera del rango
              }}
            />
          )}
          renderThumb={(props) => (
            <div {...props} className="flex items-center justify-center">
              <div
                style={{
                  height: "16px",
                  width: "16px",
                  backgroundColor: "#000000", // Negro para un look limpio
                  borderRadius: "50%",
                  border: "2px solid #ffff", // Borde blanco para contraste
                  marginTop: "-6px", // Alineación vertical con la barra
                }}
              />
            </div>
          )}
          ariaLabel={["Minimum Price", "Maximum Price"]} // Accesibilidad
        />
      </div>
      <div className="flex justify-between pt-6 mt-8 mb-4 text-sm font-light tracking-wide third-font text-gray-700">
        <span>{formatPrice(minPrice)}</span>
        <span>{formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default PriceSlider;
