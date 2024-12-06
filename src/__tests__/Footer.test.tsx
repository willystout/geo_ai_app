import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
    test('renders copyright notice', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2024 GeoAI/)).toBeInTheDocument();
    });

    test('renders footer links', () => {
        render(<Footer />);
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('GitHub')).toBeInTheDocument();
    });
});