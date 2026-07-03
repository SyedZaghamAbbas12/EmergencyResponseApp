import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/HomeScreen";
import HistoryScreen from "../screens/History/HistoryScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SOSScreen from "../screens/SOS/SOSScreen";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          if (route.name === "History") iconName = "time";
          if (route.name === "Profile") iconName = "person";
          if (route.name === "SOS") iconName = "alert";

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="History" component={HistoryScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />

      {/* FIXED HERE */}
      <Tab.Screen name="SOS" component={SOSScreen} />
    </Tab.Navigator>
  );
}