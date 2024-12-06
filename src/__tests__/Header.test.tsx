import { render, screen, act } from '@testing-library/react';
import Header from '@/components/Header';

// Mock the supabase client
jest.mock('@/utils/supabaseClient', () => ({
    __esModule: true,
    default: {
        auth: {
            getSession: jest.fn().mockResolvedValue({
                data: { session: null },
                error: null
            }),
            onAuthStateChange: jest.fn().mockReturnValue({
                data: { subscription: { unsubscribe: jest.fn() } }
            }),
            signInWithOAuth: jest.fn().mockResolvedValue({ error: null }),
            signOut: jest.fn().mockResolvedValue({ error: null }),
        },
    },
}));

describe('Header', () => {
    test('renders navigation links', async () => {
        await act(async () => {
            render(<Header />);
        });

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('FAQ')).toBeInTheDocument();
        expect(screen.getByText('View Map')).toBeInTheDocument();
    });

    test('shows sign in button when logged out', async () => {
        await act(async () => {
            render(<Header />);
        });

        expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    });
});