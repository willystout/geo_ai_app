import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchWrapper from '@/components/SearchWrapper';

export default function HomePage() {
    return (
        <>
            <Header />
            <div className="w-full min-h-screen">
                <SearchWrapper />
                <Footer />
            </div>
        </>
    );
}