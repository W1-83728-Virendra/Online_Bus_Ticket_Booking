import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#cceeff',
      textAlign: 'center',
    },
    heading: {
      color: '#333',
      marginBottom: '20px',
    },
    list: {
      listStyle: 'none',
      padding: '0',
      marginBottom: '20px',
    },
    listItem: {
      marginBottom: '10px',
    },
    link: {
      textDecoration: 'none',
      color: '#007bff',
      fontSize: '18px',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#dc3545',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#c82333',
    },
  };

  return (
    <div>
      <br></br>
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/admin/add-bus" style={styles.link} 
            onMouseOver={(e) => e.target.style.color = styles.linkHover.color}
            onMouseOut={(e) => e.target.style.color = styles.link.color}
          >
            Add Bus
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/admin/bus-list" style={styles.link}
            onMouseOver={(e) => e.target.style.color = styles.linkHover.color}
            onMouseOut={(e) => e.target.style.color = styles.link.color}
          >
            Bus List
          </Link>
        </li>
      </ul>
      <button 
        onClick={onLogout}
        style={styles.button}
        onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
      >
        Logout
      </button>
    </div>
    </div>
  );
};

export default AdminDashboard;
