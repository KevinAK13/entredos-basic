import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";
import { langContext } from "../../context/langContext";
import { PiSunLight, PiCloudSunLight, PiCloudRainLight } from "react-icons/pi";

const WeatherInfo = ({ lat, lng }) => {
  const { lenguaje } = useContext(langContext);
  const intl = useIntl();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "c21815558256f55d79d4423974dab9a8";
        const lang = lenguaje.split('-')[0];
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=${lang}&appid=${apiKey}`
        );
        const data = response.data;
        setWeatherData({
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          weather: data.weather[0].main,
          description: data.weather[0].description,
        });
      } catch (err) {
        setError(intl.formatMessage({ id: "weather.fetchError", defaultMessage: "Failed to fetch weather data." }));
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lng, lenguaje, intl]);

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <PiSunLight className="text-black" size={32} aria-label="Sunny weather" />;
      case "Clouds":
        return <PiCloudSunLight className="text-black" size={32} aria-label="Cloudy weather" />;
      case "Rain":
        return <PiCloudRainLight className="text-black" size={32} aria-label="Rainy weather" />;
      default:
        return <PiSunLight className="text-black" size={32} aria-label="Weather icon" />;
    }
  };

  if (loading) {
    return <div className="text-center text-gray-700 third-font font-light">
      <FormattedMessage id="weather.loading" defaultMessage="Loading..." />
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 third-font font-light">
      {error}
    </div>;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between bg-white lg:border border-gray-50 p-4 rounded-md lg:shadow-sm w-full max-w-full sm:max-w-2xl mx-auto mt-4 space-y-4 sm:space-y-0">
      <div className="flex items-center justify-center w-full sm:w-auto">
        {getWeatherIcon(weatherData.weather)}
        <div className="ml-3 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-thin third-font">
            {weatherData.temperature}°C
          </h3>
          <p className="text-sm sm:text-lg text-gray-500 capitalize third-font font-light">
            {weatherData.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-auto items-center sm:items-end">
        <div className="flex justify-center sm:justify-start w-full sm:w-auto space-x-2">
          <span className="text-xs sm:text-sm text-gray-500 third-font font-light">
            <FormattedMessage id="weather.feelsLike" defaultMessage="Feels Like" />
          </span>
          <span className="text-sm sm:text-base third-font font-light">
            {weatherData.feelsLike}°C
          </span>
        </div>
        <div className="flex justify-center sm:justify-start w-full sm:w-auto space-x-2 mt-2">
          <span className="text-xs sm:text-sm text-gray-500 third-font font-light">
            <FormattedMessage id="weather.humidity" defaultMessage="Humidity" />
          </span>
          <span className="text-sm sm:text-base third-font font-light">
            {weatherData.humidity}%
          </span>
        </div>
        <div className="text-xs text-gray-400 third-font font-light mt-1 sm:mt-2">
          <FormattedMessage id="weather.source" defaultMessage="Data by OpenWeatherMap" />
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
