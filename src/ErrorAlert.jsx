import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return <Alert variant="danger">{message}</Alert>;
};

export default ErrorAlert;