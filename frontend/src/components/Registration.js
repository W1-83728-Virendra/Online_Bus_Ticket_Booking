import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import busImage from "../assets/bus.jpg";
import api from '../services/api';
const Registration = () => {
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
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
      const response = await api.post('/api/auth/register', form);
      alert(response.data.message);
      navigate('/login');
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
      maxWidth: '500px',
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
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
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
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: '10px',
    },
  };

  return (
    <div>
      <br /><br></br><br></br>
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={styles.input}
        />
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
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Register
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default Registration;
