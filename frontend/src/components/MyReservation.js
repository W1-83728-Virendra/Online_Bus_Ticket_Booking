import React, { useState, useEffect } from 'react';
import api from '../services/api';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get('/api/reservations/my'); // Assuming this is the endpoint to get user's reservations
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>My Reservations</h3>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>Bus Type</th>
              <th>Seat Number</th>
              <th>Boarding Stop</th>
              <th>Alighting Stop</th>
              <th>Departure Time</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <td>{reservation.bus.bus_name}</td>
                <td>{reservation.bus.bus_type}</td>
                <td>{reservation.seat_number}</td>
                <td>{reservation.boarding_stop}</td>
                <td>{reservation.alighting_stop}</td>
                <td>{new Date(reservation.bus.departure_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReservations;
