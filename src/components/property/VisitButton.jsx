import React, { useState } from "react";
import Modal from "./ModalVisit";
import PropertyForm from "./PropertyForm";
import PropertyMap from "./PropertyMap";
import { FormattedMessage } from "react-intl";

const VisitButton = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FormattedMessage id="button.visitProperty" defaultMessage="Visit Property">
        {msg => (
          <button
            className="absolute text-base sm:text-xl font-normal tracking-wide bottom-4 right-4 bg-white border py-1 sm:py-2 px-4 sm:px-8 rounded-full shadow-lg transition-all duration-300"
            onClick={handleOpenModal}
            aria-label={msg}
          >
            <FormattedMessage id="button.visit" defaultMessage="Visitar" />
          </button>
        )}
      </FormattedMessage>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col sm:flex-row h-full max-h-[90vh] w-full sm:w-auto sm:h-auto">
          <div className="w-full sm:w-1/2 p-2 sm:p-4">
            <PropertyMap coordinates={project.coordinates} location={project.location} />
          </div>
          <div className="w-full sm:w-1/2 p-2 sm:p-4 flex flex-col justify-center">
            <PropertyForm project={project} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VisitButton;
