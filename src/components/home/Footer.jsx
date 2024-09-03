import React, { useContext, useState } from 'react';
import { PiArrowRightLight } from 'react-icons/pi';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { AuthContext } from '../../context/AuthContext';
import { FiMail } from 'react-icons/fi'; // Importación del icono de email
import { CompanyInfo } from '../contact/CompanyInfo';
import { FormattedMessage, useIntl } from 'react-intl';

const Footer = () => {
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const intl = useIntl();

  const handleEmailSend = (e, templateId, setLoading, setStatus) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_ryu9gbd', templateId, e.target, 'IP5WXH54j8p64Og15')
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        setLoading(false);
      }, (error) => {
        console.log(error.text);
        setStatus('error');
        setLoading(false);
      });
    e.target.reset();
  };

  const renderStatusMessage = (status, successMsg, errorMsg) => {
    if (status === 'success') {
      return <p className="text-green-500 mt-2">{successMsg}</p>;
    } else if (status === 'error') {
      return <p className="text-red-500 mt-2">{errorMsg}</p>;
    }
    return null;
  };

  const handleInputValidation = (e) => {
    const { validity } = e.target;
    if (validity.patternMismatch) {
      e.target.setCustomValidity(intl.formatMessage({ id: 'footer.validation.invalidFormat', defaultMessage: 'Invalid format.' }));
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <footer className="bg-gray-950 py-14 shadow-inner">
      <div className="container mx-auto mt-24 px-6">
        {/* Redes Sociales */}
        <div className="flex justify-center space-x-8 mb-12">
          <a href={CompanyInfo.youtube} className="text-white hover:text-gray-200 transition text-4xl md:text-3xl lg:text-4xl" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href={CompanyInfo.instagram} className="text-white hover:text-gray-200 transition text-4xl md:text-3xl lg:text-4xl" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href={CompanyInfo.tiktok} className="text-white hover:text-gray-200 transition text-4xl md:text-3xl lg:text-4xl" aria-label="TikTok">
            <FaTiktok />
          </a>
          <a href={CompanyInfo.facebook} className="text-white hover:text-gray-200 transition text-4xl md:text-3xl lg:text-4xl" aria-label="Facebook">
            <FaFacebookF />
          </a>
        </div>
          {/* Newsletter */}

<div className="text-center mb-12">
  <form
    className="space-y-6 mt-4 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto"
    onSubmit={(e) =>
      handleEmailSend(e, 'template_y5gwsud', setLoadingNewsletter, setNewsletterStatus)
    }
  >
    <h2 className="third-font font-light text-white text-2xl md:text-2xl lg:text-3xl">
      <FormattedMessage id="footer.subscribeNewsletter" defaultMessage="Subscribe" />
    </h2>

    <input type="hidden" name="to_email" value={CompanyInfo.email} />

    <div className="flex flex-col sm:flex-row items-center space-y-0 sm:space-y-0 sm:space-x-0 relative">
      {/* Contenedor del input con ícono */}
      <div className="relative w-full sm:flex-grow">
        {/* Ícono de correo electrónico */}
        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-100" size={20} />
        
        {/* Campo de entrada de correo */}
        <input
          type="email"
          name="email"
          placeholder={intl.formatMessage({
            id: 'footer.placeholder.emailnews',
            defaultMessage: 'Suscríbete a nuestro newsletter',
          })}
          className="w-full pl-12 text-center md:text-left rounded-t-lg sm:rounded-l-lg sm:rounded-r-none border border-gray-100 bg-transparent text-gray-100 placeholder-gray-100 third-font font-light tracking-wide focus:outline-none transition-all duration-300 py-3 px-4"
          required
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
          title={intl.formatMessage({
            id: 'footer.validation.email',
            defaultMessage: 'Please enter a valid email address.',
          })}
          onInput={handleInputValidation}
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto flex items-center justify-center border text-white rounded-b-lg sm:rounded-r-lg sm:rounded-l-none py-3 px-6 font-light focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 shadow-md"
      >
        {loadingNewsletter ? (
          <div className="mr-2 loader"></div>
        ) : (
          <>
            <FormattedMessage id="footer.subscribe" defaultMessage="Subscribe" />
            <PiArrowRightLight className="ml-2" aria-label="arrow icon" />
          </>
        )}
      </button>
    </div>

    {renderStatusMessage(
      newsletterStatus,
      'Subscribed successfully!',
      'Failed to subscribe. Please try again.'
    )}
  </form>
</div>





        {/* Contacto, Formulario de Mensaje y Enlaces */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className='md:block hidden'>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-white">
              <FormattedMessage id="footer.contactYou" defaultMessage="We'll contact you" />
            </h2>
            <form className="space-y-6" onSubmit={(e) => handleEmailSend(e, 'template_kzqvbao', setLoadingMessage, setMessageStatus)}>
              <input type="hidden" name="to_email" value={CompanyInfo.email} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder={intl.formatMessage({ id: 'footer.placeholder.firstName', defaultMessage: 'First Name' })}
                  className="w-full border-b font-light text-sm border-white bg-gray-950 text-white placeholder-white focus:outline-none focus:border-white transition"
                  required
                  pattern="^[a-zA-Z]+$"
                  title={intl.formatMessage({ id: 'footer.validation.firstName', defaultMessage: 'Please enter a valid first name.' })}
                  onInput={handleInputValidation}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder={intl.formatMessage({ id: 'footer.placeholder.lastName', defaultMessage: 'Last Name' })}
                  className="w-full border-b font-light text-sm border-white bg-gray-950 text-white placeholder-white focus:outline-none focus:border-white transition"
                  required
                  pattern="^[a-zA-Z]+$"
                  title={intl.formatMessage({ id: 'footer.validation.lastName', defaultMessage: 'Please enter a valid last name.' })}
                  onInput={handleInputValidation}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder={intl.formatMessage({ id: 'footer.placeholder.email', defaultMessage: 'Email' })}
                  className="w-full border-b font-light text-sm border-white bg-gray-950 text-white placeholder-white focus:outline-none focus:border-white transition"
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                  title={intl.formatMessage({ id: 'footer.validation.email', defaultMessage: 'Please enter a valid email address.' })}
                  onInput={handleInputValidation}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder={intl.formatMessage({ id: 'footer.placeholder.phone', defaultMessage: 'Phone Number' })}
                  className="w-full border-b font-light text-sm border-white bg-gray-950 text-white placeholder-white focus:outline-none focus:border-white transition"
                  pattern="^[0-9]{10}$"
                  title={intl.formatMessage({ id: 'footer.validation.phone', defaultMessage: 'Please enter a valid 10-digit phone number.' })}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); // Allow only numbers
                    handleInputValidation(e);
                  }}
                />
              </div>
              <input
                type="text"
                name="message"
                placeholder={intl.formatMessage({ id: 'footer.placeholder.message', defaultMessage: 'Message' })}
                className="w-full border-b font-light text-sm border-white bg-gray-950 text-white placeholder-white focus:outline-none focus:border-white transition"
                required
                pattern="^[\w\W\s]+$"
                title={intl.formatMessage({ id: 'footer.validation.message', defaultMessage: 'Please enter a valid message.' })}
                onInput={handleInputValidation}
              />
              <button
                type="submit"
                className="flex items-center text-white font-light transition-all ease-in-out"
              >
                {loadingMessage ? (
                  <div className="mr-2"></div>
                ) : (
                  <>
                    <FormattedMessage id="footer.sendMessage" defaultMessage="Send Message" /> <PiArrowRightLight className="ml-2" aria-label="arrow icon" />
                  </>
                )}
              </button>
              {renderStatusMessage(messageStatus, 'Message sent successfully!', 'Failed to send message. Please try again.')}
            </form>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-white">
              <FormattedMessage id="footer.contactUs" defaultMessage="Contact Us" />
            </h2>
            <p className="mb-4 font-light text-white">
              WhatsApp: <a href={CompanyInfo.whatsapp} className="font-light hover:text-gray-200 transition">{CompanyInfo.phone}</a>
            </p>
            <p className="mb-4 text-white font-light">
              <a href={`mailto:${CompanyInfo.email}`} className="font-light mb-4 hover:text-gray-200 transition">{CompanyInfo.email}</a>
            </p>
            <p className="text-white font-light mb-4">
              <a href={`tel:${CompanyInfo.phone}`} className="font-light mb-4 hover:text-gray-200 transition">
                <FormattedMessage id="footer.phone" defaultMessage="Phone:" /> {CompanyInfo.phone}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-white">
              <FormattedMessage id="footer.privacyNotice" defaultMessage="Privacy Notice" />
            </h2>
            <p><a href="#" className="underline font-light hover:text-gray-200 transition text-white">
              <FormattedMessage id="footer.visitPage" defaultMessage="Visit Page" />
            </a></p>
          </div>
        </div>

        {/* Información de Derechos Reservados */}
        <div className="mt-32 text-center font-light text-white text-sm">
          &copy; 2024 {CompanyInfo.companyName}. <FormattedMessage id="footer.allRightsReserved" defaultMessage="All rights reserved." />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
