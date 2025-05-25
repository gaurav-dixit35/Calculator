export const convertUnit = (value, from, to, type) => {
  const conversions = {
    length: {
      meters: 1,
      kilometers: 0.001,
      feet: 3.28084,
      inches: 39.3701
    },
    weight: {
      grams: 1,
      kilograms: 0.001,
      pounds: 0.00220462,
      ounces: 0.035274
    },
    temperature: {
      celsius: (val) => val,
      fahrenheit: (val) => (val * 9/5) + 32,
      kelvin: (val) => val + 273.15
    }
  };

  if (type === "temperature") {
    return conversions.temperature[to](conversions.temperature[from](parseFloat(value)));
  }

  const base = parseFloat(value) / conversions[type][from];
  return base * conversions[type][to];
};
