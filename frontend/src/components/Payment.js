import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Payment = () => {
  const { state } = useLocation();
  const { reservationId, busDetails, seats, passengerDetails } = state || {};
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const response = await api.post('/api/payment/process', {
        reservationId,
        paymentMethod
      });

      navigate('/confirmation', {
        state: {
          reservationDetails: {
            busDetails,
            seats,
            passengerDetails
          }
        }
      });
    } catch (error) {
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
      backgroundColor: '#ffffff',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      margin: '10px 0',
    },
    button: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#28a745',
      color: '#ffffff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
  };

  return (
    <div>
      <br /><br /><br />
    <div style={styles.container}>
      <h3 style={styles.heading}>Payment</h3>
      <select 
        value={paymentMethod} 
        onChange={(e) => setPaymentMethod(e.target.value)} 
        style={styles.select}
      >
        <option value="UPI">UPI</option>
        <option value="PhonePe">PhonePe</option>
        <option value="GPay">GPay</option>
        <option value="other">Other</option>
      </select>
      <button 
        onClick={handlePayment} 
        style={styles.button}
        onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Pay Now
      </button>
    </div>
    </div>
  );
};

export default Payment;
