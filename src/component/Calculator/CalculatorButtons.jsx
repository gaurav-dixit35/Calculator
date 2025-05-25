import React, { useState } from "react";

const basicButtons = [
  "7", "8", "9", "/", "C",
  "4", "5", "6", "*", "%",
  "1", "2", "3", "-", "Ans",
  "0", ".", "=", "+", "x","⌫",
];

const scientificButtons = [
   "7", "8", "9", "/", "C",
  "4", "5", "6", "*", "%",
  "1", "2", "3", "-", "Ans",
  "0", ".", "=", "+", "x","⌫",
  "(", ")", "^", "√", "!",
  "x²", "log", "ln", "10^x", "e",
  "sin", "cos", "tan", "π", "Deg/Rad",
];

const CalculatorButtons = ({ onClick, angleMode, toggleAngleMode }) => {
  const [activeTab, setActiveTab] = useState("Scientific"); // ✅ Default to Scientific

  const buttonsToShow = activeTab === "Basic" ? basicButtons : scientificButtons;

  const handleClick = (btn) => {
    switch (btn) {
      case "√":
        return onClick("sqrt(");
      case "π":
        return onClick("pi");
      case "e":
        return onClick("e");
      case "x²":
        return onClick("^2");
      case "10^x":
        return onClick("10^");
      case "Ans":
        return onClick("Ans");
      case "Deg/Rad":
        return toggleAngleMode();
      default:
        return onClick(btn);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 gap-4">
        {["Basic", "Scientific"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {buttonsToShow.map((btn, idx) => (
          <button
            key={idx}
            className={`p-3 rounded text-white font-semibold ${
              btn === "C"
                ? "bg-red-500 hover:bg-red-600"
                : btn === "="
                ? "bg-green-500 hover:bg-green-600"
                : btn === "Deg/Rad"
                ? "bg-purple-500 hover:bg-purple-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => handleClick(btn)}
          >
            {btn === "Deg/Rad" ? angleMode : btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorButtons;
