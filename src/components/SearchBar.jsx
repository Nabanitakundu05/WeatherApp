import React, { useState, useEffect } from 'react';
import { Search, Loader, X, MapPin } from 'lucide-react';
import { useWeatherContext } from '../context/WeatherContext';
import './SearchBar.css';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [recentCities, setRecentCities] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [locating, setLocating] = useState(false);
  const { setCity, loading, city, setCoordinates } = useWeatherContext();

  useEffect(() => {
    const stored = localStorage.getItem('recentCities');
    if (stored) {
      setRecentCities(JSON.parse(stored));
    }
  }, []);

  const handleSearch = (searchCity) => {
    if (searchCity.trim()) {
      setCity(searchCity);
      setInputValue('');
      setShowRecent(false);

      const updated = [
        searchCity,
        ...recentCities.filter(c => c.toLowerCase() !== searchCity.toLowerCase())
      ].slice(0, 5);

      setRecentCities(updated);
      localStorage.setItem('recentCities', JSON.stringify(updated));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const clearRecent = (e, cityToRemove) => {
    e.stopPropagation();
    const updated = recentCities.filter(c => c !== cityToRemove);
    setRecentCities(updated);
    localStorage.setItem('recentCities', JSON.stringify(updated));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates(latitude, longitude);
        setLocating(false);
        setInputValue('');
        setShowRecent(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enable location services.');
        setLocating(false);
      }
    );
  };

  return (
    <div className="relative w-full">
      <div className="relative flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowRecent(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowRecent(true)}
          placeholder="Search for a city..."
          className="glass-input glass-glow-blue flex-1 pl-4 pr-12 py-3 text-base text-frostWhite focus:outline-none transition-all"
        />
        <button
          onClick={handleGetLocation}
          disabled={locating || loading}
          title="Get current location"
          className="glass-input glass-glow-blue px-4 py-3 rounded-lg text-frostWhite hover:bg-white hover:bg-opacity-15 transition-all disabled:opacity-50"
        >
          {locating ? (
            <Loader className="w-5 h-5 animate-spin-slow" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </button>
        <div 
          className="absolute inset-y-0 right-16 flex items-center pr-4 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => handleSearch(inputValue)}
        >
          {loading ? (
            <Loader className="animate-spin-slow text-frostWhite w-5 h-5" />
          ) : (
            <Search className="search-icon text-frostWhite w-5 h-5" />
          )}
        </div>
      </div>

      {showRecent && recentCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card glass-dark rounded-xl p-2 z-50">
          <div className="text-xs text-frostWhite text-opacity-50 px-3 py-2">Recent Cities</div>
          {recentCities.map((recentCity) => (
            <div
              key={recentCity}
              onClick={() => handleSearch(recentCity)}
              className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors text-frostWhite text-sm"
            >
              <span>{recentCity}</span>
              <button
                onClick={(e) => clearRecent(e, recentCity)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

