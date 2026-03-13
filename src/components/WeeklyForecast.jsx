import React from 'react';
import './WeeklyForecast.css';

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

const TempBar = ({ high, low }) => {
    const maxTemp = 35;
    const minTemp = -5;
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
        <div className="w-full h-2 rounded-full overflow-hidden bg-white bg-opacity-10">
            <div className="h-full" style={{ background: gradient }}></div>
        </div>
    );
};

const WeeklyForecast = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-3">
      {data.map((day, index) => (
        <div key={index} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors">
          <p className="w-16 font-semibold text-frostWhite text-sm">{day.day}</p>
          <div className="text-3xl">
            {getEmoji(day.condition)}
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="flex items-center gap-2 min-w-fit">
              <span className="text-frostWhite text-opacity-70 text-sm">{day.low}°</span>
              <TempBar high={day.high} low={day.low} />
              <span className="font-bold text-frostWhite text-sm">{day.high}°</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
