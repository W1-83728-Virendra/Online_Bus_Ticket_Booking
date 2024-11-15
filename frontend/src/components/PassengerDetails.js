import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';

const PassengerDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const busId = params.get('busId');
  const date = params.get('date');

  const [reservations, setReservations] = useState([]);
  const [busDetails, setBusDetails] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get(`/api/admin/reservations?busId=${busId}&date=${date}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        setReservations(response.data);

        if (response.data.length > 0) {
          // Assuming all reservations have the same bus details
          setBusDetails(response.data[0].Bus);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [busId, date]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
     
      
      {busDetails.bus_name && (
        <div style={{ marginBottom: '20px', textAlign: 'center', backgroundColor:"rgb(204, 238, 255)"}}>
          <h3>Bus Information</h3>
          <p><strong>Bus Name:</strong> {busDetails.bus_name}</p>
          <p><strong>Bus Type:</strong> {busDetails.bus_type}</p>
          <p><strong>Total Seats:</strong> {busDetails.total_seates}</p>
          <p><strong>Booked Seats:</strong> {busDetails.booked_seates}</p>
          <hr />
        </div>
      )}
      
      <h3 style={{ textAlign: 'center' }}>Passenger Details</h3>

      {reservations.length > 0 ? (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Passenger Name</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Age</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Gender</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Seat Number</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Boarding Stop</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Alighting Stop</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.reservation_id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.passenger_name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.passenger_age}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.passenger_gender}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.seat_number}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.boarding_stop}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{res.alighting_stop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No reservations found.</p>
      )}
    </div>
  );
};

export default PassengerDetails;
