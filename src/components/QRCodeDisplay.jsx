import React from 'react';

const QRCodeDisplay = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <p className="text-gray-500 mb-2">QR Code will appear here after submission.</p>
      <div className="border w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center">
        QR
      </div>
    </div>
  );
};

export default QRCodeDisplay;
