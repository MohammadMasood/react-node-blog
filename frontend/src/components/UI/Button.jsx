import React from "react";
import clsx from "clsx";

const Button = ({ children, type = "button", onClick, disabled = false, variant = "primary", className = "" }) => {
  const base = "px-4 py-2 rounded-md font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={clsx(base, variants[variant], className)}>
      {children}
    </button>
  );
};

export default Button;
