import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useBooking } from '../context/BookingContext';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  description: string;
};

type RouteParams = {
  params: { event: Event };
};

export default function EventDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { event } = route.params;

  const [count, setCount] = useState(1);
  const { dispatch } = useBooking();
  const navigation = useNavigation<any>();

  const increase = () => {
    if (count < 10) setCount(count + 1);
  };

  const decrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleBook = () => {
    dispatch({
      type: 'ADD_BOOKING',
      payload: { event, count },
    });
    navigation.navigate('Bookings');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date} - {event.location}</Text>
      <Text>Price: ₹ {event.price}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.counter}>
        <TouchableOpacity onPress={decrease} style={styles.button}>
          <Text style={styles.btnText}>–</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{count}</Text>
        <TouchableOpacity onPress={increase} style={styles.button}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <Button title={`Book ${count} Ticket(s)`} onPress={handleBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  description: { marginVertical: 10 },
  counter: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  btnText: { fontSize: 20 },
  count: { fontSize: 18, fontWeight: 'bold' },
});
