import '@testing-library/jest-dom'

// This extends the expect object with methods from jest-dom
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveAttribute(attr: string, value?: string): R;
            toBeInTheDocument(): R;
            toHaveClass(className: string): R;
        }
    }
}
