import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setError(''); // Reset error message
    try {
      // Basic form validation
      if (!form.email || !form.password) {
        setError('Please fill out all fields.');
        return;
      }

      const response = await api.post('/api/auth/login', form);
      const { token, role } = response.data;

      // Store token and role in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role);

      onLogin(role); // Pass the role to the onLogin function

      // Navigate based on the role
      if (role === 'admin') {
        navigation.navigate('AdminDashboard');
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        setError('No response received from the server.');
      } else {
        setError('An error occurred while setting up the request.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      <Text style={styles.registerLink}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Register here
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  submitButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  registerLink: {
    marginTop: 20,
    fontSize: 16,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default Login;
