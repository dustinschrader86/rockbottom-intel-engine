// /app/components/AnimatedRiskMeter.js

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function AnimatedRiskMeter({ score }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score,
      duration: 600, // FAST + SMOOTH
      useNativeDriver: false
    }).start();
  }, [score]);

  const rotate = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "180deg"]
  });

  const color = animatedValue.interpolate({
    inputRange: [0, 50, 80, 100],
    outputRange: ["#00eaff", "#ff8800", "#ff0033", "#ff0033"]
  });

  return (
    <View style={styles.container}>
      <View style={styles.gaugeContainer}>
        <Animated.View
          style={[
            styles.gaugeFill,
            {
              transform: [{ rotate }],
              borderColor: color
            }
          ]}
        />
        <View style={styles.gaugeCover}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>
      <Text style={styles.label}>RISK LEVEL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20
  },
  gaugeContainer: {
    width: 180,
    height: 90,
    overflow: "hidden"
  },
  gaugeFill: {
    width: 180,
    height: 180,
    borderWidth: 12,
    borderRadius: 90,
    borderColor: "#00eaff",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0
  },
  gaugeCover: {
    width: 140,
    height: 70,
    backgroundColor: "#050505",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    position: "absolute",
    top: 20,
    left: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  scoreText: {
    color: "#00eaff",
    fontSize: 32,
    fontWeight: "bold"
  },
  label: {
    color: "#888",
    marginTop: 10,
    fontSize: 16
  }
});
