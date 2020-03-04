import React from "react";
import { render } from "@testing-library/react";
import Display from "./Display";

describe("Display", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<Display displayValue={"2"} />);
    expect(getByTestId("display-container")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });
});
