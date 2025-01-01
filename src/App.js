import React, { useState} from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const API_KEY = 'af80d326e718e2202738d3e9a6185d9b'; // Replace with your OpenWeatherMap API key
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Fetch temperature in Celsius
        },
      });
      setWeatherData(response.data);
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
