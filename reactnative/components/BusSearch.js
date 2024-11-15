import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

const BusSearch = () => {
  const [form, setForm] = useState({
    start_location: '',
    end_location: '',
    date: ''
  });
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/api/bus/search', form);
      navigation.navigate('BusList', { buses: response.data });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while searching for buses.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search for Buses</Text>
      <TextInput
        style={styles.input}
        placeholder="Start Location"
        value={form.start_location}
        onChangeText={(value) => handleChange('start_location', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Location"
        value={form.end_location}
        onChangeText={(value) => handleChange('end_location', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={form.date}
        onChangeText={(value) => handleChange('date', value)}
        keyboardType="default" // You might use a date picker instead
      />
      <Button
        title="Search Buses"
        onPress={handleSubmit}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default BusSearch;