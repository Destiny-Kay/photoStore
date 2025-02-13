import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header";  // Update the path as needed
import { useAuth } from "../../pages/auth/hooks/Auth";

// const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...mod,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../pages/auth/hooks/Auth", () => ({
  useAuth: vi.fn(),
}));

describe("Header Component", () => {

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
  });

  it("renders the logo correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/photo/i)).toBeInTheDocument();
    expect(screen.getByText(/store/i)).toBeInTheDocument();
  });

  it("renders nav items for desktop view", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const navItems = ["features", "search", "organize", "safety"];
    navItems.forEach((item) => {
        const nav_item =  screen.getAllByText(item)[0] as HTMLElement;
      expect(nav_item).toBeInTheDocument();
    });
  });

  it("renders login and get started buttons when not authenticated", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const get_started_button = screen.getAllByText("Get started")[0] as HTMLElement
    const login_button = screen.getAllByText("Login")[0] as HTMLElement
    expect(login_button).toBeInTheDocument();
    expect(get_started_button).toBeInTheDocument();
  });

  it("renders 'My account' button when authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const myAccountButton =screen.getAllByText(("My account"))[0] as HTMLButtonElement
    expect(myAccountButton).toBeInTheDocument();
  });
});
