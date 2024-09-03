import React, { useEffect, useRef } from "react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import sampleImage from "../../assets/img/ing13.jpg";

const ReviewSlider = () => {
  const sliderRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      const keenSlider = new KeenSlider(sliderRef.current, {
        loop: true,
        slidesPerView: 1,
        spacing: 16,
        breakpoints: {
          "(min-width: 640px)": {
            slidesPerView: 1.5,
            spacing: 24,
          },
          "(min-width: 1024px)": {
            slidesPerView: 2.5,
            spacing: 32,
          },
        },
      });

      const handlePrevButtonClick = () => keenSlider.prev();
      const handleNextButtonClick = () => keenSlider.next();

      const prevButton = prevButtonRef.current;
      const nextButton = nextButtonRef.current;

      prevButton.addEventListener("click", handlePrevButtonClick);
      nextButton.addEventListener("click", handleNextButtonClick);

      return () => {
        keenSlider.destroy();
        prevButton.removeEventListener("click", handlePrevButtonClick);
        nextButton.removeEventListener("click", handleNextButtonClick);
      };
    }
  }, []);

  return (
    <section className="bg-white py-32 lg:py-60">
      <div className="container mx-auto px-1 rounded-xl lg:px-40 relative">
        <h2 className="text-5xl uppercase font-thin text-stone-500 mb-12 text-center tracking-wider">
          Reseñas de Clientes
        </h2>
        <div className="relative rounded-xl">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <div className="bg-stone-50 p-12 lg:p-24 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={sampleImage}
                      alt="Jane Doe"
                      className="h-24 w-24 rounded-2xl border-2 border-stone-200 mr-4"
                    />
                    <div>
                      <p className="text-2xl font-light text-gray-800">
                        Jane Doe
                      </p>
                      <p className="text-sm text-gray-600">Manager</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-800 leading-relaxed mb-4 italic">
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                </p>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                  eius fuga repellat, sint aspernatur asperiores voluptatibus
                  nesciunt cumque dolores exercitationem aliquid assumenda
                  veniam tempore odit ullam dicta libero voluptas reiciendis.
                </p>
              </div>
            </div>
            {/* Repite este bloque para cada reseña */}
            <div className="keen-slider__slide">
              <div className="bg-stone-50 p-12 lg:p-24 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={sampleImage}
                      alt="John Smith"
                      className="h-24 w-24 rounded-2xl border-2 border-stone-200 mr-4"
                    />
                    <div>
                      <p className="text-2xl font-light text-gray-800">
                        John Smith
                      </p>
                      <p className="text-sm text-gray-600">Owner</p>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-800 leading-relaxed mb-4 italic">
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam."
                </p>
                <p className="text-sm text-gray-600">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                </p>
              </div>
            </div>
          </div>
          <button
            aria-label="Previous slide"
            ref={prevButtonRef}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-12 text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            <TfiAngleLeft className="w-6 h-6" />
          </button>
          <button
            aria-label="Next slide"
            ref={nextButtonRef}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-12 text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            <TfiAngleRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
