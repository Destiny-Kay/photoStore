import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, vi, expect } from "vitest"
import UserCard from "../../components/UserCard"
import { MemoryRouter } from "react-router"
import apiClient from "../../lib/apiClient"
import { User } from "../../types/types"
// import userEvent from "@testing-library/user-event"

// Mock the apiClient
vi.mock("../../lib/apiClient", () => ({
  default: {
    get:vi.fn(() => Promise.resolve({ data: { albums: 0 } })),
  },
}))

const mockUser: User = {
  id: "123",
  name: "John Doe",
  num_albums: 5,
  email: "johndoe@email.com"
}

describe("UserCard", () => {
  it("renders user information correctly", () => {
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>
    )

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Albums:")).toBeInTheDocument()
  })

  it("fetches and displays the number of albums", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: { albums: 5 } })

    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith("num-albums/123")
      expect(screen.getByText("Albums: 5")).toBeInTheDocument()
    })
  })

  it("handles API errors gracefully", async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"))

    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith("num-albums/123")
    })

    expect(screen.getByText("Albums:")).toBeInTheDocument() // Ensure it still renders even on error
  })

//   it("navigates to user details page on click", async () => {
//     const user = userEvent.setup()
//     render(
//       <MemoryRouter>
//         <UserCard user={mockUser} />
//       </MemoryRouter>
//     )

//     const card = screen.getAllByText("John Doe")[0] as HTMLElement
//     await user.click(card)

//     expect(window.location.pathname).toBe("/app/users/123")
//   })
})
