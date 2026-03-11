import React from 'react';
import '../styles/Background.css';

const Background = ({ condition = 'clear' }) => {
  const getConditionClass = () => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'daytime';
      case 'cloudy':
        return 'cloudy';
      case 'rainy':
        return 'rainy';
      case 'snowy':
        return 'snowy';
      // Add a 'night' case if you have time of day data
      default:
        return 'nighttime';
    }
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
    </div>
  );
};

export default Background;
