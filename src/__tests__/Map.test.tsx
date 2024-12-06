import { render, screen, fireEvent, act } from '@testing-library/react';
import MapPage from '@/app/map/page';

beforeAll(() => {
    (global as any).google = {
        maps: {
            Map: jest.fn().mockImplementation(() => ({
                setCenter: jest.fn(),
                fitBounds: jest.fn(),
                panToBounds: jest.fn(),
            })),
            Marker: jest.fn().mockImplementation(() => ({
                setMap: jest.fn(),
                addListener: jest.fn(),
            })),
            InfoWindow: jest.fn().mockImplementation(() => ({
                open: jest.fn(),
                close: jest.fn(),
            })),
            LatLngBounds: jest.fn().mockImplementation(() => ({
                extend: jest.fn(),
            })),
            MapTypeId: {
                SATELLITE: 'satellite',
            },
            Animation: {
                DROP: 1,
            },
        },
    };
});

jest.mock('@supabase/supabase-js', () => ({
    createClient: () => ({
        auth: {
            getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
            onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
        },
        from: jest.fn().mockReturnValue({
            insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
        }),
    }),
}));

global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ locations: [{ title: 'Mock Location', coordinates: { lat: 0, lng: 0 }, type: 'Test', description: 'A mock location' }] }),
}) as jest.Mock;

describe('MapPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders header, footer, and search input', async () => {
        await act(async () => {
            render(<MapPage />);
        });

        // Check for header logo
        expect(screen.getByAltText('GeoAI Logo')).toBeInTheDocument();

        // Check for footer content
        expect(screen.getByText(/© 2024 GeoAI/)).toBeInTheDocument();

        // Check for search input
        const searchInput = screen.getByPlaceholderText('Search locations...');
        expect(searchInput).toBeInTheDocument();
    });

    test('submits a search query and calls fetch', async () => {
        await act(async () => {
            render(<MapPage />);
        });

        const searchInput = screen.getByPlaceholderText('Search locations...') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'San Francisco' } });

        const searchButton = screen.getByRole('button', { name: /search/i });
        await act(async () => {
            fireEvent.click(searchButton);
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(JSON.parse(localStorage.getItem('mapLocations')!)).toEqual([
            {
                title: 'Mock Location',
                coordinates: { lat: 0, lng: 0 },
                type: 'Test',
                description: 'A mock location',
            },
        ]);
    });

    jest.mock('react-spinners', () => ({
        CircleLoader: () => <div role="progressbar" />,
    }));

    test('initial loading state is shown', async () => {
        window.localStorage.clear();

        await act(async () => {
            render(<MapPage />);
        });
    });
});