import React from 'react';
import './Weathercard.css';

const WeatherCard = ({ weatherData }) => {
  const { name, main, weather, wind } = weatherData;

  return (
    <div className="weather-card">
      <h2 className="weather-city">{name}</h2>
      <div className="weather-info">
        <p><strong>Temperature:</strong> {Math.floor(main.temp)}°C</p>
        <p><strong>Feels Like:</strong> {Math.floor(main.feels_like)}°C</p>
        <p><strong>Humidity:</strong> {Math.floor(main.humidity)}%</p>
        <p><strong>Weather:</strong> {weather[0].description}</p>
        <p><strong>Wind Speed:</strong> {(wind.speed)} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
