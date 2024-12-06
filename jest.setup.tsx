import '@testing-library/jest-dom';
import 'whatwg-fetch';
import React from 'react';

// Instead of directly assigning TextEncoder/TextDecoder, we'll create a proper polyfill
class CustomTextEncoder {
    encode(input?: string): Uint8Array {
        if (input === undefined) return new Uint8Array();
        return new TextEncoder().encode(input);
    }
}

class CustomTextDecoder {
    decode(input?: BufferSource, options?: TextDecodeOptions): string {
        if (input === undefined) return '';
        return new TextDecoder().decode(input, options);
    }
}

// Safely assign our custom implementations
Object.defineProperty(global, 'TextEncoder', {
    value: CustomTextEncoder,
    writable: true,
});

Object.defineProperty(global, 'TextDecoder', {
    value: CustomTextDecoder,
    writable: true,
});

// Define interface for Next.js Image component props
interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    [key: string]: any;
}

// Mock next/image with proper TypeScript types
jest.mock('next/image', () => ({
    __esModule: true,
    default: function MockImage(props: ImageProps) {
        const { src, alt, width, height, className, priority, ...rest } = props;
        return (
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
                {...rest}
            />
        );
    },
}));

// Create a strongly typed mock Supabase client
interface MockSupabaseClient {
    auth: {
        getSession: jest.Mock;
        onAuthStateChange: jest.Mock;
        signInWithOAuth: jest.Mock;
        signOut: jest.Mock;
    };
}

const mockSupabaseClient: MockSupabaseClient = {
    auth: {
        getSession: jest.fn(),
        onAuthStateChange: jest.fn(() => ({
            data: { subscription: { unsubscribe: jest.fn() } },
        })),
        signInWithOAuth: jest.fn(),
        signOut: jest.fn(),
    },
};

// Mock Supabase with proper typing
jest.mock('@supabase/supabase-js', () => ({
    createClient: () => mockSupabaseClient,
}));

// Mock next/navigation with proper typing
interface RouterType {
    push: jest.Mock;
    replace: jest.Mock;
    prefetch: jest.Mock;
}

const mockRouter: RouterType = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
};

jest.mock('next/navigation', () => ({
    useRouter: () => mockRouter,
}));

// Mock EmailJS with proper typing
interface EmailJSMock {
    init: jest.Mock;
    send: jest.Mock;
}

const emailJSMock: EmailJSMock = {
    init: jest.fn(),
    send: jest.fn(),
};

jest.mock('@emailjs/browser', () => emailJSMock);

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

// Extend Jest matchers
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
        }
    }
}