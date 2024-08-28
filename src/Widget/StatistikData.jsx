import React, { useEffect, useState } from "react";
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
import { getData} from "../API/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatistikData = () => {
  const [dataStatistik, setDataStatistik] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("Grafik");
        const grafikData = data.Grafik.filter(item => item.jenis_file === "Grafik");
        setDataStatistik(grafikData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const hasLineChartData = dataStatistik.length > 0 && dataStatistik[0]?.excel?.data.length > 0;

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
        font: {
          size: 20, 
          weight: 'bold', 
        },
      },
    },
  };
  
  const renderYearlySummary = () => {
    if (!hasLineChartData) return null;

    return dataStatistik[0]?.excel?.data.map((item, index) => (
      <div key={index} className="mb-2">
        <strong>{item["1"]}</strong>: {item["2"]}
      </div>
    ));
  };

  return (
    <>
      {hasLineChartData && (
        <div>
          <Line data={lineChartData} options={lineChartOptions} />
          <div className="mt-4">
            <h3 className="text-start mb-3">{`${dataStatistik[0]?.judul}:`}</h3>
            <div className="text-left">{renderYearlySummary()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatistikData;
