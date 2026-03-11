import React, { useState, useEffect } from 'react';
import { WeatherProvider, useWeatherContext } from './context/WeatherContext';
import Background from './components/Background';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import ErrorCard from './components/ErrorCard';
import SkeletonLoader from './components/SkeletonLoader';
import './App.css';
import './styles/animations.css';

const AppContent = () => {
  const { weatherData, loading, error } = useWeatherContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (weatherData) {
      if (!initialLoad) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 1000); // Duration of the blur-out-fade-in animation
        return () => clearTimeout(timer);
      } else {
        setInitialLoad(false);
      }
    }
  }, [weatherData]);
  
  if (loading && initialLoad) {
    return (
      <>
        <Background />
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-xs"></div>
        <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-4 sm:p-8">
          <SkeletonLoader />
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Background />
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-xs"></div>
        <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-4 sm:p-8">
          <div className="w-full max-w-lg">
            <SearchBar />
            <ErrorCard message={error} />
          </div>
        </main>
      </>
    )
  }
  
  if (!weatherData) return null;

  return (
    <>
      <Background condition={weatherData.condition} />
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-xs"></div>
      <main className={`relative z-10 flex flex-col items-center w-full p-4 sm:p-8 ${isAnimating ? 'weather-change-animation' : ''}`}>
        <div className="w-full max-w-lg">
          <div className={initialLoad ? "card-animation" : ""} style={{ animationDelay: '0.1s' }}>
            <SearchBar />
          </div>
          <div className={initialLoad ? "card-animation" : ""} style={{ animationDelay: '0.2s' }}>
            <WeatherCard {...weatherData} />
          </div>
          <div className={initialLoad ? "card-animation" : ""} style={{ animationDelay: '0.3s' }}>
            <WeatherDetails {...weatherData} />
          </div>
          <div className={initialLoad ? "card-animation" : ""} style={{ animationDelay: '0.4s' }}>
            <HourlyForecast data={weatherData.hourly} />
          </div>
          <div className={initialLoad ? "card-animation" : ""} style={{ animationDelay: '0.5s' }}>
            <WeeklyForecast data={weatherData.weekly} />
          </div>
        </div>
      </main>
    </>
  );
};

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;

