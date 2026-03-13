import React from 'react';
import { Droplet, Wind, Sun, Eye, Gauge, Thermometer } from 'lucide-react';
import useCountUp from '../hooks/useCountUp';
import './WeatherDetails.css';

const MetricCard = ({ label, value, unit, icon: Icon, color }) => {
    const animatedValue = useCountUp(value, 1500);

    const cardStyle = {
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, rgba(0,0,0,0) 70%)`,
    };

    const iconStyle = {
        filter: `drop-shadow(0 0 8px ${color})`,
    };

    return (
        <div className="glass-card metric-card noise-overlay p-6 flex flex-col justify-between rounded-xl" style={cardStyle}>
            <div className="flex justify-between items-start mb-4">
                <p className="text-frostWhite text-opacity-70 text-sm font-medium">{label}</p>
                <Icon size={18} style={iconStyle} className="text-frostWhite"/>
            </div>
            <div>
                <span className="text-3xl font-bold text-frostWhite">{animatedValue}</span>
                <span className="text-sm text-frostWhite text-opacity-60 ml-2">{unit}</span>
            </div>
        </div>
    );
};


const WeatherDetails = ({ humidity, windSpeed, uvIndex, visibility, pressure, feelsLike, condition = 'Clear' }) => {
    // Get colors based on weather condition
    const getWeatherColors = (cond) => {
        const condLower = cond.toLowerCase();
        
        if (condLower.includes('clear') || condLower.includes('sunny')) {
            return {
                humidity: 'rgba(135, 206, 250, 0.2)',      // Sky blue
                windSpeed: 'rgba(255, 215, 0, 0.2)',        // Gold
                uvIndex: 'rgba(255, 140, 0, 0.2)',          // Dark orange
                visibility: 'rgba(240, 255, 255, 0.2)',     // Azure
                pressure: 'rgba(255, 182, 193, 0.2)',       // Light pink
                feelsLike: 'rgba(255, 128, 0, 0.2)'         // Orange
            };
        } else if (condLower.includes('cloud')) {
            return {
                humidity: 'rgba(169, 169, 169, 0.2)',       // Gray
                windSpeed: 'rgba(176, 196, 222, 0.2)',      // Light slate
                uvIndex: 'rgba(211, 211, 211, 0.2)',        // Light gray
                visibility: 'rgba(192, 192, 192, 0.2)',     // Silver
                pressure: 'rgba(128, 128, 128, 0.2)',       // Medium gray
                feelsLike: 'rgba(105, 105, 105, 0.2)'       // Dim gray
            };
        } else if (condLower.includes('rain') || condLower.includes('drizzle')) {
            return {
                humidity: 'rgba(52, 152, 219, 0.2)',        // Blue
                windSpeed: 'rgba(41, 128, 185, 0.2)',       // Darker blue
                uvIndex: 'rgba(46, 185, 234, 0.2)',         // Cyan
                visibility: 'rgba(155, 189, 229, 0.2)',     // Powder blue
                pressure: 'rgba(110, 142, 179, 0.2)',       // Steel blue
                feelsLike: 'rgba(44, 62, 80, 0.2)'          // Dark blue
            };
        } else if (condLower.includes('snow')) {
            return {
                humidity: 'rgba(176, 224, 230, 0.2)',       // Powder blue
                windSpeed: 'rgba(230, 230, 250, 0.2)',      // Lavender
                uvIndex: 'rgba(240, 248, 255, 0.2)',        // Alice blue
                visibility: 'rgba(240, 255, 240, 0.2)',     // Honeydew
                pressure: 'rgba(240, 255, 255, 0.2)',       // Azure
                feelsLike: 'rgba(192, 212, 230, 0.2)'       // Light steel blue
            };
        } else if (condLower.includes('thunderstorm') || condLower.includes('storm')) {
            return {
                humidity: 'rgba(75, 0, 130, 0.2)',          // Indigo
                windSpeed: 'rgba(139, 0, 139, 0.2)',        // Dark magenta
                uvIndex: 'rgba(153, 0, 153, 0.2)',          // Purple
                visibility: 'rgba(138, 43, 226, 0.2)',      // Blue violet
                pressure: 'rgba(70, 0, 130, 0.2)',          // Very dark indigo
                feelsLike: 'rgba(99, 0, 99, 0.2)'           // Dark purple
            };
        } else if (condLower.includes('fog') || condLower.includes('mist') || condLower.includes('haze')) {
            return {
                humidity: 'rgba(160, 160, 160, 0.2)',       // Gray
                windSpeed: 'rgba(128, 128, 128, 0.2)',      // Medium gray
                uvIndex: 'rgba(192, 192, 192, 0.2)',        // Silver
                visibility: 'rgba(169, 169, 169, 0.2)',     // Dark gray
                pressure: 'rgba(112, 112, 112, 0.2)',       // Dim gray
                feelsLike: 'rgba(105, 105, 105, 0.2)'       // Dim gray
            };
        }
        
        // Default to clear colors
        return {
            humidity: 'rgba(56, 189, 248, 0.15)',
            windSpeed: 'rgba(167, 139, 250, 0.15)',
            uvIndex: 'rgba(253, 224, 71, 0.15)',
            visibility: 'rgba(255, 255, 255, 0.1)',
            pressure: 'rgba(253, 94, 83, 0.15)',
            feelsLike: 'rgba(255, 165, 0, 0.15)'
        };
    };

    const colors = getWeatherColors(condition);

    const metrics = [
        { label: 'Humidity', value: humidity, unit: '%', icon: Droplet, color: colors.humidity },
        { label: 'Wind Speed', value: windSpeed, unit: 'km/h', icon: Wind, color: colors.windSpeed },
        { label: 'UV Index', value: uvIndex, unit: '', icon: Sun, color: colors.uvIndex },
        { label: 'Visibility', value: visibility, unit: 'km', icon: Eye, color: colors.visibility },
        { label: 'Pressure', value: pressure, unit: 'hPa', icon: Gauge, color: colors.pressure },
        { label: 'Feels Like', value: feelsLike, unit: '°C', icon: Thermometer, color: colors.feelsLike }
    ];

    return (
        <div className="glass-card noise-overlay p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-frostWhite mb-6">Weather Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map(metric => (
                    <MetricCard key={metric.label} {...metric} />
                ))}
            </div>
        </div>
    );
};

export default WeatherDetails;
