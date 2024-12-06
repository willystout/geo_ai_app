import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '../components/About';
import React from 'react';

describe('AboutPage Component', () => {
    it('renders the main headings and content', () => {
        render(<AboutPage />);
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Professors')).toBeInTheDocument();
        expect(screen.getByText('Frontend & Website Functionality')).toBeInTheDocument();
        expect(screen.getByText('Backend & AI Models')).toBeInTheDocument();
    });

    it('renders professor information correctly', () => {
        render(<AboutPage />);
        expect(screen.getByText('Christopher Brooks')).toBeInTheDocument();
        expect(screen.getByText('David-Guy Brizan')).toBeInTheDocument();
        expect(screen.getByText('Assistant Professor of Computer Science')).toBeInTheDocument();
        expect(screen.getByText('Associate Professor of Data Science')).toBeInTheDocument();
    });

    it('renders all team members with correct information', () => {
        render(<AboutPage />);
        const teamMembers = [
            'William Stout',
            'Atanas Patterson-Ianev',
            'Noah Steaderman',
            'Hannah Gamracy',
            'Param Sohdhi',
            'Noga Gottlieb',
            'George Sphicas'
        ];

        teamMembers.forEach(name => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });

        // Check if correct number of CS majors exists
        const csMajors = screen.getAllByText('Computer Science Major, Class of 2025');
        expect(csMajors).toHaveLength(7);
    });
});