import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';
import { useWeatherContext } from '../context/WeatherContext';
import './WeatherCard.css';

const WeatherCard = ({ city, temperature, condition, humidity, windSpeed, feelsLike, icon }) => {
  const { tempUnit, toggleTempUnit } = useWeatherContext();
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => setIsFlipping(false), 500); // Animation duration
    return () => clearTimeout(timer);
  }, [temperature]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
        return <WiDaySunny className="weather-icon sunny" />;
      case 'Cloudy':
        return <WiCloudy className="weather-icon cloudy" />;
      case 'Rainy':
        return <WiRain className="weather-icon rainy" />;
      case 'Snowy':
        return <WiSnow className="weather-icon snowy" />;
      default:
        return <WiDaySunny className="weather-icon" />;
    }
  };

  return (
    <div className="relative glass-card noise-overlay w-full max-w-md p-8 m-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold text-frostWhite">{city}</h2>
          <p className="text-lg text-frostWhite">{condition}</p>
        </div>
        <div className="text-6xl text-frostWhite">
          {getWeatherIcon(condition)}
        </div>
      </div>

      <div className="text-center my-12 relative">
        <h1 className={`text-9xl font-extrabold text-frostWhite tracking-tighter ${isFlipping ? 'temp-flip' : ''}`}>{temperature}°</h1>
        <div className="absolute top-0 right-0">
          <button onClick={toggleTempUnit} className="text-frostWhite focus:outline-none">
            <span className={tempUnit === 'C' ? 'font-bold' : ''}>°C</span> / <span className={tempUnit === 'F' ? 'font-bold' : ''}>°F</span>
          </button>
        </div>
      </div>

      <div className="glass-dark p-6 rounded-2xl">
        <div className="flex justify-between text-frostWhite">
          <div className="text-center">
            <p className="font-light text-sm">Feels Like</p>
            <p className="font-bold text-lg">{feelsLike}°</p>
          </div>
          <div className="text-center">
            <p className="font-light text-sm">Humidity</p>
            <p className="font-bold text-lg">{humidity}%</p>
          </div>
          <div className="text-center">
            <p className="font-light text-sm">Wind</p>
            <p className="font-bold text-lg">{windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

