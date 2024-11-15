import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import busSeat from "../assets/bus-seat.jpg";
import api from '../services/api';

const SeatSelection = () => {
  const { busId } = useParams();
  const [busDetails, setBusDetails] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        // Fetch bus details
        const response = await api.get(`/api/bus/${busId}`);
        const { data } = response;
        setBusDetails(data);

        // Fetch booked seats
        const bookedResponse = await api.get(`/api/reservation/booked-seats/${busId}`);
        setBookedSeats(bookedResponse.data);

        // Initialize passenger details
        setPassengerDetails(Array(data.total_seates).fill({ name: '', age: '', gender: '', boardingStop: '', alightingStop: '' }));
        
      } catch (error) {
        setError('Error fetching bus details');
        console.error('Error fetching bus details:', error);
      }
    };

    fetchBusDetails();
  }, [busId]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats(prevSeats =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter(seat => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  const renderSeats = () => {
    if (!busDetails) return null;
    const totalSeats = busDetails.total_seates;
    return Array.from({ length: totalSeats }, (_, i) => i + 1).map(seatNumber => {
      const isBooked = bookedSeats.includes(seatNumber);
      const isSelected = selectedSeats.includes(seatNumber);
      const seatStyle = {
        margin: '5px',
        width: '30px',
        height: '30px',
        backgroundColor: isBooked ? '#ff6666' : isSelected ? '#bbff99' : '#80d4ff',
        backgroundImage: `url(${busSeat})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        cursor: isBooked ? 'not-allowed' : 'pointer',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '30px',
        borderRadius: '5px',
      };

      return (
        <div
          key={seatNumber}
          className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : ''}`}
          onClick={() => handleSeatClick(seatNumber)}
          style={seatStyle}
        >
          {seatNumber}
        </div>
      );
    });
  };

  const handlePassengerDetailsChange = (index, e) => {
    const { name, value } = e.target;
    setPassengerDetails(prevDetails =>
      prevDetails.map((detail, i) => i === index ? { ...detail, [name]: value } : detail)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      setError('No seats selected');
      return;
    }

    if (passengerDetails.length !== selectedSeats.length || 
        passengerDetails.some(detail => !detail.name || !detail.age || !detail.gender || !detail.boardingStop || !detail.alightingStop)) {
      setError('Incomplete or mismatched passenger details');
      return;
    }

    try {
      const response = await api.post('/api/reservation/book', {
        busId,
        seats: selectedSeats,
        passengerDetails
      });

      if (response.data.reservationId) {
        navigate('/payment', {
          state: {
            reservationId: response.data.reservationId,
            busDetails,
            seats: selectedSeats,
            passengerDetails
          }
        });
      } else {
        setError('Failed to create reservation');
      }
    } catch (error) {
      setError('Error processing reservation');
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    setPassengerDetails(Array(selectedSeats.length).fill({ name: '', age: '', gender: '', boardingStop: '', alightingStop: '' }));
  }, [selectedSeats]);

  const totalFare = busDetails ? selectedSeats.length * busDetails.fare : 0;

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Book Your Seat</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '400px', margin: '0 auto', backgroundColor:"white"}}>
        {renderSeats()}
      </div>
      <div className="selected-seats" style={{ margin: '20px 0' }}>
        <h3>Selected Seats:</h3>
        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
      </div>
      <div className="bill"  style={{ margin: '20px 0'  }}>
        <h3>Bill</h3>
        <p>Number of Seats: {selectedSeats.length}</p>
        <p>Seat Price: ₹{busDetails ? busDetails.fare : 0}</p>
        <p>Total Fare: ₹{totalFare}</p>
      </div>
      <div style={{width:'700px', marginLeft:'30%'}}>
        <form onSubmit={handleSubmit} class='form-control ' style={{ backgroundColor: '#f0f5f5'}}>
        {selectedSeats.map((seat, index) => (
          <div key={seat} style={{ margin: '10px 0' }}>
            <h4>Seat {seat}</h4>
            <input
              class='form-control'
              type="text"
              name="name"
              placeholder="Name"
              value={passengerDetails[index]?.name || ''}
              onChange={(e) => handlePassengerDetailsChange(index, e)}
              required
              style={{ display: 'block', margin: '5px auto', width: '80%' }}
            />
            <input class='form-control'
              type="number"
              name="age"
              placeholder="Age"
              value={passengerDetails[index]?.age || ''}
              onChange={(e) => handlePassengerDetailsChange(index, e)}
              required
              style={{ display: 'block', margin: '5px auto', width: '80%' }}
            />
            <select class='form-control'
              name="gender"
              value={passengerDetails[index]?.gender || ''}
              onChange={(e) => handlePassengerDetailsChange(index, e)}
              required
              style={{ display: 'block', margin: '5px auto', width: '80%' }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input class='form-control'
              type="text"
              name="boardingStop"
              placeholder="Boarding Stop"
              value={passengerDetails[index]?.boardingStop || ''}
              onChange={(e) => handlePassengerDetailsChange(index, e)}
              required
              style={{ display: 'block', margin: '5px auto', width: '80%' }}
            />
            <input class='form-control'
              type="text"
              name="alightingStop"
              placeholder="Alighting Stop"
              value={passengerDetails[index]?.alightingStop || ''}
              onChange={(e) => handlePassengerDetailsChange(index, e)}
              required
              style={{ display: 'block', margin: '5px auto', width: '80%' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginTop: '20px' }}>Confirm Booking</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form></div>
      
    </div>
  );
};

export default SeatSelection;
