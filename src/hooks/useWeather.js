import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = 'ac81f377bad544e699c105334261103'; // IMPORTANT: Replace with your OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';



const useWeather = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatWeatherData = (current, forecast) => {
    // Extract data from current weather
    const {
      main: { temp, feels_like, humidity, pressure },
      wind: { speed: windSpeed },
      visibility,
      name: cityName,
    } = current;
    const { main: condition, icon } = current.weather[0];

    // Process hourly forecast
    const hourly = forecast.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).getHours() + ':00',
      temp: Math.round(item.main.temp),
      condition: item.weather[0].main,
    }));

    // Process weekly forecast
    const weekly = forecast.list
      .filter((item, index) => index % 8 === 0) // Get one forecast per day
      .map(item => ({
        day: new Date(item.dt * 1000).toLocaleString('en-US', { weekday: 'short' }),
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        condition: item.weather[0].main,
      }));

    return {
      city: cityName,
      temperature: Math.round(temp),
      feelsLike: Math.round(feels_like),
      humidity,
      pressure,
      windSpeed: Math.round(windSpeed * 3.6), // convert m/s to km/h
      visibility: Math.round(visibility / 1000), // convert m to km
      condition,
      icon,
      uvIndex: 5, // Placeholder, this needs a different API call
      hourly,
      weekly,
    };
  };

  const fetchWeather = useCallback(async (searchCity) => {
    if (!searchCity) {
        setError('No city specified.');
        return;
    }
    if (API_KEY === 'YOUR_API_KEY') {
        setError('API key is missing. Please add it to `src/hooks/useWeather.js`.');
        return;
    }
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const weatherResponse = await axios.get(`${API_BASE_URL}/weather`, {
        params: { q: searchCity, appid: API_KEY, units: 'metric' },
      });

      // Fetch 5-day/3-hour forecast
      const forecastResponse = await axios.get(`${API_BASE_URL}/forecast`, {
        params: { q: searchCity, appid: API_KEY, units: 'metric' },
      });

      const formattedData = formatWeatherData(weatherResponse.data, forecastResponse.data);
      setWeatherData(formattedData);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError('Could not fetch weather data. Check the city name or API key.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city, fetchWeather]);

  return { weatherData, loading, error, fetchWeather };
};

export default useWeather;
