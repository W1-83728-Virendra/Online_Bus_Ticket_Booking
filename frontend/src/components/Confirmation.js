import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const { state } = useLocation();
  const { reservationDetails } = state || {};

  const styles = {
    container: {
      maxWidth: '800px',
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
    },
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      borderBottom: '2px solid #007bff',
      paddingBottom: '5px',
      color: '#007bff',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    detail: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Payment Successful!</h3>
      <p style={styles.heading}>Thank you for booking with us.</p>
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Reservation Details:</h4>
        {reservationDetails ? (
          <div>
            <p><strong>Bus Name:</strong> {reservationDetails.busDetails.bus_name}</p>
            <p><strong>Bus Type:</strong> {reservationDetails.busDetails.bus_type}</p>
            <p><strong>Arrival Time:</strong> {new Date(reservationDetails.busDetails.arival_time).toLocaleString()}</p>
            <p><strong>Fare:</strong> {reservationDetails.busDetails.fare}</p>
            <p><strong>Departure Time:</strong> {new Date(reservationDetails.busDetails.departure_time).toLocaleString()}</p>
          </div>
        ) : (
          <p>No reservation details available.</p>
        )}
      </div>
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Seats Reserved:</h4>
        {reservationDetails ? (
          <ul style={styles.list}>
            {reservationDetails.seats.map((seat, index) => (
              <li key={index} style={styles.listItem}>Seat {seat}</li>
            ))}
          </ul>
        ) : (
          <p>No seats reserved.</p>
        )}
      </div>
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Passenger Details:</h4>
        {reservationDetails ? (
          reservationDetails.passengerDetails.map((detail, index) => (
            <div key={index} style={styles.detail}>
              <h5>Passenger {index + 1}</h5>
              <p><strong>Name:</strong> {detail.name}</p>
              <p><strong>Age:</strong> {detail.age}</p>
              <p><strong>Gender:</strong> {detail.gender}</p>
              <p><strong>Boarding Stop:</strong> {detail.boardingStop}</p>
              <p><strong>Alighting Stop:</strong> {detail.alightingStop}</p>
            </div>
          ))
        ) : (
          <p>No passenger details available.</p>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
