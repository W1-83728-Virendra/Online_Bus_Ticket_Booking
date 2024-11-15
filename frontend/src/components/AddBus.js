import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddBus = () => {
  const [form, setForm] = useState({
    bus_name: '',
    bus_type: '',
    arival_time: '',
    departure_time: '',
    distance: '',
    end_location: '',
    fare: '',
    start_location: '',
    total_seates: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/admin/add-bus', {
        ...form,
        booked_seates: 0 // Ensure booked_seates is set to 0
      }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      setMessage(response.data.message);
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
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
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
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      color: 'green',
      textAlign: 'center',
    },
    backButton: {
      display: 'block',
      marginBottom: '20px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#6c757d',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    backButtonHover: {
      backgroundColor: '#5a6268',
    },
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton} 
        onClick={() => navigate('/admin')}
      >
        Back to Dashboard
      </button>
      <h2 style={styles.heading}>Add Bus</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="bus_name"
          value={form.bus_name}
          onChange={handleChange}
          placeholder="Bus Name"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <input
          type="text"
          name="bus_type"
          value={form.bus_type}
          onChange={handleChange}
          placeholder="Bus Type"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <input
          type="datetime-local"
          name="departure_time"
          value={form.departure_time}
          onChange={handleChange}
          placeholder="Departure Time"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <input
          type="datetime-local"
          name="arival_time"
          value={form.arival_time}
          onChange={handleChange}
          placeholder="Arrival Time"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <input
          type="number"
          name="distance"
          value={form.distance}
          onChange={handleChange}
          placeholder="Distance"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
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
          type="number"
          name="fare"
          value={form.fare}
          onChange={handleChange}
          placeholder="Fare"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <input
          type="number"
          name="total_seates"
          value={form.total_seates}
          onChange={handleChange}
          placeholder="Total Seats"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.submitButton.backgroundColor}
        >
          Add Bus
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default AddBus;
