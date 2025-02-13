import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import AlbumCard from '../../components/AlbumCard';
import { vi, describe, expect, it} from "vitest"
import { Album } from '../../types/types';
import { MemoryRouter } from 'react-router';

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

const mockAlbum:Album = {
  id: "asdasd",
  title: 'Test Album',
  user_id:"asdsd",
  created_at: "asdsad"
};


// const mockAlbum2:Album = {
//     id: "id-23",
//     title: 'Test Album 2',
//     user_id:"asdsd",
//     created_at: "asdsad"
// };

describe('AlbumCard Component', () => {
  it('renders album title correctly', () => {
    render(
        <MemoryRouter>
            <AlbumCard album={mockAlbum} />
        </MemoryRouter>
    );
    expect(screen.getByText('Test Album')).toBeInTheDocument();
  });

//   TODO: FIx click event, it is not working

//   it('navigates to album details page on click', async () => {
    
//     render(
//     <MemoryRouter>
//         <AlbumCard album={mockAlbum2} />
//     </MemoryRouter>
//     );

//     // Ensure the div exists and is clickable
//     const card = screen.getByTestId(`album-card-${mockAlbum2.id}`);
//     await userEvent.click(card);
//     // expect(mockedUseNavigate).toHaveBeenCalledTimes(1);

//     // Check if navigate was called with the correct path
//     expect(mockedUseNavigate).toHaveBeenCalledWith(`/app/albums/${mockAlbum2.id}`);
//   });
});