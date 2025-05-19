import React from 'react';
import SearchTask from './SearchTask';
import '../pages/HomePage.css';

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
}

const SearchButton: React.FC<Props> = ({ searchTerm, onSearchChange, onSearchClick }) => {
  return (
    <div className="search-bar-centered">
      <SearchTask searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <button onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchButton;
