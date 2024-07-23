import React, { useState } from "react";
import KalenderWidget from "../Widget/KalenderWidget";
import Select from "react-select";
import FooterPage from "../Pages/FooterPage";

const KalenderPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => ({
    value: year,
    label: year,
  }));

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  return (
    <div className="pt-20">
      <div className="p-8">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">Kalender Tahun {selectedYear}</h1>
          <Select
            value={{ value: selectedYear, label: selectedYear }}
            onChange={handleYearChange}
            options={years}
            className="w-24 pt-4"
            
          />
        </div>
        <KalenderWidget year={selectedYear} />
      </div>
      <FooterPage/>
    </div>
  );
};

export default KalenderPage;
