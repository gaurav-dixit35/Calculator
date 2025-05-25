import React, { useState, useEffect } from "react";

const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    inch: 39.3701,
    foot: 3.28084,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462,
    ounce: 35.274,
  },
  temperature: {
    celsius: "c",
    fahrenheit: "f",
    kelvin: "k",
  },
  time: {
    second: 1,
    minute: 1 / 60,
    hour: 1 / 3600,
    day: 1 / 86400,
  },
  speed: {
    "m/s": 1,
    "km/h": 3.6,
    "mph": 2.23694,
    knots: 1.94384,
  },
  volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    cup: 4.22675,
  },
  area: {
    "sq meter": 1,
    "sq foot": 10.7639,
    hectare: 0.0001,
    acre: 0.000247105,
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("meter");
  const [to, setTo] = useState("kilometer");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category !== "temperature") convert();
  }, [category, from, to, value]);

  const convertTemperature = (val, fromUnit, toUnit) => {
    let temp = parseFloat(val);
    if (fromUnit === toUnit) return temp;
    // Convert from source to Celsius first
    if (fromUnit === "fahrenheit") temp = (temp - 32) * (5 / 9);
    else if (fromUnit === "kelvin") temp = temp - 273.15;
    // Convert from Celsius to target
    if (toUnit === "fahrenheit") return temp * 9 / 5 + 32;
    if (toUnit === "kelvin") return temp + 273.15;
    return temp;
  };

  const convert = async () => {
    setError("");
    if (value === "" || isNaN(value) || parseFloat(value) < 0) {
      setError("Please enter a valid, non-negative number.");
      setResult("");
      return;
    }

    const val = parseFloat(value);

    if (category === "temperature") {
      setResult(convertTemperature(val, from, to));
    } else if (category === "currency") {
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        setResult(val * data.rates[to]);
      } catch (e) {
        setError("Currency conversion failed.");
      }
    } else {
      const factor = units[category][to] / units[category][from];
      setResult(val * factor);
    }
  };

  return (
    <div
      className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md"
      role="form"
      aria-label="Unit Converter"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">🔁 Unit Converter</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <select
          aria-label="Select category"
          className="p-2 border rounded"
          value={category}
          onChange={(e) => {
            const cat = e.target.value;
            setCategory(cat);
            setFrom(Object.keys(units[cat])[0]);
            setTo(Object.keys(units[cat])[1]);
          }}
        >
          {Object.keys(units).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="currency">currency</option>
        </select>

        <select
          aria-label="From unit"
          className="p-2 border rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {Object.keys(units[category] || {}).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <select
          aria-label="To unit"
          className="p-2 border rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {Object.keys(units[category] || {}).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <input
          aria-label="Value to convert"
          type="text"
          className="p-2 border rounded"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={convert}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          aria-label="Convert"
        >
          Convert
        </button>

        <div className="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-center">
          {error && <p className="text-red-600">{error}</p>}
          {result && !error && (
            <p>
              {`${value} ${from} = ${parseFloat(result).toFixed(4)} ${to}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
