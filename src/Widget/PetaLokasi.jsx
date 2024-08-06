import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const PetaLokasi = () => {
  const [mapData, setMapData] = useState([]);
  const [judul, setJudul] = useState("");

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: "Grafik" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const petaData = data.Grafik.find(item => item.jenis_file === "PETA");
        if (petaData) {
          setMapData(petaData.excel.data || []);
          setJudul(petaData.judul); // Set the title (judul)
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const hasMapData = mapData.length > 0;

  return (
    <div>
      {hasMapData && (
        <div className="w-2/3 bg-gray-100 p-8">
          <h2 className="text-h2 text-center pb-2">{judul}</h2>
          <MapContainer center={[0.9278868, 104.4434775]} zoom={13} style={{ height: "300px", width: "100%", zIndex: 0 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapData.map((location, index) => (
              <Marker
                key={index}
                position={[location["2"], location["3"]]}
                icon={L.icon({
                  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })}
              >
                <Popup>
                  {location["1"]}
                  <br />
                  {location["4"] && <span>{location["4"]}</span>}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default PetaLokasi;
