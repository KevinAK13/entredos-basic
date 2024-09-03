import React, { useState } from "react";
import GalleryModal from "./GalleryModal";

const Gallery = ({ mainImage, gallery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Imagen Principal */}
        <div className="lg:w-2/3">
          <div className="relative rounded-sm overflow-hidden shadow-lg">
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-[400px] lg:h-[500px] object-cover cursor-pointer"
              onClick={() => openModal(0)}
            />
          </div>
        </div>

        {/* Imágenes en estilo estándar */}
        <div className="lg:w-1/3 grid grid-cols-4 lg:grid-cols-2 gap-2 lg:gap-1.5">
          {gallery.slice(1, 5).map((image, index) => (  // Comienza desde la segunda imagen
            <div
              key={index}
              className="relative overflow-hidden rounded-sm shadow-md cursor-pointer"
              onClick={() => openModal(index + 1)}  // Ajustar índice al abrir modal
              style={{
                aspectRatio: '1 / 1.28',   // Relación de aspecto 1:1 para móvil
                '@media (min-width: 1024px)': {
                  aspectRatio: '1 / 2', // Relación de aspecto 1:2 para escritorio
                }
              }}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <GalleryModal
        isOpen={isOpen}
        closeModal={closeModal}
        gallery={gallery}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default Gallery;
