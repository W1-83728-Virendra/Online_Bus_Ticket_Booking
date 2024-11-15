import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../services/api';

const SeatSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { busId } = route.params;
  const [busDetails, setBusDetails] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await api.get(`/api/bus/${busId}`);
        const { data } = response;
        setBusDetails(data);

        const bookedResponse = await api.get(`/api/reservation/booked-seats/${busId}`);
        setBookedSeats(bookedResponse.data);

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

  const handlePassengerDetailsChange = (index, field, value) => {
    setPassengerDetails(prevDetails =>
      prevDetails.map((detail, i) => i === index ? { ...detail, [field]: value } : detail)
    );
  };

  const handleSubmit = async () => {
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
        navigation.navigate('Payment', {
          reservationId: response.data.reservationId,
          busDetails,
          seats: selectedSeats,
          passengerDetails
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

  const renderSeats = () => {
    if (!busDetails) return null;
    const totalSeats = busDetails.total_seates;
    return Array.from({ length: totalSeats }, (_, i) => i + 1).map(seatNumber => {
      const isBooked = bookedSeats.includes(seatNumber);
      const isSelected = selectedSeats.includes(seatNumber);
      const seatStyle = {
        margin: 5,
        width: 30,
        height: 30,
        backgroundColor: isBooked ? '#8e8e8e' : isSelected ? 'green' : 'black',
        display: 'inline-block',
        cursor: isBooked ? 'not-allowed' : 'pointer',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 30,
        borderRadius: 5,
      };

      return (
        <TouchableOpacity
          key={seatNumber}
          onPress={() => handleSeatClick(seatNumber)}
          style={seatStyle}
          disabled={isBooked}
        >
          <Text style={{ color: '#fff' }}>{seatNumber}</Text>
        </TouchableOpacity>
      );
    });
  };

  const totalFare = busDetails ? selectedSeats.length * busDetails.fare : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Book Your Seat</Text>
      <View style={styles.seatContainer}>
        {renderSeats()}
      </View>
      <View style={styles.selectedSeats}>
        <Text style={styles.subHeading}>Selected Seats:</Text>
        <Text>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</Text>
      </View>
      <View style={styles.bill}>
        <Text style={styles.subHeading}>Bill</Text>
        <Text>Number of Seats: {selectedSeats.length}</Text>
        <Text>Seat Price: ₹{busDetails ? busDetails.fare : 0}</Text>
        <Text>Total Fare: ₹{totalFare}</Text>
      </View>
      {selectedSeats.map((seat, index) => (
        <View key={seat} style={styles.passengerDetails}>
          <Text style={styles.subHeading}>Seat {seat}</Text>
          <TextInput
            placeholder="Name"
            value={passengerDetails[index]?.name || ''}
            onChangeText={(value) => handlePassengerDetailsChange(index, 'name', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Age"
            value={passengerDetails[index]?.age || ''}
            onChangeText={(value) => handlePassengerDetailsChange(index, 'age', value)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Gender"
            value={passengerDetails[index]?.gender || ''}
            onChangeText={(value) => handlePassengerDetailsChange(index, 'gender', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Boarding Stop"
            value={passengerDetails[index]?.boardingStop || ''}
            onChangeText={(value) => handlePassengerDetailsChange(index, 'boardingStop', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Alighting Stop"
            value={passengerDetails[index]?.alightingStop || ''}
            onChangeText={(value) => handlePassengerDetailsChange(index, 'alightingStop', value)}
            style={styles.input}
          />
        </View>
      ))}
      <Button title="Confirm Booking" onPress={handleSubmit} />
      {error && <Text style={styles.error}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selectedSeats: {
    marginVertical: 20,
    alignItems: 'center',
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
  bill: {
    marginVertical: 20,
    alignItems: 'center',
  },
  passengerDetails: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SeatSelection;
