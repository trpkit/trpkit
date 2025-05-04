import Page from "@/app/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Page", () => {
  it("renders the heading correctly", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1, name: "Hello world" })).toBeDefined();
  });
});
