import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi, describe, it, expect } from 'vitest';
import Landing from '../pages/Landing.tsx';
import Register from '../pages/auth/Register.tsx';
import Login from '../pages/auth/Login.tsx';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('App Routing', () => {
  it('renders the Landing page at the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Landing />
      </MemoryRouter>
    );
    expect(screen.getByText(/Capture,/i)).toBeInTheDocument();
  });

  it('renders the Register page at /auth/register', () => {
    render(
      <MemoryRouter initialEntries={['/auth/register']}>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it('renders the Login page at /auth/login', () => {
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
