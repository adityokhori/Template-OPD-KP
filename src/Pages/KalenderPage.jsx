import React, { useState } from "react";
import EvenBulanIni from "../Widget/EvenBulanIni";
import EvenTahunIni from "../Widget/EvenTahunIni";
import Select from "react-select";
import FooterPage from "../Pages/FooterPage";

const KalenderPage = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [viewMode, setViewMode] = useState("month"); // 'month' or 'year'

  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(
    (year) => ({
      value: year,
      label: year,
    })
  );

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "month" ? "year" : "month"));
  };

  return (
    <div className="pt-20">
      <div className="p-8">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl font-bold">
            Kalender Even Tahun {selectedYear}
          </h1>
          <div className="flex flex-row space-x-4">
            <Select
              value={{ value: selectedYear, label: selectedYear }}
              onChange={handleYearChange}
              options={years}
              className="w-24 pt-4"
            />
          </div>
        </div>
        <div className="relative py-8 mt-0 top-0">
          <EvenTahunIni year={selectedYear} />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default KalenderPage;
