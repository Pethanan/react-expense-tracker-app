import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

describe("App level test", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText("Expense", { exact: false });
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react 1", () => {
    render(<App />);
    const linkElement = screen.getByText("thisisnotinapp", { exact: false });
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react 2", () => {
    render(<App />);
    const linkElement = screen.getByText("Login", { exact: false });
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/password/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react 3", () => {
    render(<App />);
    const linkElement = screen.getByText("reenter", { exact: false });
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react 4", () => {
    render(<App />);
    const linkElement = screen.getByText(/cart/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react 5", () => {
    render(<App />);
    const linkElement = screen.getByText(/forgot/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react 6", () => {
    render(<App />);
    const linkElement = screen.getByText(/total/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("renders learn react 7", () => {
    render(<App />);
    const linkElement = screen.getByText(/amount/i);
    expect(linkElement).toBeInTheDocument();
  });
});
