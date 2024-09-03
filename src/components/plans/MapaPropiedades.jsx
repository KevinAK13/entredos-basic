import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  Marker,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Supercluster from "supercluster";
import { FormattedMessage } from "react-intl";

const MapComponent = ({ properties, hoveredProperty }) => {
  const [viewport, setViewport] = useState({
    latitude: 20.1,
    longitude: -100.074306,
    zoom: 6.2,
    width: "100%",
    height: "100%",
  });

  const [popupInfo, setPopupInfo] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [supercluster, setSupercluster] = useState(null);

  const mapRef = useRef(null);
  const popupRef = useRef(null);

  const mapboxAccessToken =
    "pk.eyJ1Ijoia2V2aW5neCIsImEiOiJjbHkxeDlvbHcxMWljMnZwdzRlZzUxa3llIn0.gxi_qPrJhZqnLN019kgG9g";

  const closePopup = useCallback(() => {
    setPopupInfo(null);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    if (popupInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupInfo, closePopup]);

  useEffect(() => {
    if (hoveredProperty) {
      setPopupInfo(hoveredProperty);
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: hoveredProperty.coordinates.lat,
        longitude: hoveredProperty.coordinates.lng,
        zoom: 15,
      }));
    }
  }, [hoveredProperty]);

  useEffect(() => {
    const points = properties.map((property) => ({
      type: "Feature",
      properties: { cluster: false, propertyId: property.id, ...property },
      geometry: {
        type: "Point",
        coordinates: [property.coordinates.lng, property.coordinates.lat],
      },
    }));

    const supercluster = new Supercluster({
      radius: 75,
      maxZoom: 20,
    });

    supercluster.load(points);
    setSupercluster(supercluster);
  }, [properties]);

  useEffect(() => {
    if (supercluster && mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat();
      const clusters = supercluster.getClusters(
        bounds,
        Math.round(viewport.zoom)
      );
      setClusters(clusters);
    }
  }, [supercluster, viewport]);

  const handleMapLoad = useCallback(() => {
    if (supercluster && mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat();
      const clusters = supercluster.getClusters(
        bounds,
        Math.round(viewport.zoom)
      );
      setClusters(clusters);
    }
  }, [supercluster, viewport.zoom]);

  const calculateMarkerSize = (zoom) => {
    return Math.max(20, zoom * 2);
  };

  return (
    <div className="relative w-full h-full rounded-sm overflow-hidden shadow-lg">
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={mapboxAccessToken}
        onMove={(evt) => setViewport(evt.viewState)}
        onLoad={handleMapLoad}
        scrollZoom={true}
        dragPan={true}
        doubleClickZoom={true}
        touchZoom={true}
        minZoom={5}
        maxZoom={14.2}
        className="rounded-sm"
      >
        <div className="absolute right-4 top-4">
          <NavigationControl className="rounded-lg bg-white shadow-md" />
        </div>
        <div className="absolute right-4 bottom-4">
          <FullscreenControl
            container={document.querySelector("body")}
            className="rounded-lg bg-white shadow-md"
          />
        </div>
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          const markerSize = calculateMarkerSize(viewport.zoom);

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
                offsetLeft={-(markerSize / 2)}
                offsetTop={-(markerSize / 2)}
              >
                <div
                  className="cluster-marker rounded-full text-sm bg-gray-800 text-white border-2 border-gray-600 flex justify-center items-center cursor-pointer shadow-lg"
                  style={{
                    width: `${markerSize + 10}px`,
                    height: `${markerSize + 10}px`,
                  }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    setViewport((prevViewport) => ({
                      ...prevViewport,
                      latitude,
                      longitude,
                      zoom,
                    }));
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`property-${cluster.properties.propertyId}`}
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-(markerSize / 2)}
              offsetTop={-(markerSize / 2)}
            >
              <div
                className="w-40 h-40 bg-gray-400/20 rounded-full justify-center items-center flex"
                style={{
                  width: `${markerSize + 42}px`,
                  height: `${markerSize + 42}px`,
                }}
              >
                <div
                  className="w-12 h-12 bg-gray-400/40 rounded-full justify-center items-center flex"
                  style={{
                    width: `${markerSize + 12}px`,
                    height: `${markerSize + 12}px`,
                  }}
                >
                  <div
                    className="rounded-full bg-black justify-center cursor-pointer shadow-md flex items-center transition-transform transform hover:scale-110"
                    style={{
                      width: `${markerSize - 12}px`,
                      height: `${markerSize - 12}px`,
                    }}
                    onClick={() => setPopupInfo(cluster.properties)}
                  >
                    <div
                      className="bg-gray-900 rounded-full"
                      style={{
                        width: `${markerSize - 12}px`,
                        height: `${markerSize - 12}px`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Marker>
          );
        })}

        {popupInfo && (
<Popup
  latitude={popupInfo.coordinates.lat}
  longitude={popupInfo.coordinates.lng}
  closeButton={false}
  closeOnClick={false}
  onClose={closePopup}
  anchor="bottom"
  focusAfterOpen={true}
  className="custom-popup"
>
  <div ref={popupRef} style={{ position: "relative" }}>
    <img
      src={popupInfo.image}
      alt={popupInfo.title}
      className="custom-popup-img"
    />
    <div className="custom-popup-content">
      <Link to={`/properties/${popupInfo.id}`} onClick={closePopup}>
        <h3 className="custom-popup-title">
          {popupInfo.title}
        </h3>
        <p className="custom-popup-price">
          ${formatPrice(popupInfo.price)} MXN
          
                {popupInfo.landpermt === true && (
                  <span className="text-xs uppercase ml-1">
                    <FormattedMessage id="property.perSquareMeter" defaultMessage="/ por m²" />
                  </span>
                )}
        </p>
        <ul className="custom-popup-features">
          {popupInfo.features.map((feature, index) => (
            <li key={index} className="custom-popup-feature">
              {feature.icon}
              <span className="ml-1">{feature.label}</span>
            </li>
          ))}
        </ul>
      </Link>
    </div>
  </div>
</Popup>

        )}
      </ReactMapGL>
    </div>
  );
};

export default MapComponent;
