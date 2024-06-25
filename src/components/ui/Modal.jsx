// En /src/components/ui/Modal.jsx

import React from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
