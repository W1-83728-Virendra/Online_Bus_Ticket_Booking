import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BusList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSelectBus = (busId) => {
    navigate(`/select-seat/${busId}`);
  };

  const buses = Array.isArray(state.buses) ? state.buses : [];

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      padding: '15px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s, box-shadow 0.3s',
    },
    listItemHover: {
      backgroundColor: '#e9ecef',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    noBuses: {
      textAlign: 'center',
      color: '#666',
    },
  };

  return (
    <div><br></br>
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Buses</h2>
      {buses.length > 0 ? (
        <ul style={styles.list}>
          {buses.map(bus => (
            <li
              key={bus.bus_id}
              onClick={() => handleSelectBus(bus.bus_id)}
              style={styles.listItem}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.listItem.backgroundColor}
            >
              {bus.bus_name} - {bus.bus_type} - ${bus.fare} - {new Date(bus.departure_time).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noBuses}>No buses available.</p>
      )}
    </div>
    </div>
  );
};

export default BusList;
