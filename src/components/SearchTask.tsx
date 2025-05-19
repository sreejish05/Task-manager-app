import React from 'react';
import '../pages/HomePage.css';

interface SearchTaskProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchTask: React.FC<SearchTaskProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-centered">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Enter Keyword..."
      />
    </div>
  );
};

export default SearchTask;
