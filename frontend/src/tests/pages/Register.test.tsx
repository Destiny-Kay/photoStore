import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Register from "../../pages/auth/Register"
import { MemoryRouter } from "react-router-dom"

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router")
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),  // Mock `useNavigate`
  }
})

describe("Register Component", () => {
  const originalLocation = window.location.href

  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, "location", {
      value: { href: originalLocation },
      writable: true,
    })
  })

  it("should render the Register component correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )

    expect(screen.getByText("Sign up")).toBeInTheDocument()
    expect(screen.getByText("Keep your memories safe")).toBeInTheDocument()
    expect(screen.getByText("continue with google")).toBeInTheDocument()
  })

  it("should redirect to Google signup URL on signup button click", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )

    fireEvent.click(screen.getAllByText("continue with google")[0])
    expect(window.location.href).toBe(`${import.meta.env.VITE_API_URL}/login/redirect`)
  })
})
