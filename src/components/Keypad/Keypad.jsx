import React from "react";
import PropTypes from "prop-types";
import Key from "../Key/Key";
import "./Keypad.css";

const Keypad = ({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay,
  keyActive
}) => {
  const numberKeys = numbers.map(number => (
    <Key
      key={number}
      keyAction={updateDisplay}
      keyType="number-key"
      keyValue={number}
      keyActive={keyActive[number]}
    />
  ));
  const operatorsKeys = operators.map(operator => (
    <Key
      key={operator}
      keyAction={setOperator}
      keyType="operator-key"
      keyValue={operator}
      keyActive={keyActive[operator]}
    />
  ));

  return (
    <div className="keypad-container" data-testid="keypad-container">
      <div className="numbers-container">{numberKeys}</div>
      <div className="operators-container">{operatorsKeys}</div>
      <div className="submit-container">
        <Key
          keyAction={callOperator}
          keyType="submit-key"
          keyValue="="
          keyActive={keyActive["Enter"]}
        />
      </div>
    </div>
  );
};

Keypad.propTypes = {
  callOperator: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired,
  operators: PropTypes.array.isRequired,
  setOperator: PropTypes.func.isRequired,
  updateDisplay: PropTypes.func.isRequired
};

export default Keypad;
