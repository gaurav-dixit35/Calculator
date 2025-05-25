import { convertUnit } from "./convertUnit";
/* global describe, it, expect */
describe("convertUnit", () => {
  it("converts meters to kilometers", () => {
    expect(convertUnit(1000, "meters", "kilometers", "length")).toBe(1);
  });

  it("converts grams to pounds", () => {
    expect(convertUnit(1000, "grams", "pounds", "weight")).toBeCloseTo(2.204, 2);
  });

  it("converts Celsius to Fahrenheit", () => {
    expect(convertUnit(0, "celsius", "fahrenheit", "temperature")).toBe(32);
  });
});
