import { render, screen } from "@testing-library/react";
import ConfessForm from "./ConfessForm";
import { MisdemeanourContext } from "../context/MisdemeanourContext";

describe("ConfessForm", () => {
  const mockAddMisdemeanour = jest.fn();

  beforeEach(() => {
    render(
      <MisdemeanourContext.Provider
        value={{ misdemeanours: [], addMisdemeanour: mockAddMisdemeanour }}
      >
        <ConfessForm />
      </MisdemeanourContext.Provider>
    );
  });

  test("renders the form with essential elements", () => {
    expect(screen.getByLabelText("Confession form")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Reason for contact")).toBeInTheDocument();
    expect(screen.getByLabelText("Details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confess" })).toBeInTheDocument();
  });
});
