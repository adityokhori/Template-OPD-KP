import React from 'react';

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900 text-3xl pl-2"
          onClick={onClose}
        >
          &times;
        </button>
        <img src='/pengumuman.png'/>
      </div>
    </div>
  );
};

export default Popup;
