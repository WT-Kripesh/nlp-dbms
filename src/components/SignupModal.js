import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function SignupModal({ show, handleClose }) {
  const [formData, setFormData] = useState({ host: '', username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.validateCredentials(formData);
      if (response.success) {
        navigate('/dashboard', { state: { dbInfo: response.dbInfo } });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Connection failed. Please check your credentials.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Database Credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formHost">
            <Form.Label>Host</Form.Label>
            <Form.Control
              type="text"
              name="host"
              placeholder="Enter host"
              value={formData.host}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupModal;