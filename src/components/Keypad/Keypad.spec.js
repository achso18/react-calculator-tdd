import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Keypad from "./Keypad";

describe("Keypad", () => {
  const defaultProps = {
    numbers: ["1", "2", "3", "4"],
    operators: ["+", "-"],
    callOperator: jest.fn(),
    setOperator: jest.fn(),
    updateDisplay: jest.fn(),
    keyActive: {}
  };

  it("renders a keypad container", () => {
    const { getByTestId } = render(<Keypad {...defaultProps} />);
    expect(getByTestId("keypad-container")).toBeInTheDocument();
  });

  it("should render number keys and operator keys", () => {
    const { queryAllByText } = render(<Keypad {...defaultProps} />);
    expect(queryAllByText(/\d/)).toHaveLength(4);
    expect(queryAllByText(/[+-]/)).toHaveLength(2);
  });

  test("functions to fire correctly", () => {
    const { getByText } = render(<Keypad {...defaultProps} />);
    fireEvent.click(getByText("="));
    expect(defaultProps.callOperator).toHaveBeenCalledWith("=");
    fireEvent.click(getByText("2"));
    expect(defaultProps.updateDisplay).toHaveBeenCalledWith("2");
    fireEvent.click(getByText("+"));
    expect(defaultProps.setOperator).toHaveBeenCalledWith("+");
  });
});
