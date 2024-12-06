import { render, screen, fireEvent } from '@testing-library/react';
import HomeButton from '../components/HomeButton';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('HomeButton', () => {
    test('navigates to homepage on click', () => {
        render(<HomeButton />);
        fireEvent.click(screen.getByText('Return to homepage'));
        expect(mockPush).toHaveBeenCalledWith('/homepage');
    });
});