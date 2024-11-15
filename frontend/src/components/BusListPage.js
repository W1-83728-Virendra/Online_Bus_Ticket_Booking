import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const BusListPage = () => {
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (buses.length === 0 && date) {
      setMessage('No buses are available for the selected date.');
    } else {
      setMessage('');
    }
  }, [buses]);

  const handleSearch = async () => {
    if (!date) {
      alert('Please select a date');
      return;
    }
  
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await api.get(`/api/bus/by-date?date=${formattedDate}`);
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setBuses([]); // Ensure buses array is empty on error
    }
  };

  const handleDelete = async (busId) => {
    try {
      await api.delete(`/api/admin/delete-bus/${busId}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      setBuses(buses.filter(bus => bus.bus_id !== busId));
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  const handleViewReservations = (busId) => {
    navigate(`/admin/passenger-details?busId=${busId}&date=${date}`);
  };

  return (
    <div style={{ padding: '20px' ,color:"white"}}>
      <h3>Search Buses by Date</h3>
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: '10px' }} 
      />
      <button style={{ backgroundColor:"#33cc00"}}onClick={handleSearch}>Search</button>

      {message && <p style={{ color: 'red', marginTop: '20px' }}>{message}</p>}

      {buses.length > 0 && (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }} class='table'>
          <thead>
            <tr>
              <th style={{ width: '25%', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Bus Name</th>
              <th style={{ width: '25%', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Bus Type</th>
              <th style={{ width: '25%', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Departure Time</th>
              <th style={{ width: '25%', padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.bus_id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{bus.bus_name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{bus.bus_type}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{new Date(bus.departure_time).toLocaleString()}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <button style={{ backgroundColor:'#33cc00', color:"white" , border:"none"}}onClick={() => handleViewReservations(bus.bus_id)}>View Reservations</button>
                  <button 
                    onClick={() => handleDelete(bus.bus_id)} 
                    style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white',border:"none" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusListPage;
