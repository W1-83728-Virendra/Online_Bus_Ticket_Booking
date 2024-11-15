import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout, isAdmin }) => {
  const styles = {
    header: {
      backgroundColor: '#343a40',
      color: '#ffffff',
      padding: '10px 20px',
      borderBottom: '2px solid #495057',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      margin: '0 15px',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#adb5bd',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s, color 0.3s',
      marginLeft: '10px',
    },
    buttonLogin: {
      backgroundColor: '#007bff',
      color: '#ffffff',
    },
    buttonLoginHover: {
      backgroundColor: '#0056b3',
    },
    buttonLogout: {
      backgroundColor: '#dc3545',
      color: '#ffffff',
    },
    buttonLogoutHover: {
      backgroundColor: '#c82333',
    },
  };

  return (
    <header style={styles.header} >
      <nav style={styles.nav} class='navbar'>
        <div style={styles.logo}>...TripMate...</div>
        <div>
          <Link to="/" style={{ ...styles.link }} onMouseOver={(e) => e.target.style.color = styles.linkHover.color} onMouseOut={(e) => e.target.style.color = '#ffffff'}>Home</Link>
          {isAuthenticated && isAdmin && <Link to="/admin" style={{ ...styles.link }} onMouseOver={(e) => e.target.style.color = styles.linkHover.color} onMouseOut={(e) => e.target.style.color = '#ffffff'}>Admin Dashboard</Link>}
          {isAuthenticated ? (
            <button 
              style={{ ...styles.button, ...styles.buttonLogout }}
              onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonLogoutHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.buttonLogout.backgroundColor}
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ ...styles.button, ...styles.buttonLogin }} onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonLoginHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = styles.buttonLogin.backgroundColor}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
