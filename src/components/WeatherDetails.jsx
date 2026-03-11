import React from 'react';
import { Droplet, Wind, Sun, Eye, Gauge, Thermometer } from 'lucide-react';
import useCountUp from '../hooks/useCountUp';
import './WeatherDetails.css';

const MetricCard = ({ label, value, unit, icon, color }) => {
    const animatedValue = useCountUp(value, 1500);
    const Icon = icon;

    const cardStyle = {
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, rgba(0,0,0,0) 70%)`,
    };

    const iconStyle = {
        filter: `drop-shadow(0 0 10px ${color})`,
    };

    return (
        <div className="glass-card metric-card noise-overlay p-4 flex flex-col justify-between" style={cardStyle}>
            <div className="flex justify-between items-center text-frostWhite text-opacity-70">
                <p>{label}</p>
                <Icon size={20} style={iconStyle}/>
            </div>
            <div>
                <span className="text-4xl font-bold text-frostWhite">{animatedValue}</span>
                <span className="text-lg text-frostWhite text-opacity-70 ml-1">{unit}</span>
            </div>
        </div>
    );
};


const WeatherDetails = ({ humidity, windSpeed, uvIndex, visibility, pressure, feelsLike }) => {
    const metrics = [
        { label: 'Humidity', value: humidity, unit: '%', icon: Droplet, color: 'rgba(56, 189, 248, 0.2)' },
        { label: 'Wind Speed', value: windSpeed, unit: 'km/h', icon: Wind, color: 'rgba(167, 139, 250, 0.2)' },
        { label: 'UV Index', value: uvIndex, unit: '', icon: Sun, color: 'rgba(253, 224, 71, 0.2)' },
        { label: 'Visibility', value: visibility, unit: 'km', icon: Eye, color: 'rgba(255, 255, 255, 0.2)' },
        { label: 'Pressure', value: pressure, unit: 'hPa', icon: Gauge, color: 'rgba(253, 94, 83, 0.2)' },
        { label: 'Feels Like', value: feelsLike, unit: '°', icon: Thermometer, color: 'rgba(255, 165, 0, 0.2)' }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {metrics.map(metric => (
                <MetricCard key={metric.label} {...metric} />
            ))}
        </div>
    );
};

export default WeatherDetails;
