import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const BusSearch = () => {
  const [form, setForm] = useState({
    start_location: '',
    end_location: '',
    date: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/bus/search', form);
      navigate('/buslist', { state: { buses: response.data } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    submitButton: {
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div><br></br><br></br>
    <div style={styles.container}>
      <h2 style={styles.heading}>Search for Buses</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="start_location"
          value={form.start_location}
          onChange={handleChange}
          placeholder="Start Location"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <input
          type="text"
          name="end_location"
          value={form.end_location}
          onChange={handleChange}
          placeholder="End Location"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.submitButton.backgroundColor}
        >
          Search Buses
        </button>
      </form>
    </div>
    </div>
  );
};

export default BusSearch;
