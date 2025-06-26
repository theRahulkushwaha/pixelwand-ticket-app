import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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

  const goToSeatSelection = () => {
    navigation.navigate('SeatSelection', { event });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>
          {event.date} | {event.location}
        </Text>
        <Text style={styles.price}>₹ {event.price}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.counter}>
          <TouchableOpacity onPress={decrease} style={styles.counterButton}>
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{count}</Text>
          <TouchableOpacity onPress={increase} style={styles.counterButton}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={goToSeatSelection} style={styles.seatButton}>
          <Text style={styles.seatButtonText}>Select Seats</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBook} style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book {count} Ticket(s)</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
  image: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color:'#FFFFFF',
  },
  meta: {
    fontSize: 14,
    color:'#FFFFFF',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color:'#FFFFFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color:'#FFFFFF',
    marginBottom: 20,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  counterButton: {
    backgroundColor: '#ddd',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 24,
    fontWeight: '600',
    
  },
  count: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color:'#FFFFFF',
  },
  bookButton: {
    backgroundColor: '#c0f740',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  bookButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seatButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  seatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
