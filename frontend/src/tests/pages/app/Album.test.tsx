import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AlbumDetail from '../../../pages/app/Album';
import { vi, describe, it, expect, beforeEach } from 'vitest';
vi.mock('../../lib/apiClient', () => ({
  get: vi.fn(),
}));

describe('AlbumDetail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    render(
      <MemoryRouter>
        <AlbumDetail /> 
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
