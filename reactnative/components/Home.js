import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({ isAuthenticated }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Bus Reservation System</Text>
      {isAuthenticated ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.buttonText}>Search Buses</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.message}>Please log in to search for buses.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 36,
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 4,
    elevation: 2,  // Adds shadow on Android
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  message: {
    fontSize: 18,
    color: '#6c757d',
  },
});

export default Home;
