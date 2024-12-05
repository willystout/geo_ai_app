'use client';

import AboutPage from '@/components/About';
import Footer from '@/components/Footer';
import HomeButton from '@/components/HomeButton';

export default function Page() {
    return (
        <>
            <HomeButton />
            <AboutPage />
            <Footer /> {/* Include Footer here */}
        </>
    );
}