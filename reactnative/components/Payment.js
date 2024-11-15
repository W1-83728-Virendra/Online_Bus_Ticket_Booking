import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../services/api';

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { reservationId, busDetails, seats, passengerDetails } = route.params || {};
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handlePayment = async () => {
    try {
      await api.post('/api/payment/process', {
        reservationId,
        paymentMethod
      });
      
      navigation.navigate('Confirmation', {
        reservationDetails: {
          busDetails,
          seats,
          passengerDetails
        }
      });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Payment Error', 'There was an error processing your payment.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment</Text>
      <Picker
        selectedValue={paymentMethod}
        style={styles.picker}
        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
      >
        <Picker.Item label="UPI" value="UPI" />
        <Picker.Item label="PhonePe" value="PhonePe" />
        <Picker.Item label="GPay" value="GPay" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
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
  picker: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Payment;
