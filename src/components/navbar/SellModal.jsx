import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { FormattedMessage, useIntl } from "react-intl";

const PropertyModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("sell");
  const [isHuman, setIsHuman] = useState(false);
  const [shakeFields, setShakeFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);

  const emailRef = useRef();
  const phoneRef = useRef();
  const propertyTypeRef = useRef();
  const locationRef = useRef();
  const captchaRef = useRef();

  const intl = useIntl(); // Initialize the intl variable

  const propertyTypes = [
    { value: "house", label: <FormattedMessage id="propertyType.house" defaultMessage="House" /> },
    { value: "apartment", label: <FormattedMessage id="propertyType.apartment" defaultMessage="Apartment" /> },
    { value: "land", label: <FormattedMessage id="propertyType.land" defaultMessage="Land" /> },
    { value: "commercial", label: <FormattedMessage id="propertyType.commercial" defaultMessage="Commercial" /> },
  ];

  const purposeOptions = [
    { id: "sell", label: <FormattedMessage id="form.purpose.sell" defaultMessage="Sell" /> },
    { id: "rent", label: <FormattedMessage id="form.purpose.rent" defaultMessage="Rent" /> },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0",
      height: "3.0rem",
      borderColor: "transparent",
      borderBottom: "1px solid #000000",
      backgroundColor: "#FFFFFF",
      color: "#000000",
      boxShadow: "none",
      "&:hover": {
        borderColor: "transparent",
        borderBottom: "1px solid #000000",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f0f0f0" : "#fff",
      color: "#333",
      "&:hover": {
        backgroundColor: "#e5e5e5",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#666",
      fontSize: "0.875rem",
    }),
  };

  function validateForm() {
    const fieldsToShake = {};

    if (!name) fieldsToShake.name = true;
    if (!email) fieldsToShake.email = true;
    if (!phone) fieldsToShake.phone = true;
    if (!propertyType) fieldsToShake.propertyType = true;
    if (!location) fieldsToShake.location = true;
    if (!isHuman) fieldsToShake.captcha = true;

    setShakeFields(fieldsToShake);

    return Object.keys(fieldsToShake).length === 0;
  }

  function handlePublish(e) {
    e.preventDefault();
    setLoading(true);
    setShakeFields({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const serviceID = "service_ryu9gbd";
    const templateID = "template_kzqvbao";
    const userID = "IP5WXH54j8p64Og15";

    const templateParams = {
      name,
      email,
      phone,
      propertyType,
      location,
      purpose,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((result) => {
        console.log("SUCCESS!", result.text);
        setMessageStatus("success");
        setLoading(false);
      }, (error) => {
        console.log("FAILED...", error.text);
        setMessageStatus("error");
        setLoading(false);
      });
  }

  const bounceTransition = {
    x: { type: "spring", stiffness: 500, damping: 10 },
  };

  const renderMessageStatus = () => {
    if (messageStatus === "success") {
      return (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            <FormattedMessage id="form.successMessageTitle" defaultMessage="Property Submitted!" />
          </h2>
          <p className="text-lg text-gray-900 mb-6">
            <FormattedMessage id="form.successMessageContent" defaultMessage="We will contact you very soon." />
          </p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="px-6 py-3 text-lg font-light text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              onClick={onClose}
            >
              <FormattedMessage id="form.closeButton" defaultMessage="Close" />
            </button>
            <button
              type="button"
              className="px-6 py-3 text-lg font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              onClick={() => {
                setMessageStatus(null);
                setName("");
                setEmail("");
                setPhone("");
                setPropertyType("");
                setLocation("");
                setIsHuman(false);
              }}
            >
              <FormattedMessage id="form.publishAnotherButton" defaultMessage="Publish Another Property" />
            </button>
          </div>
        </div>
      );
    } else if (messageStatus === "error") {
      return <p className="text-red-500 mt-2"><FormattedMessage id="form.errorMessageModal" defaultMessage="Could not publish the property. Please try again." /></p>;
    }
    return null;
  };

  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0" },
    exit: { opacity: 0, y: "100vh" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        >
          <motion.div
            className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-xl transform transition-all"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <Dialog.Panel>
              <Dialog.Title className="text-3xl font-semibold text-gray-900 text-center">
                <FormattedMessage id="form.title" defaultMessage="Publish Property" />
              </Dialog.Title>

              {messageStatus === "success" ? (
                renderMessageStatus()
              ) : (
                <>
                  <div className="mt-6 flex justify-center">
                    <div className="inline-flex rounded-md shadow-sm">
                      {purposeOptions.map((option, index) => (
                        <button
                          key={option.id}
                          onClick={() => setPurpose(option.id)}
                          className={`px-16 py-1 font-light text-xl transition-colors duration-300 ${
                            purpose === option.id
                              ? "bg-gray-950 text-white"
                              : "bg-gray-200 text-gray-400 hover:bg-gray-200"
                          } ${index === 0 ? 'rounded-l-md' : ''} ${index === purposeOptions.length - 1 ? 'rounded-r-md' : ''}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form className="mt-8 space-y-6" onSubmit={handlePublish}>
                    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
                      <motion.div
                        animate={shakeFields.name ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={bounceTransition}
                      >
                        <label htmlFor="name" className="block text-lg font-light text-gray-700">
                          <FormattedMessage id="form.nameLabel" defaultMessage="Name" />
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (e.target.value.length > 2 ) emailRef.current.focus();
                          }}
                          className="mt-2 block w-full px-4 py-3 border-b border-gray-800 focus:ring-gray-700"
                          placeholder={intl.formatMessage({ id: "form.namePlaceholder", defaultMessage: "Enter your name" })}
                        />
                      </motion.div>

                      <motion.div
                        animate={shakeFields.email ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={bounceTransition}
                      >
                        <label htmlFor="email" className="block text-lg font-light text-gray-700">
                          <FormattedMessage id="form.emailLabel" defaultMessage="Email" />
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          ref={emailRef}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value.includes("@")) phoneRef.current.focus();
                          }}
                          className="mt-2 block w-full px-4 py-3 border-b border-gray-800 focus:ring-gray-700"
                          placeholder={intl.formatMessage({ id: "form.emailPlaceholder", defaultMessage: "Enter your email" })}
                        />
                      </motion.div>

                      <motion.div
                        animate={shakeFields.phone ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={bounceTransition}
                      >
                        <label htmlFor="phone" className="block text-lg font-light text-gray-700">
                          <FormattedMessage id="form.phoneLabel" defaultMessage="Phone Number" />
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          ref={phoneRef}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (e.target.value.length >= 10) propertyTypeRef.current.focus();
                          }}
                          className="mt-2 block w-full px-4 py-3 border-b border-gray-800 focus:ring-gray-700"
                          placeholder={intl.formatMessage({ id: "form.phonePlaceholder", defaultMessage: "Enter your phone number" })}
                        />
                      </motion.div>

                      <motion.div
                        animate={shakeFields.propertyType ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={bounceTransition}
                      >
                        <label htmlFor="propertyType" className="block text-lg font-light text-gray-700">
                          <FormattedMessage id="form.propertyTypeLabel" defaultMessage="Property Type" />
                        </label>
                        <Select
                          id="propertyType"
                          name="propertyType"
                          ref={propertyTypeRef}
                          value={propertyTypes.find((type) => type.value === propertyType)}
                          onChange={(option) => {
                            setPropertyType(option.value);
                            locationRef.current.focus();
                          }}
                          options={propertyTypes}
                          styles={customStyles}
                          placeholder={intl.formatMessage({ id: "select.propertyTypePlaceholder", defaultMessage: "Select property type" })}
                          className="mt-2"
                          classNamePrefix="react-select"
                        />
                      </motion.div>

                      <motion.div
                        className="md:col-span-2"
                        animate={shakeFields.location ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={bounceTransition}
                      >
                        <label htmlFor="location" className="block text-lg font-light text-gray-700">
                          <FormattedMessage id="form.locationLabel" defaultMessage="Location" />
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          ref={locationRef}
                          value={location}
                          onChange={(e) => {
                            setLocation(e.target.value);
                            if (e.target.value.length > 20) captchaRef.current.focus();
                          }}
                          className="mt-2 block w-full px-4 py-3 border-b border-gray-800 focus:ring-gray-700"
                          placeholder={intl.formatMessage({ id: "form.locationPlaceholder", defaultMessage: "Enter the location" })}
                        />
                      </motion.div>

                      <motion.div
                        className="md:col-span-2"
                        animate={shakeFields.captcha ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={bounceTransition}
                      >
                        <div className="flex items-center mt-6">
                          <div className="relative w-6 h-6">
                            <input
                              type="checkbox"
                              id="captcha"
                              ref={captchaRef}
                              checked={isHuman}
                              onChange={() => setIsHuman(!isHuman)}
                              className="appearance-none w-full h-full border border-black rounded-md bg-white checked:bg-black checked:border-transparent focus:outline-none focus:ring-gray-700 transition duration-200"
                            />
                            {isHuman && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <FaCheck className="text-white" />
                              </motion.div>
                            )}
                          </div>
                          <label htmlFor="captcha" className="ml-3 text-lg font-light text-gray-700">
                            <FormattedMessage id="form.captchaLabel" defaultMessage="I'm not a robot" />
                          </label>
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        type="button"
                        className="px-6 py-3 text-lg font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        onClick={onClose}
                      >
                        <FormattedMessage id="form.cancelButton" defaultMessage="Cancel" />
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 text-lg font-light text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                      >
                        {loading ? (
                          <FormattedMessage id="form.publishingText" defaultMessage="Publishing..." />
                        ) : (
                          <FormattedMessage id="form.publishButton" defaultMessage="Publish Property" />
                        )}
                      </button>
                    </div>
                    {renderMessageStatus()}
                  </form>
                </>
              )}
            </Dialog.Panel>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PropertyModal;
