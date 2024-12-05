'use client';
import SearchForm from '@/components/SearchForm';

export default function SearchWrapper() {
    const handleSearch = (query: string) => {
        console.log("User searched for:", query);
    }

    return (
        <SearchForm 
            onSearch={handleSearch} 
            placeholder="Please enter your query..." 
        />
    );
}