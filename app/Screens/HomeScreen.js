// /app/screens/HomeScreen.js

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BEventManager";

export default function HomeScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    J3TM1BEventManager.trigger("home");

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.inner,
          {
            opacity: fade,
            transform: [{ translateY: slide }]
          }
        ]}
      >
        <Text style={styles.title}>INTEL SCANNER</Text>
        <Text style={styles.subtitle}>Analyze screenshots instantly</Text>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate("Scan")}
        >
          <Text style={styles.scanText}>START SCAN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.secondaryText}>VIEW DASHBOARD</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  inner: {
    width: "100%",
    alignItems: "center"
  },
  title: {
    color: "#00f2ff",
    fontSize: 32,
    fontFamily: "monospace",
    textAlign: "center",
    marginBottom: 6
  },
  subtitle: {
    color: "#00f2ff",
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 40
  },
  scanButton: {
    backgroundColor: "#00f2ff",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20
  },
  scanText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#00f2ff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8
  },
  secondaryText: {
    color: "#00f2ff",
    fontSize: 16
  }
});

