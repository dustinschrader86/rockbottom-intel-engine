// /app/components/system/J3TM1BBlackNodeScreen.js

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function J3TM1BBlackNodeScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
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
            transform: [{ scale }]
          }
        ]}
      >
        <Text style={styles.title}>BLACK NODE</Text>
        <Text style={styles.subtitle}>ACCESS GRANTED</Text>

        <View style={styles.divider} />

        <Text style={styles.body}>
          You have reached a restricted subsystem.  
          Signal integrity confirmed.  
          Await further instructions.
        </Text>

        <Text style={styles.footer}>J3TM1B // CORE CHANNEL</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  inner: {
    width: "85%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#00f2ff",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  title: {
    color: "#00f2ff",
    fontSize: 28,
    fontFamily: "monospace",
    textAlign: "center",
    marginBottom: 6
  },
  subtitle: {
    color: "#00f2ff",
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7
  },
  divider: {
    height: 1,
    backgroundColor: "#00f2ff",
    marginVertical: 20,
    opacity: 0.4
  },
  body: {
    color: "#00f2ff",
    fontSize: 14,
    fontFamily: "monospace",
    lineHeight: 20,
    marginBottom: 30
  },
  footer: {
    color: "#00f2ff",
    fontSize: 12,
    textAlign: "center",
    opacity: 0.5
  }
});

