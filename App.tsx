import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { BookingProvider } from './src/context/BookingContext';

export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </BookingProvider>
  );
}
