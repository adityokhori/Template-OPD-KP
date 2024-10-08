import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";

const WidgetKominfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showModal) {
      const script = document.createElement("script");
      script.src = "https://widget.kominfo.go.id/gpr-widget-kominfo.min.js";
      script.async = true;

      setLoading(true);

      script.onload = () => {
        setLoading(false);
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showModal]);

  return (
    <>
      <div className="fixed top-2/3 right-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transform rotate-90 origin-right"
        >
          GPR Kominfo
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div
          id="gpr-kominfo-widget-container"
          className="p-4 bg-white shadow rounded-lg absolute top-1/5 right-0 mt-10"
        >
        </div>
      </Modal>
    </>
  );
};

export default WidgetKominfo;