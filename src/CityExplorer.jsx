import React, { useState } from 'react';  // eslint-disable-line no-unused-vars
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const CityExplorer = () => {
  const [city, setCity] = useState('');
  const [locationInfo, setLocationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
console.log(import.meta.env.VITE_APIKEY_CITY_EXPLORER)
    try {
      const regionURL = cityIsInUS(city) ? 'https://us1.locationiq.com/v1/search.php' : 'https://eu1.locationiq.com/v1/search.php';
      const response = await axios.get(regionURL, {
        params: {
          key:import.meta.env.VITE_APIKEY_CITY_EXPLORER,
          q: city,
          format: 'json'
        }
      });

      setLocationInfo(response.data[0]);
    } catch (error) {
      console.error('Error fetching location data:', error);
      setError('Failed to fetch location data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cityIsInUS = (cityName) => {
    
    const usCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    return usCities.includes(cityName);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cityInput">
          <Form.Label>City Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter city" onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Explore!
        </Button>
      </Form>

      {error && <p className="text-danger">{error}</p>}

      {locationInfo && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>{locationInfo.display_name}</Card.Title>
            <Card.Text>Latitude: {locationInfo.lat}</Card.Text>
            <Card.Text>Longitude: {locationInfo.lon}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CityExplorer;
