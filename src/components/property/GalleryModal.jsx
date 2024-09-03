import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

const GalleryModal = ({
  isOpen,
  closeModal,
  gallery,
  currentIndex,
  setCurrentIndex,
}) => {
  const [fade, setFade] = useState(false);

  const handleChangeImage = (newIndex) => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(false);
    }, 300);
  };

  const handleNext = () => {
    handleChangeImage((currentIndex + 1) % gallery.length);
  };

  const handlePrev = () => {
    handleChangeImage((currentIndex - 1 + gallery.length) % gallery.length);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleThumbnailClick = (index) => {
    handleChangeImage(index);
  };

  const handleImageClick = () => {
    if (window.innerWidth < 768) { // Solo activar en móviles
      handleNext();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-40 inset-0 overflow-y-auto" onClose={closeModal}>
        <div
          className="flex items-center justify-center min-h-screen px-2 sm:px-4 text-center"
          onClick={closeModal} // Cerrar modal al hacer clic fuera
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/95" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Contenedor Principal más Grande y Responsive */}
            <div
              className="relative text-white rounded-sm overflow-hidden transform transition-all max-w-full md:max-w-5xl w-full p-2 sm:p-4"
              onClick={stopPropagation} // Evitar cerrar el modal al hacer clic dentro del contenedor
            >
              <div className="flex flex-col items-center">
                {/* Contenedor para la Imagen Principal */}
                <div
                  className={`relative transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'} mb-4 w-full`}
                  onClick={handleImageClick} // Cambiar de imagen al hacer clic en la imagen en móvil
                >
                  {gallery[currentIndex] && (
                    <img
                      src={gallery[currentIndex]}
                      alt={`Gallery ${currentIndex}`}
                      className="w-full h-auto object-contain rounded-sm"
                      style={{ maxHeight: '80vh' }} // Aumentar el tamaño máximo en pantallas grandes
                    />
                  )}
                </div>

                {/* Mini Galería Horizontal */}
                <div className="flex overflow-x-auto space-x-2 sm:space-x-4 py-2">
                  {gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className={`w-16 sm:w-24 h-16 sm:h-24 object-cover cursor-pointer rounded-sm transition-transform duration-300 ease-in-out transform ${
                        currentIndex === index ? 'grayscale' : 'hover:animate-pulse'
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>

          {/* Flechas de Navegación (ocultas en móvil) */}
          <button
            className="hidden sm:block fixed top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-neutral-400 p-2 sm:p-4 hover:text-white transition-all ease-in-out duration-300 z-50"
            onClick={(e) => {
              stopPropagation(e);
              handlePrev();
            }}
          >
            <IoIosArrowBack size={30} sm:size={50} />
          </button>
          <button
            className="hidden sm:block fixed top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-neutral-400 p-2 sm:p-4 hover:text-white transition-all ease-in-out duration-300 z-50"
            onClick={(e) => {
              stopPropagation(e);
              handleNext();
            }}
          >
            <IoIosArrowForward size={30} sm:size={50} />
          </button>

          {/* Botón de Cerrar */}
          <button
            onClick={closeModal}
            className="fixed top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-400 transition-all ease-in-out z-50"
            aria-label="Close Modal"
          >
            <IoMdClose size={24} sm:size={30} />
          </button>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GalleryModal;
