import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
  description: string;
};

type Booking = {
  event: Event;
  count: number;
};

type State = {
  bookings: Booking[];
};

type Action =
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'REMOVE_BOOKING'; payload: string }
  | { type: 'LOAD_BOOKINGS'; payload: Booking[] };

const initialState: State = {
  bookings: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'REMOVE_BOOKING':
      return { ...state, bookings: state.bookings.filter(b => b.event.id !== action.payload) };
    case 'LOAD_BOOKINGS':
      return { ...state, bookings: action.payload };
    default:
      return state;
  }
}

const BookingContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Load from AsyncStorage on app start
    const load = async () => {
      const saved = await AsyncStorage.getItem('bookings');
      if (saved) {
        dispatch({ type: 'LOAD_BOOKINGS', payload: JSON.parse(saved) });
      }
    };
    load();
  }, []);

  useEffect(() => {
    // Save to AsyncStorage whenever bookings change
    AsyncStorage.setItem('bookings', JSON.stringify(state.bookings));
  }, [state.bookings]);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
