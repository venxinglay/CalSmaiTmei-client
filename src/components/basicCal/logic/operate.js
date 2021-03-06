import Big from "big.js";

export default function operate(numberOne, numberTwo, operation) {
  const one = Big(numberOne || "0");
  const two = Big(numberTwo || (operation === "÷" || operation === 'x' ? "1": "0")); //If dividing or multiplying, then 1 maintains current value in cases of null
  let temp = 0;
  if (operation === "+") {
    return one.plus(two).toString();
  }
  if (operation === "-") {
    return one.minus(two).toString();
  }
  if (operation === "x") {
    return one.times(two).toString();
  }
  if (operation === "%") {
    return one.times(two).toString();
  }
  if (operation === "÷") {
    if (two == "0") {
      
      return "error";
    } else {
      temp = one.div(two);
      return temp.toString();
    }
  }
  throw Error(`Unknown operation '${operation}'`);
}
