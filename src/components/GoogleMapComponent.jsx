import React, { useEffect, useRef, useContext } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ThemeContext } from "../context/ThemeContext";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const venues = [
  {
    name: "UPTD Taman Budaya Gerson Poyk",
    position: { lat: -10.176187, lng: 123.613261 },
  },
  {
    name: "Aula BPMP Provinsi NTT",
    position: { lat: -10.180522, lng: 123.602614 },
  },
];

const libraries = ["marker"];

const GoogleMapComponent = () => {
  const { theme } = useContext(ThemeContext);
  const mapRef = useRef(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const mapId =
    theme === "dark"
      ? "42038a5ab7166188" // FlobamoraDarkStyle
      : "c3acef777ebc7135"; // flobamora-light-map

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  const handleMapLoad = (map) => {
    mapRef.current = map;
    map.setTilt(45);
    map.setHeading(90);

    venues.forEach((venue) => {
      new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: venue.position,
        title: venue.name,
      });
    });
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      key={theme} // ← Force remount when theme changes
      mapContainerStyle={mapContainerStyle}
      center={venues[0].position}
      zoom={16}
      onLoad={handleMapLoad}
      options={{
        mapId,
        mapTypeId: "roadmap",
        disableDefaultUI: false,
        rotateControl: true,
        tilt: 45,
        heading: 90,
      }}
    />
  );
};

export default GoogleMapComponent;
