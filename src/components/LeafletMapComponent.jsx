import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, LayersControl, LayerGroup, ZoomControl } from "react-leaflet";
import { ThemeContext } from "../context/ThemeContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon paths
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

const LeafletMapComponent = () => {
  const { theme } = useContext(ThemeContext);

  const centerPosition = [venues.reduce((sum, v) => sum + v.position[0], 0) / venues.length, venues.reduce((sum, v) => sum + v.position[1], 0) / venues.length];

  return (
    <div className="w-full h-[500px] bg-gray-100 dark:bg-gray-900 relative rounded-2xl overflow-hidden">
      <MapContainer center={centerPosition} zoom={15} scrollWheelZoom={false} zoomControl={false} style={{ height: "100%", width: "100%" }}>
        {/* Custom Zoom Control */}
        <ZoomControl position="topleft" />

        <LayersControl position="bottomleft">
          {/* Light Map */}
          <LayersControl.BaseLayer name="Peta Terang" checked={theme !== "dark"}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a>' />
          </LayersControl.BaseLayer>

          {/* Dark Map */}
          <LayersControl.BaseLayer name="Peta Gelap" checked={theme === "dark"}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a>' />
          </LayersControl.BaseLayer>

          {/* Satellite Map */}
          <LayersControl.BaseLayer name="Satelit">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri &mdash; Sources: Esri, USGS, etc." />
          </LayersControl.BaseLayer>

          {/* Venue Markers */}
          <LayersControl.Overlay name="Venue" checked>
            <LayerGroup>
              {venues.map((venue, index) => (
                <Marker key={index} position={venue.position}>
                  <Tooltip permanent direction="top" offset={[0, -10]} className={theme === "dark" ? "tooltip-dark" : ""}>
                    {venue.name}
                  </Tooltip>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default LeafletMapComponent;
