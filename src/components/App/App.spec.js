import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";
import Calculator from "../Calculator/Calculator";

describe("App", () => {
  it("should render an app container", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("app-container")).toBeInTheDocument();
  });

  it("should render the Calculator Component", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("calculator")).toBeInTheDocument();
  });
});
