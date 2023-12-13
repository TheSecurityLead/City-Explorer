import React from 'react';
import { Card } from 'react-bootstrap';

const LocationInfo = ({ locationInfo }) => {
  const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=YOUR_API_KEY&center=${locationInfo.lat},${locationInfo.lon}&zoom=12`;

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{locationInfo.display_name}</Card.Title>
          <Card.Text>Latitude: {locationInfo.lat}</Card.Text>
          <Card.Text>Longitude: {locationInfo.lon}</Card.Text>
        </Card.Body>
      </Card>
      <div className="map-container mt-3">
        <img src={mapUrl} alt={`Map of ${locationInfo.display_name}`} className="img-fluid" />
      </div>
    </>
  );
};

export default LocationInfo;