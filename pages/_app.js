import '../styles/App.module.css';
import React from 'react';
import SearchForm from '../components/SearchForm';
import '../styles/global.css';

function App() {
  const handleSearch = (query) => {
    console.log("User searched for:", query);
  };

  return (
    <div className="App">
      <SearchForm onSearch={handleSearch} placeholder="Type your query..." />
    </div>
  );
}

export default App;
