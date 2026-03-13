import React from 'react';
import './HourlyForecast.css';

const getEmoji = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('cloud')) return '☁';
    if (conditionLower.includes('rain')) return '🌧';
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀';
    if (conditionLower.includes('snow')) return '❄';
    if (conditionLower.includes('thunder')) return '⛈';
    if (conditionLower.includes('fog')) return '🌫';
    return '☁';
};

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 pb-2">
        {data.map((hour, index) => (
          <div 
            key={index}
            className="glass-pill noise-overlay flex flex-col items-center justify-center p-4 rounded-xl text-frostWhite flex-shrink-0 min-w-max"
          >
            <p className="text-xs font-light text-frostWhite text-opacity-80">{hour.time}</p>
            <div className="text-4xl my-3">
              {getEmoji(hour.condition)}
            </div>
            <p className="text-lg font-bold text-frostWhite">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
