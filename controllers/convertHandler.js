function ConvertHandler() {

  this.getNum = function (input) {
    let result;

    // Regular expressions to handle number extraction
    const doubleFractionCheck = /\/.*\//;
    const fractionCheck = /^\d+(\.\d+)?\/\d+(\.\d+)?$/;
    const decimalCheck = /^\d+(\.\d+)?$/;

    // Check for a double-fraction, which is invalid
    if (doubleFractionCheck.test(input)) {
      return "invalid number";
    }
    // Extract the number part of the input (ignoring the unit part)
    const numMatch = input.match(/^[^a-zA-Z]+/);
    const numStr = numMatch ? numMatch[0] : "";

    if (fractionCheck.test(numStr)) {
      const [numerator, denominator] = numStr.split("/").map(Number);
      result = numerator / denominator;
    } else if (decimalCheck.test(numStr)) {
      result = parseFloat(numStr);
    } else if (numStr === "") {
      // Default to 1 if no number is provided
      result = 1;
    } else {
      return "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const unit = input.match(/[a-zA-Z]+$/);
    result = unit ? unit[0] : null;

    if (!validUnits.includes(result)) {
      return "invalid unit";
    }
    return result === "l" ? "L" : result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    result = unitMap[initUnit] ?? 'invalid unit'
    return result
  };

  this.spellOutUnit = function (unit) {
    let result;
    const spellMap = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    result = spellMap[unit] ?? "Invalid unit"
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = "invalid unit";
    }
    result = parseFloat(result.toFixed(5));
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;
