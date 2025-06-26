import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useBooking } from '../context/BookingContext';

export default function BookingsScreen() {
  const { state, dispatch } = useBooking();

  const handleCancel = (id: string) => {
    dispatch({ type: 'REMOVE_BOOKING', payload: id });
  };

  return (
    <View style={styles.container}>
      {state.bookings.length === 0 ? (
        <Text style={styles.emptyText}>No bookings yet</Text>
      ) : (
        <FlatList
          data={state.bookings}
          keyExtractor={(item) => item.event.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.event.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.event.title}</Text>
                <Text>{item.event.date}</Text>
                <Text>Tickets: {item.count}</Text>
                <Text>Total: ₹ {item.event.price * item.count}</Text>
                <Button title="Cancel" onPress={() => handleCancel(item.event.id)} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  emptyText: { textAlign: 'center', marginTop: 100, fontSize: 18, color: 'gray' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: { width: 120, height: 120 },
  info: { flex: 1, padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
});
