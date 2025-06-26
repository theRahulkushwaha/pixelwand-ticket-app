import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { fetchEvents } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Event } from '../types'; 

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

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('EventDetail', { event: item })}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.date} - {item.location}</Text>
          <Text>₹ {item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: { width: '100%', height: 150, borderRadius: 6 },
  title: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
});
