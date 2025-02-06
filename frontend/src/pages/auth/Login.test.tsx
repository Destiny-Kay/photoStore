import {render, screen} from "@testing-library/react";
import Login from "./Login";
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest"

describe("Login", () => {
    it("renders page", () => {
        render(<Login />)
        expect(screen.getByText("This is the login page")).toBeInTheDocument()
    });
})