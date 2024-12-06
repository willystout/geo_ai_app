import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createClient } from '@supabase/supabase-js'
import { User } from '@supabase/supabase-js'

// Mock next/navigation
const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
}

jest.mock('next/navigation', () => ({
    useRouter: () => mockRouter
}))

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />
}))

// Create test utils with common providers and mocks
function render(
    ui: React.ReactElement,
    {
        initialUser = null,
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return children
    }

    return {
        ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
        mockRouter
    }
}

export * from '@testing-library/react'
export { render }