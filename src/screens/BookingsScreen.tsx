import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useBooking } from '../context/BookingContext';

export default function BookingsScreen() {
  const { state, dispatch } = useBooking();

  const handleCancel = (id: string) => {
    dispatch({ type: 'REMOVE_BOOKING', payload: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      {state.bookings.length === 0 ? (
        <Text style={styles.emptyText}>You haven't booked any tickets yet!</Text>
      ) : (
        <FlatList
          data={state.bookings}
          keyExtractor={(item) => item.event.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.event.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.event.title}</Text>
                <Text style={styles.meta}>
                  {item.event.date} | {item.event.location}
                </Text>
                <Text style={styles.detail}>🎟 Tickets: {item.count}</Text>
                <Text style={styles.detail}>💰 Total: ₹ {item.count * item.event.price}</Text>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancel(item.event.id)}
                >
                  <Text style={styles.cancelText}>Cancel Booking</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
  },
  list: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: '#777',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222222', 
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 120,
    height: 140,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f3f3f3', 
  },
  meta: {
    fontSize: 13,
    color: '#bbbbbb',
    marginVertical: 4,
  },
  detail: {
    fontSize: 14,
    color: '#dddddd',
    marginTop: 4,
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
