import React, { useEffect, useState} from "react";
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
        console.log(dataStatistik);
        console.log("dasdawdaw");
      })
      .catch((error) => console.error("Error fetching data:", error));
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
      },
    },
  };

  return (
    <>
      {hasLineChartData && (
        <div>
          {/* <h2 className="text-center">{dataStatistik[0]?.judul || "Statistik"}</h2> */}
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      )}
    </>
  );
};

export default StatistikData;
