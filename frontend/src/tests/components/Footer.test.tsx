import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import { describe, expect, it } from "vitest"
import { MemoryRouter } from 'react-router';

describe('Footer Component', () => {
  it('renders all sections correctly', () => {
    render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

    // Check for newsletter section
    expect(screen.getByText("Get your photos organized and securely stored with photostore."))
    expect(screen.getByPlaceholderText('johndoe@email.com')).toBeInTheDocument();

    // Check for Application section
    expect(screen.getByText('Application')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Get started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Login to account/i })).toBeInTheDocument();

    // Check for Legal section
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Privacy policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of use')).toBeInTheDocument();
    expect(screen.getByText('FAQs')).toBeInTheDocument();

  });
});