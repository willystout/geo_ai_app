'use client';

import FAQPage from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Page() {
    return (
        <>
            <Header />
            <FAQPage />
            <Footer /> {/* Include Footer here */}
        </>
    );
}