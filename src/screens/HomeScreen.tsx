import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { fetchEvents } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Event } from '../types';

// Screen width to calculate card size
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 30) / 2; // 2 cards per row with padding

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#000" />;
  }

  return (
    <FlatList
      key={'2columns'} // ✅ Fix for FlatList layout warning
      data={events}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('EventDetail', { event: item })}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.meta}>{item.date}</Text>
          <Text style={styles.meta}>{item.location}</Text>
          <Text style={styles.price}>₹ {item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  meta: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
});
