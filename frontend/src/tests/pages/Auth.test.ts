import { renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useAuth } from '../../pages/auth/hooks/Auth';
import apiClient from '../../lib/apiClient';
import { GOOGLE_ACCESS_TOKEN } from '../../constants/tokenVals';

vi.mock('../../lib/apiClient', () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockUserData = {
  id: 'user123',
  name: 'John Doe',
  email: 'johndoe@example.com',
};

// Mock useNavigate globally
const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should set isAuthenticated to true if the Google token is valid', async () => {
    localStorage.setItem(GOOGLE_ACCESS_TOKEN, 'valid-token');
    (apiClient.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: { user_data: mockUserData },
    });

    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.userData).toEqual(mockUserData);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should set isAuthenticated to false if the Google token is invalid', async () => {
    localStorage.setItem(GOOGLE_ACCESS_TOKEN, 'invalid-token');
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Invalid token'));

    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

});
