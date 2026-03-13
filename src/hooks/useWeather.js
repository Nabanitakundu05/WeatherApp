import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';


const useWeather = (city, coordinates) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatWeatherData = (current, forecast) => {
    const {
      main: { temp, feels_like, humidity, pressure },
      wind: { speed: windSpeed },
      visibility,
      name: cityName,
    } = current;
    const { main: condition, icon } = current.weather[0];

    const hourly = forecast.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).getHours() + ':00',
      temp: Math.round(item.main.temp),
      condition: item.weather[0].main,
    }));

    const weekly = forecast.list
      .filter((item, index) => index % 8 === 0)
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
      windSpeed: Math.round(windSpeed * 3.6),
      visibility: Math.round(visibility / 1000),
      condition,
      icon,
      uvIndex: 5,
      hourly,
      weekly,
    };
  };

  const fetchWeather = useCallback(async (searchCity, coords) => {
    if (!searchCity && !coords) {
        setError('No city or location specified.');
        return;
    }
    if (API_KEY === 'YOUR_API_KEY') {
        setError('API key is missing. Please add it to `src/hooks/useWeather.js`.');
        return;
    }
    setLoading(true);
    setError(null);
    try {
      let weatherResponse, forecastResponse;
      
      if (coords && coords.lat && coords.lon) {
        // Fetch by coordinates
        weatherResponse = await axios.get(`${API_BASE_URL}/weather`, {
          params: { lat: coords.lat, lon: coords.lon, appid: API_KEY, units: 'metric' },
        });
        forecastResponse = await axios.get(`${API_BASE_URL}/forecast`, {
          params: { lat: coords.lat, lon: coords.lon, appid: API_KEY, units: 'metric' },
        });
      } else {
        // Fetch by city name
        weatherResponse = await axios.get(`${API_BASE_URL}/weather`, {
          params: { q: searchCity, appid: API_KEY, units: 'metric' },
        });
        forecastResponse = await axios.get(`${API_BASE_URL}/forecast`, {
          params: { q: searchCity, appid: API_KEY, units: 'metric' },
        });
      }

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
    if (city || coordinates) {
      fetchWeather(city, coordinates);
    }
  }, [city, coordinates, fetchWeather]);

  return { weatherData, loading, error, fetchWeather };
};

export default useWeather;
