// /app/navigation/AppNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import ScanScreen from "../screens/ScanScreen";
import AnalysisScreen from "../screens/AnalysisScreen";
import ResultsScreen from "../screens/ResultsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import J3TM1BBlackNodeScreen from "../components/system/J3TM1BBlackNodeScreen";

import { registerNavigator } from "./BlackNodeRoute";

const Stack = createStackNavigator();

export default function AppNavigator() {
  // Optional: if your BlackNode system needs access to the navigator
  registerNavigator(Stack);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="BlackNode" component={J3TM1BBlackNodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
