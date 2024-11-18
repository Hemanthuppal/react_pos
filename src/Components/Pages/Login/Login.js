import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { role } = response.data.user;
      if (role === 'Admin') {
        navigate('/dashboard'); // Navigate to admin path
      } else if (role === 'User') {
        navigate('/userpos'); // Navigate to user path
      } else {
        alert('Invalid role');
      }
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">POS<span style={{ color: '#007bff' }}>BARCODE</span></h2>
        <p className="text-center">Sign in to start your session</p>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input-icon">
              <i className="fa fa-envelope"></i>
            </span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-icon">
              <i className="fa fa-lock"></i>
            </span>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <a href="#forgot-password" className="forgot-password">I forgot my password</a>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
