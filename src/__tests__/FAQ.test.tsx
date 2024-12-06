import { render, screen, fireEvent } from '@testing-library/react';
import FAQPage from '@/app/faq/page';
import styles from '@/styles/FAQ.module.css';

describe('FAQPage', () => {
    test('renders FAQ questions', () => {
        render(<FAQPage />);
        expect(screen.getByText('What is GeoAI?')).toBeInTheDocument();
    });

    test('toggles answer visibility on question click', () => {
        render(<FAQPage />);
        const question = screen.getByText('What is GeoAI?');
        const answer = screen.getByText(/GeoAI is a web application/);

        // Locate the faq-answer element
        const answerElement = answer.closest(`.${styles['faq-answer']}`);

        // Initial state (should not have the open class)
        expect(answerElement).not.toHaveClass(styles.open);

        // Click to open
        fireEvent.click(question);
        expect(answerElement).toHaveClass(styles.open);

        // Click to close
        fireEvent.click(question);
        expect(answerElement).not.toHaveClass(styles.open);
    });
});