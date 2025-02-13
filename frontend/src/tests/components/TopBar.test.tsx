import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import { useAuth } from '../../pages/auth/hooks/Auth';
import { vi, describe, expect, beforeEach, it } from 'vitest';

vi.mock('../../pages/auth/hooks/Auth', () => ({
  useAuth: vi.fn(),
}));

describe('TopBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ 
      userData: { 
        profile_photo: 'https://example.com/avatar.jpg', 
        name: 'John Doe' 
      }, 
      logout: vi.fn() 
    }); 
  });

  it('renders user profile image and name', () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    // check whether the image element rendered
    expect(screen.getByText('Hello, John Doe')).toBeInTheDocument();
  });

  it('renders logout button with icon', () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    const logoutButton = screen.getAllByText('Logout')[0] as HTMLButtonElement;
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveTextContent('Logout'); 
  });
});