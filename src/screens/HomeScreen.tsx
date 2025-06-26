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
  TextInput,
} from 'react-native';
import { fetchEvents } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Event } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 30) / 2;

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b9ed3c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Movies..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredEvents}
        key={'2cols'}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  searchInput: {
    backgroundColor: '#222222',
    color: '#f3f3f3',
    margin: 12,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#212121',
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
    color: '#FFFFFF',
  },
  meta: {
    fontSize: 12,
    color: '#BBBBBB',
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
  },
});
