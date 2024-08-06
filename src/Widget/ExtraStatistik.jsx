import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import L from "leaflet"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statistik = () => {
  const [dataStatistik, setDataStatistik] = useState([]);
  const [mapData, setMapData] = useState([]);

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
        setDataStatistik(data.Grafik.filter(item => item.jenis_file === "Grafik"));
        setMapData(data.Grafik.find(item => item.jenis_file === "PETA")?.excel?.data || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const hasLineChartData = dataStatistik.length > 0 && dataStatistik[0]?.excel?.data.length > 0;
  
  const hasMapData = mapData.length > 0;

  const lineChartData = {
    labels: hasLineChartData ? dataStatistik[0]?.excel?.data.map((item) => item["1"]) : [],
    datasets: [
      {
        label: hasLineChartData ? dataStatistik[0]?.judul || "Statistik" : "No Data",
        data: hasLineChartData ? dataStatistik[0]?.excel?.data.map((item) => item["2"]) : [],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: hasLineChartData ? dataStatistik[0]?.judul || "Grafik Data" : "No Data",
      },
    },
  };

  return (
    <div className="w-1/3 grid grid-cols-2">
      {hasLineChartData && (
        <>
          <h2>{dataStatistik[0]?.judul || "Statistik"}</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </>
      )}
      
      {hasMapData && (
        <>
          <h2>Peta Lokasi</h2>
          <MapContainer center={[0.9278868, 104.4434775]} zoom={13} style={{ height: "500px", width: "100%", zIndex: 1 }}>
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
        </>
      )}
    </div>
  );
};

export default Statistik;
