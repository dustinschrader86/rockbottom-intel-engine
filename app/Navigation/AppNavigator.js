// /app/navigation/AppNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import ScanScreen from "../screens/ScanScreen";
import AnalysisScreen from "../screens/AnalysisScreen";
import ResultsScreen from "../screens/ResultsScreen";
import J3TM1BBlackNodeScreen from "../components/system/J3TM1BBlackNodeScreen";

import { registerNavigator } from "./BlackNodeRoute";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer ref={(nav) => registerNavigator(nav)}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animationEnabled: true
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="BlackNode" component={J3TM1BBlackNodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
