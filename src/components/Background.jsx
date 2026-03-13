import React from 'react';
import '../styles/Background.css';

const Background = ({ condition = 'Clear' }) => {
  const getConditionClass = () => {
    const cond = condition.toLowerCase();
    
    // Clear and sunny conditions
    if (cond.includes('clear') || cond.includes('sunny')) {
      return 'daytime';
    }
    // Cloudy conditions
    if (cond.includes('cloud')) {
      return 'cloudy';
    }
    // Rainy conditions
    if (cond.includes('rain') || cond.includes('drizzle')) {
      return 'rainy';
    }
    // Snow conditions
    if (cond.includes('snow')) {
      return 'snowy';
    }
    // Thunderstorm conditions
    if (cond.includes('thunderstorm') || cond.includes('storm')) {
      return 'stormy';
    }
    // Fog/Mist conditions
    if (cond.includes('fog') || cond.includes('mist') || cond.includes('haze')) {
      return 'foggy';
    }
    
    // Default to daytime for unknown conditions
    return 'daytime';
  };

  return (
    <div className={`background-container ${getConditionClass()}`}>
      {/* Sun for daytime */}
      <div className="sun"></div>

      {/* Stars for nighttime */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {/* Clouds for cloudy */}
      <div id="cloud-group-1">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
       <div id="cloud-group-2">
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
        <div className="cloud cloud-6"></div>
      </div>
      
      {/* Streaks for rainy */}
      <div className="rain-streaks"></div>

      {/* Snow flakes */}
      <div className="snowflake-container"></div>

      {/* Storm effect */}
      <div className="storm-flash"></div>
    </div>
  );
};

export default Background;
