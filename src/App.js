import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your OpenWeatherMap API key
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Fetch temperature in Celsius
        },
      });

      // Fetch full country name using the country code
      const countryCode = response.data.sys.country;
      const countryResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const countryName = countryResponse.data[0].name.common;

      // Set the weather data including the full country name
      setWeatherData({
        city: response.data.name,
        country: countryName, // Full country name
        main: response.data.main,
        weather: response.data.weather[0], // Use first weather object for description
        wind: response.data.wind,
      });

      setError('');
    } catch (err) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeather();
  };

  return (
    <div className='container'>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default App;
