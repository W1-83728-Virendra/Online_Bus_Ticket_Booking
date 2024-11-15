import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BusList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const buses = Array.isArray(route.params?.buses) ? route.params.buses : [];

  const handleSelectBus = (busId) => {
    navigation.navigate('SeatSelection', { busId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleSelectBus(item.bus_id)}
    >
      <Text style={styles.itemText}>
        {item.bus_name} - {item.bus_type} - ${item.fare} - {new Date(item.departure_time).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Buses</Text>
      {buses.length > 0 ? (
        <FlatList
          data={buses}
          keyExtractor={(item) => item.bus_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noBuses}>No buses available.</Text>
      )}
    </View>
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
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  listItem: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 16,
  },
  noBuses: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default BusList;
