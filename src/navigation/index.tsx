import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import BookingsScreen from '../screens/BookingsScreen';

import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#1d1d1d',
        },
        headerTintColor: '#f3f3f3',
        tabBarStyle: {
          backgroundColor: '#1d1d1d',
          borderTopColor: '#1d1d1d',
        },
        tabBarActiveTintColor: '#b9ed3c',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'HomeTab') {
            return <Octicons name="home" size={size} color={color} />;
          } else if (route.name === 'Bookings') {
            return <Entypo name="ticket" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{ title: 'Bookings', headerShown: true }}
      />
    </Tab.Navigator>
  );
}
