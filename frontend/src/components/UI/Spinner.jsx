import React from "react";

const Spinner = ({ size = 20, className = "" }) => (
  <div className={`inline-block border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin ${className}`} style={{ width: size, height: size }} />
);

export default Spinner;
