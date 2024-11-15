// App.js
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddBus from './components/AddBus';
import AdminDashboard from './components/AdminDashboard';
import BusList from './components/BusList';
import BusListPage from './components/BusListPage';
import BusSearch from './components/BusSearch';
import Confirmation from './components/Confirmation';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import MyReservations from './components/MyReservation';
import PassengerDetails from './components/PassengerDetails';
import Payment from './components/Payment';
import Registration from './components/Registration';
import SeatSelection from './components/SeatSelection';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    if (role === 'admin') {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<div className="home-page"><div className="full-screen-bg"></div><Home isAuthenticated={isAuthenticated} /></div>} />
        <Route path="/register" element={<div className="registration-page"><div className="full-screen-bg"></div><Registration /></div>} />
        <Route path="/login" element={<div className="login-page"><div className="full-screen-bg"></div><Login onLogin={handleLogin} /></div>} />
        <Route path="/search" element={isAuthenticated ? <div className="bus-search-page"><div className="full-screen-bg"></div><BusSearch /></div> : <Navigate to="/login" />} />
        <Route path="/my-reservations" element={isAuthenticated ? <div className="my-reservations-page"><div className="full-screen-bg"></div><MyReservations /></div> : <Navigate to="/login" />} />
        <Route path="/buslist" element={isAuthenticated ? <div className="bus-list-page"><div className="full-screen-bg"></div><BusList /></div> : <Navigate to="/login" />} />
        <Route path="/select-seat/:busId" element={isAuthenticated ? <div className="seat-selection-page"><div className="full-screen-bg"></div><SeatSelection /></div> : <Navigate to="/login" />} />
        <Route path="/payment" element={isAuthenticated ? <div className="payment-page"><div className="full-screen-bg"></div><Payment /></div> : <Navigate to="/login" />} />
        <Route path="/confirmation" element={isAuthenticated ? <div className="confirmation-page"><div className="full-screen-bg"></div><Confirmation /></div> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAdmin ? <div className="admin-dashboard-page"><div className="full-screen-bg"></div><AdminDashboard onLogout={handleLogout} /></div> : <Navigate to="/admin-login" />} />
        <Route path="/admin/add-bus" element={isAdmin ? <div className="add-bus-page"><div className="full-screen-bg"></div><AddBus /></div> : <Navigate to="/admin-login" />} />
        <Route path="/admin/bus-list" element={isAdmin ? <div className="bus-list-page-admin"><div className="full-screen-bg"></div><BusListPage /></div> : <Navigate to="/admin-login" />} />
        <Route path="/admin/passenger-details" element={isAdmin ? <div className="passenger-details-page"><div className="full-screen-bg"></div><PassengerDetails /></div> : <Navigate to="/admin-login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
