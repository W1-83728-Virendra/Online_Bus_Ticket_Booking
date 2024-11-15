import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header'; // Custom header component
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import BusSearch from './components/BusSearch';
import BusList from './components/BusList';
import SeatSelection from './components/SeatSelection';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (role) => {
    try {
      await AsyncStorage.setItem('role', role);
      setIsAuthenticated(true);
      if (role === 'admin') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error setting login state:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('token');
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      if (role) {
        setIsAuthenticated(true);
        if (role === 'admin') {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Header {...props} isAuthenticated={isAuthenticated} onLogout={handleLogout} isAdmin={isAdmin} />
        }}
      >
        <Stack.Screen name="Home">
          {(props) => <Home {...props} isAuthenticated={isAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={Registration} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        {isAuthenticated && !isAdmin ? (
          <>
            <Stack.Screen name="Search" component={BusSearch} />
            <Stack.Screen name="BusList" component={BusList} />
            <Stack.Screen name="SeatSelection" component={SeatSelection} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Confirmation" component={Confirmation} />
          </>
        ) : null}
        <Stack.Screen name="NotFound">
          {({ navigation }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Page Not Found</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={{ color: 'blue' }}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
