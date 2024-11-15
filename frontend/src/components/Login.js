import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import busImage from "../assets/bus.jpg";
import api from '../services/api';


const Login = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error message
    try {
      const response = await api.post('/api/auth/login', form);
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.role); // Pass the role to the onLogin function
      navigate('/Home');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        setError('No response received from the server.');
      } else {
        setError('An error occurred while setting up the request.');
      }
      console.error('Error:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffd9b3',
      backgroundImage: `url(${busImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    submitButton: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
    },
    registerLink: {
      display: 'block',
      textAlign: 'center',
      marginTop: '15px',
      color: '#007bff',
      textDecoration: 'none',
    },
    registerLinkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div>
      <br /><br /><br /><br />
    
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Login
        </button>
        {error && <p style={styles.errorMessage}>{error}</p>}
      </form>
      <p style={{ color:"white" }}>
        Don't have an account? <Link to="/register" style={styles.registerLink} onMouseOver={(e) => e.target.style.textDecoration = styles.registerLinkHover.textDecoration} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Register here</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
