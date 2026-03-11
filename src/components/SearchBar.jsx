import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { useWeatherContext } from '../context/WeatherContext';
import './SearchBar.css';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { setCity, loading } = useWeatherContext();

  const handleSearch = () => {
    if (inputValue.trim()) {
      setCity(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-4">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city and press Enter..."
          className="glass-input glass-glow-blue w-full pl-4 pr-12 py-3 text-lg text-frostWhite focus:outline-none"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer" onClick={handleSearch}>
          {loading ? (
            <Loader className="animate-spin-slow text-frostWhite" />
          ) : (
            <Search className="search-icon text-frostWhite" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

