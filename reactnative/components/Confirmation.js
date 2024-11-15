import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Confirmation = () => {
  const route = useRoute();
  const { reservationDetails } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Payment Successful!</Text>
      <Text style={styles.subHeading}>Thank you for booking with us.</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reservation Details:</Text>
        {reservationDetails ? (
          <View>
            <Text><Text style={styles.label}>Bus Name:</Text> {reservationDetails.busDetails.bus_name}</Text>
            <Text><Text style={styles.label}>Bus Type:</Text> {reservationDetails.busDetails.bus_type}</Text>
            <Text><Text style={styles.label}>Arrival Time:</Text> {new Date(reservationDetails.busDetails.arrival_time).toLocaleString()}</Text>
            <Text><Text style={styles.label}>Fare:</Text> ${reservationDetails.busDetails.fare}</Text>
            <Text><Text style={styles.label}>Departure Time:</Text> {new Date(reservationDetails.busDetails.departure_time).toLocaleString()}</Text>
          </View>
        ) : (
          <Text>No reservation details available.</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seats Reserved:</Text>
        {reservationDetails ? (
          reservationDetails.seats.length > 0 ? (
            reservationDetails.seats.map((seat, index) => (
              <Text key={index} style={styles.listItem}>Seat {seat}</Text>
            ))
          ) : (
            <Text>No seats reserved.</Text>
          )
        ) : (
          <Text>No seats reserved.</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passenger Details:</Text>
        {reservationDetails ? (
          reservationDetails.passengerDetails.length > 0 ? (
            reservationDetails.passengerDetails.map((detail, index) => (
              <View key={index} style={styles.detail}>
                <Text style={styles.subHeading}>Passenger {index + 1}</Text>
                <Text><Text style={styles.label}>Name:</Text> {detail.name}</Text>
                <Text><Text style={styles.label}>Age:</Text> {detail.age}</Text>
                <Text><Text style={styles.label}>Gender:</Text> {detail.gender}</Text>
                <Text><Text style={styles.label}>Boarding Stop:</Text> {detail.boardingStop}</Text>
                <Text><Text style={styles.label}>Alighting Stop:</Text> {detail.alightingStop}</Text>
              </View>
            ))
          ) : (
            <Text>No passenger details available.</Text>
          )
        ) : (
          <Text>No passenger details available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 5,
  },
  detail: {
    marginBottom: 10,
  },
});

export default Confirmation;
