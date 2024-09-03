import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, FullscreenControl, Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FormattedMessage } from "react-intl";

const PropertyMap = ({ coordinates, location }) => {
  const mapboxAccessToken = "pk.eyJ1Ijoia2V2aW5neCIsImEiOiJjbHk3aXZtZGwwNmw3MnZvaDBkMHo4MW80In0.M2o8RUGuBdzeN4O7YjQJYQ";

  const [viewport, setViewport] = useState({
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    zoom: 16,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    }));
  }, [coordinates]);

  return (
    <div className="relative w-full h-60 sm:h-96 rounded-xl overflow-hidden shadow-lg">
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded-lg font-light z-10 text-lg shadow-md">
        <span className="text-xl">
          <FormattedMessage id="map.location" defaultMessage="Ubicación" />:
        </span> {location.address}
      </div>

      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={mapboxAccessToken}
        onMove={(evt) => setViewport(evt.viewState)}
        scrollZoom={true}
        dragPan={true}
        doubleClickZoom={true}
        touchZoom={true}
        minZoom={5}
        maxZoom={20}
        className="h-full"
      >
        <Marker
          latitude={coordinates.lat}
          longitude={coordinates.lng}
          offsetLeft={-15}
          offsetTop={-30}
        >
          <FaMapMarkerAlt size={30} color="black" />
        </Marker>
        <div className="absolute top-4 right-4">
          <NavigationControl />
        </div>
        <div className="absolute bottom-4 right-4">
          <FullscreenControl container={document.querySelector("body")} />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default PropertyMap;
