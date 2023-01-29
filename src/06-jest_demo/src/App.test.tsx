import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { mount } from "enzyme";

describe("test", () => {
  test("first unit test", () => {
    render(<App />);
    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});

describe("test", () => {
  it("first unit enzyme test", () => {
    const app = mount(<App />);
    expect(app.find(".read-the-docs").getDOMNode().textContent).toEqual(
      "Click on the Vite and React logos to learn more"
    );
  });
});