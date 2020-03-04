import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Calculator from "./Calculator";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

describe("Calculator", () => {
  it("should render correctly", () => {
    const { getByTestId, queryAllByText } = render(<Calculator />);
    expect(getByTestId("calculator")).toBeInTheDocument();
    expect(getByTestId("display-container")).toBeInTheDocument();
    expect(getByTestId("keypad-container")).toBeInTheDocument();
    expect(queryAllByText(/\d{1}|\./)).toHaveLength(12);
    expect(queryAllByText(/[/+*-]/)).toHaveLength(4);
    expect(queryAllByText("=")).toHaveLength(1);
  });

  it("updates the display when a number, the 'ce', '.' or an operator key is clicked", () => {
    const { getByText, getByTestId } = render(<Calculator />);
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("2"));
    expect(getByTestId("display-container")).toHaveTextContent("2");
    fireEvent.click(getByText("8"));
    expect(getByTestId("display-container")).toHaveTextContent("28");
    fireEvent.click(getByText("ce"));
    expect(getByTestId("display-container")).toHaveTextContent("2");
    fireEvent.click(getByText("."));
    expect(getByTestId("display-container")).toHaveTextContent("2.");
    fireEvent.click(getByText("8"));
    expect(getByTestId("display-container")).toHaveTextContent("2.8");
    fireEvent.click(getByText("+"));
    expect(getByTestId("display-container")).toHaveTextContent("0");
  });

  it("prevents multiple '.'s and leading '0's ", () => {
    const { getByText, getByTestId, getAllByText } = render(<Calculator />);
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getAllByText("0")[1]);
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("2"));
    expect(getByTestId("display-container")).toHaveTextContent("2");
    fireEvent.click(getByText("."));
    expect(getByTestId("display-container")).toHaveTextContent("2.");
    fireEvent.click(getByText("."));
    expect(getByTestId("display-container")).toHaveTextContent("2.");
  });

  it("calculates correctly", () => {
    const { getByText, getByTestId } = render(<Calculator />);
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("2"));
    expect(getByTestId("display-container")).toHaveTextContent("2");
    fireEvent.click(getByText("+"));
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("8"));
    expect(getByTestId("display-container")).toHaveTextContent("8");
    fireEvent.click(getByText("="));
    expect(getByTestId("display-container")).toHaveTextContent("10");
    fireEvent.click(getByText("/"));
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("2"));
    expect(getByTestId("display-container")).toHaveTextContent("2");
    fireEvent.click(getByText("="));
    expect(getByTestId("display-container")).toHaveTextContent("5");
    fireEvent.click(getByText("*"));
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("3"));
    expect(getByTestId("display-container")).toHaveTextContent("3");
    fireEvent.click(getByText("="));
    expect(getByTestId("display-container")).toHaveTextContent("15");
    fireEvent.click(getByText("/"));
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("5"));
    expect(getByTestId("display-container")).toHaveTextContent("5");
    fireEvent.click(getByText("="));
    expect(getByTestId("display-container")).toHaveTextContent("3");
    fireEvent.click(getByText("/"));
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.click(getByText("="));
    expect(getByTestId("display-container")).toHaveTextContent("0");
  });

  it("updates the display when a keyboard keys are pressed", () => {
    const { getByTestId } = render(<Calculator />);
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.keyDown(getByTestId("calculator"), { key: "5", keyChar: "53" });
    expect(getByTestId("display-container")).toHaveTextContent("5");
    fireEvent.keyDown(getByTestId("calculator"), { key: ".", keyChar: "190" });
    expect(getByTestId("display-container")).toHaveTextContent("5.");
    fireEvent.keyDown(getByTestId("calculator"), {
      key: "Delete",
      keyChar: "46"
    });
    expect(getByTestId("display-container")).toHaveTextContent("5");
    fireEvent.keyDown(getByTestId("calculator"), {
      key: "Backspace",
      keyChar: "8"
    });
    expect(getByTestId("display-container")).toHaveTextContent("0");
    fireEvent.keyDown(getByTestId("calculator"), { key: "3", keyChar: "51" });
    fireEvent.keyDown(getByTestId("calculator"), { key: "+", keyChar: "187" });
    fireEvent.keyDown(getByTestId("calculator"), { key: "2", keyChar: "50" });
    fireEvent.keyDown(getByTestId("calculator"), {
      key: "Enter",
      keyChar: "13"
    });
    expect(getByTestId("display-container")).toHaveTextContent("5");
    fireEvent.keyDown(getByTestId("calculator"), { key: "*", keyChar: "106" });
    fireEvent.keyDown(getByTestId("calculator"), { key: "4", keyChar: "52" });
    fireEvent.keyDown(getByTestId("calculator"), {
      key: "Enter",
      keyChar: "13"
    });
    expect(getByTestId("display-container")).toHaveTextContent("20");
    fireEvent.keyDown(getByTestId("calculator"), { key: "/", keyChar: "111" });
    fireEvent.keyDown(getByTestId("calculator"), { key: "2", keyChar: "50" });
    fireEvent.keyDown(getByTestId("calculator"), {
      key: "Enter",
      keyChar: "13"
    });
    expect(getByTestId("display-container")).toHaveTextContent("10");
    fireEvent.keyDown(getByTestId("calculator"), { key: "-", keyChar: "189" });
    fireEvent.keyDown(getByTestId("calculator"), { key: "6", keyChar: "54" });
    fireEvent.keyDown(getByTestId("calculator"), {
      key: "Enter",
      keyChar: "13"
    });
    expect(getByTestId("display-container")).toHaveTextContent("4");
  });
});
