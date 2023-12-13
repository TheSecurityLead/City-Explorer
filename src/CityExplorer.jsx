import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import LocationInfo from './LocationInfo';
import Weather from './Weather';
import ErrorAlert from './ErrorAlert';

const CityExplorer = () => {
  const [city, setCity] = useState('');
  const [locationInfo, setLocationInfo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const cityIsInUS = (cityName) => {
  const usCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  return usCities.includes(cityName);
};
  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(`/weather?lat=${lat}&lon=${lon}&searchQuery=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  setError('');
  setLoading(true);

  try {
    const regionURL = cityIsInUS(city) ? 'https://us1.locationiq.com/v1/search.php' : 'https://eu1.locationiq.com/v1/search.php';
    const response = await axios.get(regionURL, {
      params: {
        key: import.meta.env.VITE_APIKEY_CITY_EXPLORER,
        q: city,
        format: 'json'
      }
    });

    setLocationInfo(response.data[0]); // Assuming the response data is an array
    fetchWeatherData(response.data[0].lat, response.data[0].lon);
  } catch (error) {
    console.error('Error fetching location:', error);
    setError('Failed to fetch location. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <SearchForm setCity={setCity} handleSubmit={handleSubmit} loading={loading} />
      <ErrorAlert message={error} />
      {locationInfo && <LocationInfo locationInfo={locationInfo} />}
      {weatherData && <Weather forecasts={weatherData} />}
    </div>
  );
};

export default CityExplorer;
