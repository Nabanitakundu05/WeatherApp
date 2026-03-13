import React, { createContext, useContext, useState } from 'react';
import useWeather from '../hooks/useWeather';

const WeatherContext = createContext(null);

export const useWeatherContext = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeatherContext must be used within a WeatherProvider');
    }
    return context;
};

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState(() => localStorage.getItem('lastCity') || 'London');
    const [coordinates, setCoordinatesState] = useState(null);
    const { weatherData: rawWeatherData, loading, error } = useWeather(city, coordinates);
    const [tempUnit, setTempUnit] = useState('C');

    const handleSetCity = (newCity) => {
        setCity(newCity);
        setCoordinatesState(null);
        localStorage.setItem('lastCity', newCity);
    };

    const handleSetCoordinates = (lat, lon) => {
        setCoordinatesState({ lat, lon });
        localStorage.setItem('lastLat', lat);
        localStorage.setItem('lastLon', lon);
    };

    const toggleTempUnit = () => {
        setTempUnit(prevUnit => prevUnit === 'C' ? 'F' : 'C');
    };

    const convertToFahrenheit = (celsius) => {
        return Math.round((celsius * 9/5) + 32);
    };

    const weatherData = rawWeatherData ? {
        ...rawWeatherData,
        temperature: tempUnit === 'C' ? rawWeatherData.temperature : convertToFahrenheit(rawWeatherData.temperature),
        feelsLike: tempUnit === 'C' ? rawWeatherData.feelsLike : convertToFahrenheit(rawWeatherData.feelsLike),
        hourly: rawWeatherData.hourly.map(h => ({ ...h, temp: tempUnit === 'C' ? h.temp : convertToFahrenheit(h.temp) })),
        weekly: rawWeatherData.weekly.map(d => ({ ...d, high: tempUnit === 'C' ? d.high : convertToFahrenheit(d.high), low: tempUnit === 'C' ? d.low : convertToFahrenheit(d.low) })),
    } : null;

    const value = {
        weatherData,
        loading,
        error,
        setCity: handleSetCity,
        city,
        tempUnit,
        toggleTempUnit,
        setCoordinates: handleSetCoordinates,
        coordinates
    };

    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    );
};
