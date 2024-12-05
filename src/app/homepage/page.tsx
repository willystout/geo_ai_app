'use client';

import Header from '@/components/Header'
import { useEffect } from 'react';
import SearchForm from '@/components/SearchForm'
import Footer from '@/components/Footer';
import fetchQueries from '@/supabase/supabaseClient';
import FileUploadForm from '@/components/FileUploadForm';

export default function HomePage() {
    // useEffect(() => {
    //     const logQueries = async () => {
    //         const { countries, error } = await fetchQueries();
    //         if (error) {
    //             console.error('Error fetching queries:', error);
    //         } else {
    //             console.log('Fetched queries:', countries);
    //         }
    //     };

    //     logQueries();
    // }, []);

    const handleSearch = (query: string) => {
        console.log("User searched for:", query)
    }

    return (
        <>
            <Header />
            <div className="w-full min-h-screen">
                <SearchForm onSearch={handleSearch} placeholder="Please enter your query..." />
                <FileUploadForm/>

            </div>
        </>
    )
}