import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

jest.mock('@supabase/supabase-js', () => ({
    createClient: () => ({
        auth: {
            getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
        },
    }),
}));

jest.mock('@emailjs/browser', () => ({
    init: jest.fn(),
    send: jest.fn().mockResolvedValue({}),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('ContactPage', () => {
    test('shows login notification when user not logged in', async () => {
        await act(async () => {
            render(<ContactPage />);
        });
        expect(screen.getByText(/must be logged in/)).toBeInTheDocument();
    });

    test('handles form submission', async () => {
        const mockUser = {
            email: 'test@example.com',
            user_metadata: { full_name: 'Test User' },
        };

        jest.spyOn(require('@supabase/supabase-js'), 'createClient')
            .mockImplementation(() => ({
                auth: {
                    getSession: jest.fn().mockResolvedValue({
                        data: { session: { user: mockUser } }
                    }),
                    onAuthStateChange: jest.fn().mockReturnValue({
                        data: { subscription: { unsubscribe: jest.fn() } }
                    }),
                },
            }));

        await act(async () => {
            render(<ContactPage />);
        });

        const subject = screen.getByLabelText('Subject');
        const message = screen.getByLabelText('Message');

        await act(async () => {
            fireEvent.change(subject, { target: { value: 'Test Subject' } });
            fireEvent.change(message, { target: { value: 'Test Message' } });
        });

        const form = screen.getByTestId('contact-form');
        await act(async () => {
            fireEvent.submit(form);
        });

        await waitFor(() => {
            expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
        });
    });
});