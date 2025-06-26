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
    backgroundColor: '#000000',
    height:'100%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f3f3f3',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seat: {
    width: 60,
    height: 60,
    backgroundColor: '#222222',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  selectedSeat: {
    backgroundColor: '#c0f740',
  },
  seatText: {
    color: '#000',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#c0f740',
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
