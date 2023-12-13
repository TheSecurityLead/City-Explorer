import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchForm = ({ setCity, handleSubmit, loading }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="cityInput">
        <Form.Label>City Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter city" onChange={e => setCity(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Explore!
      </Button>
    </Form>
  );
};

export default SearchForm;
