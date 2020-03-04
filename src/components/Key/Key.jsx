import React from "react";
import PropTypes from "prop-types";
import "./Key.css";

const Key = ({ keyAction, keyType, keyValue, keyActive }) => (
  <div
    data-testid="key"
    className={`key-container ${keyType} ${
      keyActive ? keyType + "-active" : ""
    }`}
    onClick={() => keyAction(keyValue)}
  >
    <p className="key-value">{keyValue}</p>
  </div>
);

Key.propTypes = {
  keyAction: PropTypes.func.isRequired,
  keyType: PropTypes.string.isRequired,
  keyValue: PropTypes.string.isRequired
};

export default Key;
