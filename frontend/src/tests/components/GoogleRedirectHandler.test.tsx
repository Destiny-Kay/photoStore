import { render, waitFor } from "@testing-library/react"
import { vi, describe, expect, it, beforeEach, afterEach } from "vitest"
import GoogleRedirectHandler from "../../components/GoogleRedirectHandler"
import { GOOGLE_ACCESS_TOKEN } from "../../constants/tokenVals"
import { MemoryRouter } from "react-router-dom"
import { useNavigate } from "react-router"

// Mock `useNavigate`
vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}))

describe("GoogleRedirectHandler", () => {
  const mockedNavigate = vi.fn()

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate)
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("should save the token to localStorage and navigate to /app/home when a token is present in the URL", async () => {
    const testToken = "test-access-token"
    window.history.pushState({}, "", `/?tkn=${testToken}`)

    render(
      <MemoryRouter>
        <GoogleRedirectHandler />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(localStorage.getItem(GOOGLE_ACCESS_TOKEN)).toBe(testToken)
      expect(mockedNavigate).toHaveBeenCalledWith("/app/home")
    })
  })

  it("should not save any token or navigate if no token is present", async () => {
    window.history.pushState({}, "", "/")

    render(
      <MemoryRouter>
        <GoogleRedirectHandler />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(localStorage.getItem(GOOGLE_ACCESS_TOKEN)).toBeNull()
      expect(mockedNavigate).not.toHaveBeenCalled()
    })
  })
})
