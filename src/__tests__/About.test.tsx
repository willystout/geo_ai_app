import { render } from './test-utils'
import { screen } from '@testing-library/react';
import AboutPage from '../components/About'

describe('About Page', () => {
    it('renders the main content and team sections', () => {
        render(<AboutPage />)

        // Test main content
        expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument()
        expect(screen.getByText(/Welcome to GeoAI!/i)).toBeInTheDocument()

        // Test team sections
        const sections = [
            'Professors',
            'Frontend & Website Functionality',
            'Backend & AI Models',
            'More Collaborators'
        ]

        sections.forEach(section => {
            expect(screen.getByRole('heading', { name: section })).toBeInTheDocument()
        })
    })

    it('displays all team members with correct information', () => {
        render(<AboutPage />)

        // Test professor section
        const professors = [
            { name: 'Christopher Brooks', role: 'Assistant Professor of Computer Science' },
            { name: 'David-Guy Brizan', role: 'Associate Professor of Data Science' }
        ]

        professors.forEach(({ name, role }) => {
            expect(screen.getByText(name)).toBeInTheDocument()
            expect(screen.getByText(role)).toBeInTheDocument()
        })

        // Test student section
        const students = [
            'William Stout',
            'Atanas Patterson-Ianev',
            'Noah Steaderman',
            'Hannah Gamracy',
            'Param Sohdhi',
            'Noga Gottlieb',
            'George Sphicas'
        ]

        students.forEach(name => {
            expect(screen.getByText(name)).toBeInTheDocument()
            expect(screen.getByAltText(name)).toBeInTheDocument()
        })
    })
})
