import React, { useState, useEffect } from 'react';

const Popup = ({ isOpen, onClose }) => {
  const [popupPage, setPopupPage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch(`${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          req: "pengumuman",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.pengumuman
            .filter(item => item.tayang_khusus === "Y" && item.gambar_khusus)
            .sort((a, b) => new Date(b.tgl_terbit) - new Date(a.tgl_terbit));
          
          if (filteredData.length > 0) {
            setPopupPage(filteredData[0]);
          }
        })
        .catch((error) => console.error("Error fetching event:", error));
    }
  }, [isOpen]);

  if (!isOpen || !popupPage) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg relative scale-90">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900 text-3xl pl-2"
          onClick={onClose}
        >
          &times;
        </button>
        <img 
          src={`${process.env.VUE_APP_API_URL}image/posting/pengumuman/${process.env.VUE_APP_OPD_ID}/original/${popupPage.gambar_khusus}`} 
          alt="Pengumuman Khusus" 
          className="max-w-full h-auto"
        />
        {/* You can render additional popupPage data here if needed */}
      </div>
    </div>
  );
};

export default Popup;
