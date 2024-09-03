import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { es } from "date-fns/locale";
import { PiArrowRightLight } from "react-icons/pi";
import { FormattedMessage, useIntl } from "react-intl";

registerLocale("es", es);

const PropertyForm = ({ project }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const intl = useIntl();

  const timeOptions = [
    { value: "08:00", label: "08:00 AM" },
    { value: "09:00", label: "09:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "01:00 PM" },
    { value: "14:00", label: "02:00 PM" },
    { value: "15:00", label: "03:00 PM" },
    { value: "16:00", label: "04:00 PM" },
    { value: "17:00", label: "05:00 PM" },
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      padding: "0.1rem",
      borderColor: state.isFocused ? "#3182CE" : "#CBD5E0",
      boxShadow: state.isFocused ? "0 0 0 1px #3182CE" : "none",
      "&:hover": { borderColor: "#3182CE" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#3182CE" : state.isFocused ? "#E2E8F0" : "white",
      color: state.isSelected ? "white" : "#1A202C",
    }),
  };

  const validateForm = () => {
    if (
      (!project?.availableForRent && (!selectedDate || !selectedTime)) ||
      (project?.availableForRent && (!startDate || !endDate))
    ) {
      setErrorMessage(intl.formatMessage({ id: "form.errorMessage", defaultMessage: "Por favor, completa todos los campos." }));
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const message = project?.availableForRent
      ? intl.formatMessage(
          {
            id: "form.rentMessage",
            defaultMessage:
              "Hola, me gustaría verificar la disponibilidad para la propiedad {propertyTitle} desde el {startDate} hasta el {endDate}. ¡Gracias!",
          },
          {
            propertyTitle: project?.title?.props?.defaultMessage || project?.title,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
          }
        )
      : intl.formatMessage(
          {
            id: "form.visitMessage",
            defaultMessage:
              "Hola, me gustaría agendar una visita para la propiedad {propertyTitle}. Estoy disponible el {selectedDate} a las {selectedTime}. ¡Gracias!",
          },
          {
            propertyTitle: project?.title?.props?.defaultMessage || project?.title,
            selectedDate: selectedDate.toLocaleDateString(),
            selectedTime: selectedTime?.label,
          }
        );
    const whatsappUrl = `https://wa.me/+529841003965?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setMessageSent(true);
  };

  useEffect(() => {
    if (messageSent) {
      setSelectedDate(null);
      setSelectedTime(null);
      setStartDate(null);
      setEndDate(null);
    }
  }, [messageSent]);

  return (
    <div className="w-full bg-white mt-8 sm:mt-12 px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <h2 className="text-4xl font-light third-font text-gray-800 text-center mb-6">
        {project?.availableForRent ? (
          <FormattedMessage id="form.checkAvailability" defaultMessage="Verificar disponibilidad" />
        ) : (
          <FormattedMessage id="form.scheduleVisit" defaultMessage="Agenda tu visita" />
        )}
      </h2>
      <form onSubmit={sendToWhatsApp} className="space-y-4">
        {project?.availableForRent ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="py-2 px-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText={intl.formatMessage({ id: "form.startDate", defaultMessage: "Fecha de inicio" })}
              locale="es"
              minDate={new Date()}
              required
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="py-2 px-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText={intl.formatMessage({ id: "form.endDate", defaultMessage: "Fecha de fin" })}
              locale="es"
              minDate={new Date()}
              required
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="py-2 px-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText={intl.formatMessage({ id: "form.date", defaultMessage: "Fecha" })}
              locale="es"
              minDate={new Date()}
              required
            />
            <Select
              options={timeOptions}
              value={selectedTime}
              onChange={setSelectedTime}
              placeholder={intl.formatMessage({ id: "form.selectTime", defaultMessage: "Seleccionar Hora" })}
              styles={customSelectStyles}
              required
            />
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        {messageSent && (
          <div className="text-green-500 text-center">
            <FormattedMessage id="form.messageSent" defaultMessage="¡Mensaje enviado con éxito!" />
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 text-black uppercase transition-all flex items-center justify-center space-x-2"
        >
          <span>
            <FormattedMessage id="form.send" defaultMessage="Enviar" />
          </span>
          <PiArrowRightLight size={18} />
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
