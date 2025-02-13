import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PhotoViewer from '../../../pages/app/PhotoViewer';
import { vi, describe, expect, it, beforeEach } from 'vitest';
import apiClient from '../../../lib/apiClient';

// Mock the apiClient
vi.mock('../../../lib/apiClient', () => ({
    default: {
        get: vi.fn(),
        patch: vi.fn(),
}
}));

describe('PhotoViewer', () => {
  const mockPhoto = {
    id: '1',
    title: 'Test Photo',
    image: 'https://example.com/photo.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches photo details on component mount', async () => {
    // Mock the API response for fetching photo details
    (apiClient.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockPhoto,
    });

    render(
      <MemoryRouter initialEntries={['/photo/1']}>
        <Routes>
          <Route path="/photo/:photoId" element={<PhotoViewer />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the API call to complete
    await waitFor(() => screen.getByText(mockPhoto.title));

    // Check if photo title is rendered correctly
    expect(screen.getAllByText(mockPhoto.title)[0]).toBeInTheDocument();
  });

  it('allows editing the photo title', async () => {
    // Mock the API response for fetching photo details
    (apiClient.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockPhoto,
    });

    render(
      <MemoryRouter initialEntries={['/photo/1']}>
        <Routes>
          <Route path="/photo/:photoId" element={<PhotoViewer />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the API call to complete
    await waitFor(() => screen.getByText(mockPhoto.title));

    // Click the edit button (pen icon)
    fireEvent.click(screen.getAllByTestId('EditPhotoIcon')[0]);

    // Wait for the input field to appear
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Photo Title' } });

    // Mock the patch response to update the title
    (apiClient.patch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: { title: 'New Photo Title' },
    });

    // Click the 'Change name' button to submit the new title
    fireEvent.click(screen.getByText('Change name'));

    // Wait for the title to be updated
    await waitFor(() => screen.getByText('New Photo Title'));

    // Check if the title is updated correctly
    expect(screen.getByText('New Photo Title')).toBeInTheDocument();
  });

  it('cancels editing the photo title', async () => {
    // Mock the API response for fetching photo details
    (apiClient.get as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: mockPhoto,
    });

    render(
      <MemoryRouter initialEntries={['/photo/1']}>
        <Routes>
          <Route path="/photo/:photoId" element={<PhotoViewer />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the API call to complete
    await waitFor(() => screen.getAllByText(mockPhoto.title)[0]);

    // Click the edit button (pen icon)
    fireEvent.click(screen.getAllByTestId('EditPhotoIcon')[0]);

    // Wait for the input field to appear
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Canceled Photo Title' } });

    // Click the 'Cancel' button to cancel the edit
    fireEvent.click(screen.getByText('Cancel'));

    // Check that the input field is not visible and the original title is displayed
    await waitFor(() => screen.getAllByText(mockPhoto.title)[0]);

    // Check if the original title is still rendered
    expect(screen.getAllByText(mockPhoto.title)[0]).toBeInTheDocument();
  });
});
