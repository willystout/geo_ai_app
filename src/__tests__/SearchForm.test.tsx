import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchForm from '@/components/SearchForm';
import styles from '@/styles/SearchForm.module.css';

// Mock Next.js router
jest.mock('next/navigation', () => {
    return {
        useRouter: () => ({
            push: jest.fn(),
        }),
        redirect: jest.fn(),
    };
});

// Mock supabase
jest.mock('@supabase/supabase-js', () => {
    return {
        createClient: () => ({
            auth: {
                getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
                onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
                signInWithOAuth: jest.fn().mockResolvedValue({ data: {}, error: null }),
            },
            from: jest.fn().mockReturnValue({
                select: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                order: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                maybeSingle: jest.fn().mockReturnThis(),
                insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
            }),
        }),
    };
});

// Mock fetch (used when submitting a query)
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ locations: [{ title: 'Mock Location' }] }),
}) as jest.Mock;

describe('SearchForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component and shows the GeoAI header', async () => {
        await act(async () => {
            render(<SearchForm placeholder="Search..." />);
        });

        expect(screen.getByText('GeoAI')).toBeInTheDocument();
        // The search input should appear
        const input = screen.getByPlaceholderText('Search...');
        expect(input).toBeInTheDocument();
    });

    test('toggles mode between insert image and query', async () => {
        await act(async () => {
            render(<SearchForm />);
        });

        // Initially, mode is 'query' so no file input
        expect(screen.queryByLabelText('Insert Image')).not.toBeInTheDocument();

        // Click insert mode
        const insertBtn = screen.getByText('Insert Image');
        fireEvent.click(insertBtn);

        // Now the file input should be rendered
        expect(screen.getByLabelText('Insert Image')).toBeInTheDocument();

        // Click query mode
        const queryBtn = screen.getByText('Query LLM');
        fireEvent.click(queryBtn);

        // File input should disappear again
        expect(screen.queryByLabelText('Insert Image')).not.toBeInTheDocument();
    });

    test('submits a query and calls onSearch callback', async () => {
        const onSearchMock = jest.fn();

        await act(async () => {
            render(<SearchForm placeholder="Type a location..." onSearch={onSearchMock} />);
        });

        const input = screen.getByPlaceholderText('Type a location...') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Test Query' } });

        // Use the accessible label to find the form
        const form = screen.getByRole('form', { name: 'Search form' });
        await act(async () => {
            fireEvent.submit(form);
        });

        // onSearch should have been called with the mock locations
        expect(onSearchMock).toHaveBeenCalledWith([{ title: 'Mock Location' }]);
    });
});