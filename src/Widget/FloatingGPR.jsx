import React, { useState } from "react";
import KominfoWidget from "./GPR-Kominfo";
import WidgetKominfo from "../WidgetKominfo";

const RotatedButton = () => {
  const [widgetVisible, setWidgetVisible] = useState(false);

  const toggleWidget = () => {
    setWidgetVisible(!widgetVisible);
  };

  return (
    <div className="fixed top-1/2 right-6">
      <button
        className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 shadow-lg rounded transform rotate-90 origin-right"
        onClick={toggleWidget}
      >
        {widgetVisible}
      </button>

      {widgetVisible && (
        <WidgetKominfo/>
      )}
    </div>
  );
};

export default RotatedButton;
