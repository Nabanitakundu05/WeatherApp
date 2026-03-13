import React, { useState, useEffect } from 'react';
import { useWeatherContext } from '../context/WeatherContext';
import './WeatherCard.css';

const WeatherCard = ({ city, temperature, condition, humidity, windSpeed, feelsLike, icon }) => {
  const { tempUnit, toggleTempUnit } = useWeatherContext();
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => setIsFlipping(false), 500);
    return () => clearTimeout(timer);
  }, [temperature]);

  const getWeatherEmoji = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('cloud')) return '☁';
    if (conditionLower.includes('rain')) return '🌧';
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀';
    if (conditionLower.includes('snow')) return '❄';
    if (conditionLower.includes('thunder')) return '⛈';
    if (conditionLower.includes('fog')) return '🌫';
    return '☁';
  };

  return (
    <div className="glass-card noise-overlay p-8 rounded-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-frostWhite">{city}</h1>
          <p className="text-frostWhite text-opacity-80 mt-2">{condition}</p>
        </div>
        <div className="text-6xl">
          {getWeatherEmoji(condition)}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-8">
        <span className={`text-7xl font-bold text-frostWhite ${isFlipping ? 'temp-flip' : ''}`}>
          {temperature}
        </span>
        <div className="flex flex-col">
          <span className="text-3xl text-frostWhite">°</span>
          <button 
            onClick={toggleTempUnit} 
            className="text-sm text-frostWhite text-opacity-60 hover:text-opacity-100 transition-opacity mt-1 font-semibold"
          >
            {tempUnit}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-dark p-4 rounded-xl">
          <p className="text-frostWhite text-opacity-60 text-sm mb-1">Feels Like</p>
          <p className="text-2xl font-bold text-frostWhite">{feelsLike}°</p>
        </div>
        <div className="glass-dark p-4 rounded-xl">
          <p className="text-frostWhite text-opacity-60 text-sm mb-1">Humidity</p>
          <p className="text-2xl font-bold text-frostWhite">{humidity}%</p>
        </div>
        <div className="glass-dark p-4 rounded-xl">
          <p className="text-frostWhite text-opacity-60 text-sm mb-1">Wind</p>
          <p className="text-2xl font-bold text-frostWhite">{windSpeed}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

