import React from 'react';
import { Link } from 'react-router-dom';
import tripImage from "../assets/trip.jpg";

const Home = ({ isAuthenticated }) => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      backgroundImage: `url(${tripImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white overlay for better readability
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'inline-block',
    },
    heading: {
      fontSize: '36px',
      color: '#343a40',
      marginBottom: '20px',
    },
    link: {
      display: 'inline-block',
      padding: '10px 20px',
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#007bff',
      textDecoration: 'none',
      borderRadius: '4px',
      transition: 'background-color 0.3s',
    },
    linkHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      fontSize: '18px',
      color: '#6c757d',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.heading}>Welcome to the "TripMate" Bus Reservation System</h2>
        {isAuthenticated ? (
          <Link 
            to="/search" 
            style={styles.link}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.linkHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Search Buses
          </Link>
        ) : (
          <p style={styles.message}>Please log in to search for buses.</p>
        )}
      </div>
    </div>
  );
};

export default Home;


