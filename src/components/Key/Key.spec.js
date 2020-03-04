import React from "react";
import Key from "./Key";
import { fireEvent, render } from "@testing-library/react";

describe("Key react-testing-lib", () => {
  const defaultProps = {
    keyAction: jest.fn(),
    keyType: "",
    keyValue: "5"
  };

  it("should render a key", () => {
    const { getByTestId } = render(<Key {...defaultProps} />);
    expect(getByTestId("key")).toBeInTheDocument();
  });

  it("should call keyAction function", () => {
    const { getByTestId } = render(<Key {...defaultProps} />);
    fireEvent.click(getByTestId("key"));
    expect(defaultProps.keyAction).toHaveBeenCalledTimes(1);
    expect(defaultProps.keyAction).toHaveBeenCalledWith(defaultProps.keyValue);
  });
});
