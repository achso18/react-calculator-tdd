import React, { useRef, useEffect, useState } from "react";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";
import "./Calculator.css";

const Calculator = () => {
  const numbers = ["9", "8", "7", "6", "5", "4", "3", "2", "1", ".", "0", "ce"],
    operators = ["/", "*", "-", "+"];

  const [displayValue, setDisplayValue] = useState("0");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [storedValue, setStoredValue] = useState("");
  const [keyActive, setKeyActive] = useState({});

  // focus Calculator on render to make keyboard input work
  const calculatorContainer = useRef(null);
  useEffect(() => {
    calculatorContainer.current.focus();
  });

  const handleKeyPress = event => {
    if (/^\d{1}|\./.test(event.key)) {
      updateDisplay(event.key);
      setKeyActive({
        [event.key]: true
      });
    }
    if (/[/+*-]/.test(event.key)) {
      setOperator(event.key);
      setKeyActive({
        [event.key]: true
      });
    }
    if (event.key === "Enter") {
      callOperator();
      setKeyActive({ Enter: true });
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      updateDisplay("ce");
      setKeyActive({
        [event.key]: true
      });
    }
  };

  const callOperator = () => {
    // temp variable for updating state storedValue
    const updateStoredValue = displayValue;

    let display = parseFloat(displayValue);
    let stored = parseFloat(storedValue);

    switch (selectedOperator) {
      case "+":
        display = stored + display;
        break;
      case "-":
        display = stored - display;
        break;
      case "*":
        display = stored * display;
        break;
      case "/":
        display = stored / display;
        break;
      default:
        // set to 0 if no matches
        display = "0";
    }

    //check for 'NaN' or 'Infinity'
    if (display.toString() === "NaN" || display.toString() === "Infinity")
      display = "0";

    //reset selectedOperator
    setSelectedOperator("");
    setDisplayValue(display.toString());
    setStoredValue(updateStoredValue);
  };

  const setOperator = value => {
    // check if selectedOperator already has a value
    if (selectedOperator === "") {
      setStoredValue(displayValue);
      setDisplayValue("0");
      setSelectedOperator(value);
    } else {
      // change of perator only
      setSelectedOperator(value);
    }
  };

  const updateDisplay = value => {
    let display = displayValue;
    // prevent multiple occurences of '.'
    if (value === "." && display.includes(".")) value = "";

    if (value === "ce") {
      //delete last char in displayValue
      display = display.substr(0, display.length - 1);
      // set displayValue to '0' if empty
      if (display === "") display = "0";
    } else {
      // replace displayValue with value if displayValue eq to '0'
      // else concatenate displayValue and values
      display === "0" ? (display = value) : (display += value);
    }
    setDisplayValue(display);
  };

  return (
    <div
      ref={calculatorContainer}
      className="calculator-container"
      data-testid="calculator"
      tabIndex="-1"
      onKeyDown={handleKeyPress}
      onKeyUp={() => setKeyActive({})}
    >
      <Display displayValue={displayValue} />
      <Keypad
        callOperator={callOperator}
        numbers={numbers}
        operators={operators}
        setOperator={setOperator}
        updateDisplay={updateDisplay}
        keyActive={keyActive}
      />
    </div>
  );
};

export default Calculator;
