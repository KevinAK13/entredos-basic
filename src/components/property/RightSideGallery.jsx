import React, { useState } from "react";
import GalleryModal from "./GalleryModal";
import LocationWithButton from "./LocationWithButton";
import VisitButton from "./VisitButton";
import MenuProperty from "./MenuProperty";
import Modal from "./ModalVisit";
import PropertyForm from "./PropertyForm";
import PropertyMap from "./PropertyMap";

const RightSideGallery = ({ mainImage, gallery, location, coordinates, project, description }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGalleryModal = () => {
    setCurrentIndex(0);
    setIsGalleryOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryOpen(false);
  };

  const openFormModal = () => {
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
  };

  const handleMenuClick = (action) => {
    console.log(`Menu action selected: ${action}`);
  };

  const nextImage = gallery.length > 1 ? gallery[1] : mainImage;

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="relative rounded-sm overflow-hidden shadow-lg ml-auto">
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[99vh] xl:h-[96vh] 2xl:h-[98vh] md:rounded-l-3xl">
          <img
            src={mainImage}
            alt={description || "Main Image"}
            className="w-full h-full object-cover md:rounded-l-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:rounded-l-3xl from-black via-transparent opacity-100"></div>
          <div className="absolute sm:block hidden md:border-l border-white px-4 sm:px-6 mx-6 sm:mx-12 bottom-20 sm:bottom-28 left-4 right-0 z-20 third-font font-extralight text-white text-sm sm:text-lg">
            {description}
          </div>
        </div>

        <LocationWithButton
          location={location}  
          nextImage={nextImage}
          openModal={openGalleryModal}
        />

        <VisitButton project={project} onClick={openFormModal} />

        <MenuProperty 
          property={project} 
          onClick={handleMenuClick} 
        />
      </div>

      <GalleryModal
        isOpen={isGalleryOpen}
        closeModal={closeGalleryModal}
        gallery={gallery}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <Modal isOpen={isFormOpen} onClose={closeFormModal}>
        <PropertyForm project={project} />
        <PropertyMap coordinates={coordinates} location={location} />
      </Modal>
    </div>
  );
};

export default RightSideGallery;
