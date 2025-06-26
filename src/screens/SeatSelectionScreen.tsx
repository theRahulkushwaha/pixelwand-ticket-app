import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

interface Seat {
  id: string;
  selected: boolean;
}

export default function SeatSelectionScreen() {
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: 40 }, (_, i) => ({ id: `S${i + 1}`, selected: false }))
  );

  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: { event: any } }, 'params'>>();
  const { event } = route.params;

  const toggleSeat = (id: string) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === id ? { ...seat, selected: !seat.selected } : seat
      )
    );
  };

  const confirmBooking = () => {
    const selectedSeats = seats.filter((s) => s.selected);
    if (selectedSeats.length === 0) {
      Alert.alert('No seats selected', 'Please select at least one seat.');
      return;
    }
    navigation.navigate('EventDetail', {
      event,
      selectedSeats: selectedSeats.map((s) => s.id),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Seats</Text>

      <View style={styles.grid}>
        {seats.map((seat) => (
          <TouchableOpacity
            key={seat.id}
            style={[styles.seat, seat.selected && styles.selectedSeat]}
            onPress={() => toggleSeat(seat.id)}
          >
            <Text style={styles.seatText}>{seat.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={confirmBooking}>
        <Text style={styles.confirmButtonText}>Confirm Selection</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  seat: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  selectedSeat: {
    backgroundColor: '#007bff',
  },
  seatText: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
