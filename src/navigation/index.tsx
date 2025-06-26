import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator'
import BookingsScreen from '../screens/BookingsScreen'

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home', headerShown: true }} />
      <Tab.Screen name="Bookings" component={BookingsScreen} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}
