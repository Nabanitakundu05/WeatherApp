import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import './HourlyForecast.css';

const getIcon = (condition) => {
    switch (condition) {
      case 'Clouds': return <WiCloudy size={32} />;
      case 'Rain': return <WiRain size={32} />;
      case 'Clear': return <WiDaySunny size={32} />;
      case 'Snow': return <WiSnow size={32} />;
      case 'Thunderstorm': return <WiThunderstorm size={32} />;
      case 'Fog': return <WiFog size={32} />;
      case 'Mist': return <WiFog size={32} />;
      default: return <WiDaySunny size={32} />;
    }
};

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  const activeHourIndex = 0; // First hour is the current one

  return (
    <div className="hourly-forecast-container mt-8">
      {data.map((hour, index) => (
        <div 
          key={index}
          className={`glass-pill noise-overlay flex flex-col items-center justify-center p-4 m-2 text-frostWhite transition-all duration-300 ${index === activeHourIndex ? 'active-hour' : 'glass-glow-blue'}`}
        >
          <p className="text-sm font-light">{hour.time}</p>
          <div className="my-2">
            {getIcon(hour.condition)}
          </div>
          <p className="text-lg font-bold">{hour.temp}°</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
