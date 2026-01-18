import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the navigation bar', () => {
    render(<Navbar />);
    // Check for a link or text you expect in your Navbar
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });
});

// Real World Context:
// This test checks that your Navbar component renders and is accessible.
// In a professional setting, you would add more tests for links, responsiveness, and accessibility.