import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ThemeContext } from "../context/ThemeContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon path issue in Leaflet with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const venues = [
  {
    name: "UPTD Taman Budaya Gerson Poyk",
    position: [-10.176187, 123.613261],
  },
  {
    name: "Aula BPMP Provinsi NTT",
    position: [-10.180522, 123.602614],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const LeafletMapComponent = () => {
  const { theme } = useContext(ThemeContext);

  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Gunakan tema light untuk mode dark
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution = theme === "dark" ? '&copy; <a href="https://carto.com/">CARTO</a> contributors' : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div style={mapContainerStyle}>
      <MapContainer center={venues[0].position} zoom={16} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        {venues.map((venue, index) => (
          <Marker key={index} position={venue.position}>
            <Popup>{venue.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMapComponent;
