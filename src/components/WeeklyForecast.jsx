import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import './WeeklyForecast.css';

const getIcon = (condition) => {
    switch (condition) {
      case 'Clouds': return <WiCloudy size={36} />;
      case 'Rain': return <WiRain size={36} />;
      case 'Clear': return <WiDaySunny size={36} />;
      case 'Snow': return <WiSnow size={36} />;
      case 'Thunderstorm': return <WiThunderstorm size={36} />;
      case 'Fog': return <WiFog size={36} />;
      case 'Mist': return <WiFog size={36} />;
      default: return <WiDaySunny size={36} />;
    }
};

const TempBar = ({ high, low }) => {
    const maxTemp = 35; // A reasonable max for gradient calculation
    const minTemp = -5; // A reasonable min
    const tempRange = maxTemp - minTemp;
    
    const lowPercent = Math.max(0, ((low - minTemp) / tempRange) * 100);
    const highPercent = Math.min(100, ((high - minTemp) / tempRange) * 100);

    const gradient = `linear-gradient(to right, 
        rgba(0,0,0,0) 0%, 
        #87CEEB ${lowPercent}%, 
        #FD5E53 ${highPercent}%,
        rgba(0,0,0,0) 100%
    )`;

    return (
        <div className="w-full h-2 rounded-full overflow-hidden bg-white bg-opacity-20">
            <div className="h-full" style={{ background: gradient }}></div>
        </div>
    );
};

const WeeklyForecast = ({ data }) => {
  if (!data) return null;

  return (
    <div className="glass-card glass-dark noise-overlay p-6 rounded-2xl mt-8">
      <ul>
        {data.map((day, index) => (
          <li key={index} className="weekly-forecast-item flex items-center justify-between py-3 border-b border-white border-opacity-10">
            <p className="w-1/4 font-bold text-lg text-frostWhite">{day.day}</p>
            <div className="w-1/4 flex justify-center text-frostWhite">
                {getIcon(day.condition)}
            </div>
            <div className="w-1/2 flex items-center justify-end text-frostWhite">
                <p className="mr-4 text-frostWhite text-opacity-70">{day.low}°</p>
                <TempBar high={day.high} low={day.low} />
                <p className="ml-4 font-bold">{day.high}°</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyForecast;
