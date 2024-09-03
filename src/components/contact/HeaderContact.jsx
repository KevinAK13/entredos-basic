import React, { useState } from "react";
import { LiaInstagram, LiaFacebookF, LiaLinkedinIn } from "react-icons/lia";
import { AiOutlineYoutube, AiOutlineWhatsApp } from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { FormattedMessage, useIntl } from "react-intl"; // Importamos FormattedMessage y useIntl
import { CompanyInfo } from "./CompanyInfo"; // Importamos CompanyInfo
import emailjs from '@emailjs/browser'; // Importamos emailjs para envío de correos
import { PiArrowRightLight } from 'react-icons/pi'; // Icono de flecha

const Contact = () => {
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);

  const intl = useIntl(); // Utilizamos useIntl para obtener el objeto intl

  const handleEmailSend = (e) => {
    e.preventDefault();
    setLoadingMessage(true);

    emailjs.sendForm('service_ryu9gbd', 'template_kzqvbao', e.target, 'IP5WXH54j8p64Og15')
      .then((result) => {
        console.log(result.text);
        setMessageStatus('success');
        setLoadingMessage(false);
      }, (error) => {
        console.log(error.text);
        setMessageStatus('error');
        setLoadingMessage(false);
      });
    e.target.reset();
  };

  const renderStatusMessage = (status) => {
    if (status === 'success') {
      return (
        <p className="text-green-500 mt-2">
          <FormattedMessage id="footer.messageSuccess" defaultMessage="Mensaje enviado con éxito!" />
        </p>
      );
    } else if (status === 'error') {
      return (
        <p className="text-red-500 mt-2">
          <FormattedMessage id="footer.messageError" defaultMessage="No se pudo enviar el mensaje. Por favor, inténtelo de nuevo." />
        </p>
      );
    }
    return null;
  };

  const handleInputValidation = (e) => {
    const { validity } = e.target;
    if (validity.patternMismatch) {
      e.target.setCustomValidity(intl.formatMessage({ id: 'footer.validation.invalidFormat', defaultMessage: 'Formato inválido.' }));
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <div className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-12 lg:px-8">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl mt-12 lg:text-6xl font-normal mb-12 text-center max-w-2xl">
        <FormattedMessage id="footer.contactYou" defaultMessage="Nos pondremos en contacto contigo pronto" />
      </h1>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between items-start lg:items-center space-y-12 lg:space-y-0">
        {/* Información de Contacto */}
        <div className="flex flex-col space-y-8 lg:w-1/2 mb-12 lg:mb-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              <FormattedMessage id="contact.info.title" defaultMessage="Contactos:" />
            </h2>
            <p className="text-base sm:text-lg">{CompanyInfo.email}</p>
            <p className="text-base sm:text-lg">{CompanyInfo.phone}</p>
            <p>
              <a href={CompanyInfo.whatsapp} className="hover:text-gray-400 text-base sm:text-lg">
                <FormattedMessage id="footer.whatsapp" defaultMessage="WHATSAPP" />
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              <FormattedMessage id="contact.workingHours.title" defaultMessage="Horario de atención:" />
            </h2>
            <p className="text-2xl">11 AM — 5 PM</p>
            <p className="text-base sm:text-lg">
              <FormattedMessage id="contact.workingHours.weekdays" defaultMessage="Días hábiles" />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 mt-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                <FormattedMessage id="contact.location.title" defaultMessage="Ubicación:" />
              </h2>
              <p className="text-base sm:text-lg">{CompanyInfo.address}</p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                <FormattedMessage id="contact.socials.title" defaultMessage="Redes sociales:" />
              </h2>
              <div className="flex space-x-4">
                {CompanyInfo.instagram && (
                  <a href={CompanyInfo.instagram} className="hover:text-gray-400">
                    <LiaInstagram className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                )}
                {CompanyInfo.facebook && (
                  <a href={CompanyInfo.facebook} className="hover:text-gray-400">
                    <LiaFacebookF className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                )}
                {CompanyInfo.youtube && (
                  <a href={CompanyInfo.youtube} className="hover:text-gray-400">
                    <AiOutlineYoutube className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                )}
                {CompanyInfo.tiktok && (
                  <a href={CompanyInfo.tiktok} className="hover:text-gray-400">
                    <SiTiktok className="w-6 h-6 sm:w-8 sm:h-8" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="lg:w-1/2 w-full lg:pl-12">
          <form onSubmit={handleEmailSend} className="flex flex-col space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="first_name"
                placeholder={intl.formatMessage({ id: "footer.placeholder.firstName", defaultMessage: "Nombre" })}
                required
                pattern="^[a-zA-Z]+$"
                title={intl.formatMessage({ id: 'footer.validation.firstName', defaultMessage: 'Por favor, introduce un nombre válido.' })}
                onInput={handleInputValidation}
                className="bg-transparent border-b border-white py-3 placeholder-white focus:outline-none text-lg sm:text-xl"
              />
              <input
                type="text"
                name="last_name"
                placeholder={intl.formatMessage({ id: "footer.placeholder.lastName", defaultMessage: "Apellido" })}
                required
                pattern="^[a-zA-Z]+$"
                title={intl.formatMessage({ id: 'footer.validation.lastName', defaultMessage: 'Por favor, introduce un apellido válido.' })}
                onInput={handleInputValidation}
                className="bg-transparent border-b border-white py-3 placeholder-white focus:outline-none text-lg sm:text-xl"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder={intl.formatMessage({ id: "footer.placeholder.email", defaultMessage: "Correo electrónico" })}
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                title={intl.formatMessage({ id: 'footer.validation.email', defaultMessage: 'Por favor, introduce un correo electrónico válido.' })}
                onInput={handleInputValidation}
                className="bg-transparent border-b border-white py-3 placeholder-white focus:outline-none text-lg sm:text-xl"
              />
              <input
                type="tel"
                name="phone"
                placeholder={intl.formatMessage({ id: "footer.placeholder.phone", defaultMessage: "Número de teléfono" })}
                pattern="^[0-9]{10}$"
                title={intl.formatMessage({ id: 'footer.validation.phone', defaultMessage: 'Por favor, introduce un número de teléfono válido.' })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, ''); // Permitir solo números
                  handleInputValidation(e);
                }}
                className="bg-transparent border-b border-white py-3 placeholder-white focus:outline-none text-lg sm:text-xl"
              />
            </div>
            <textarea
              name="message"
              placeholder={intl.formatMessage({ id: 'footer.placeholder.message', defaultMessage: 'Mensaje' })}
              required
              pattern="^[\w\W\s]+$"
              title={intl.formatMessage({ id: 'footer.validation.message', defaultMessage: 'Por favor, introduce un mensaje válido.' })}
              onInput={handleInputValidation}
              className="bg-transparent border-b border-white py-3 placeholder-white focus:outline-none text-lg sm:text-xl"
            />
            <button
              type="submit"
              className="flex items-center text-lg sm:text-xl font-light uppercase self-start hover:text-gray-400"
            >
              {loadingMessage ? (
                <div className="mr-2">
                  <FormattedMessage id="footer.sendingMessage" defaultMessage="Enviando mensaje..." />
                </div>
              ) : (
                <>
                  <FormattedMessage id="footer.sendMessage" defaultMessage="Enviar mensaje" />
                  <PiArrowRightLight className="ml-2" aria-label="arrow icon" />
                </>
              )}
            </button>
            {renderStatusMessage(messageStatus)}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center">
        <p className="text-base sm:text-lg">
          © 2024 {CompanyInfo.companyName}.{" "}
          <FormattedMessage id="footer.allRightsReserved" defaultMessage="Todos los derechos reservados." />
        </p>
      </footer>
    </div>
  );
};

export default Contact;
