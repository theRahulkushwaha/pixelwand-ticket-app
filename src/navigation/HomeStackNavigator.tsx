import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import SeatSelectionScreen from "../screens/SeatSelectionScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#1d1d1d" },
          headerTintColor: "#f3f3f3",
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#1d1d1d" },
          headerTintColor: "#f3f3f3",
        }}
      />
      <Stack.Screen
        name="SeatSelection"
        component={SeatSelectionScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#1d1d1d" },
          headerTintColor: "#f3f3f3",
        }}
      />
    </Stack.Navigator>
  );
}
