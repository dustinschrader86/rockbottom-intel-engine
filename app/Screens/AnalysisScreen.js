// /app/screens/AnalysisScreen.js

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BEventManager";
import J3TM1BGlitchEffect from "../components/system/J3TM1BGlitchEffect";

export default function AnalysisScreen({ route, navigation }) {
  const { screenshot } = route.params;

  const fade = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    J3TM1BEventManager.trigger("analysisStart");

    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(progress, {
        toValue: 100,
        duration: 2200,
        useNativeDriver: false
      })
    ]).start(() => {
      setGlitch(false);

      setTimeout(() => {
        navigation.navigate("Results", { screenshot });
      }, 400);
    });
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"]
  });

  return (
    <View style={styles.container}>
      <J3TM1BGlitchEffect active={glitch} />

      <Animated.View style={[styles.inner, { opacity: fade }]}>
        <Text style={styles.title}>ANALYZING</Text>
        <Text style={styles.subtitle}>Running intelligence routines…</Text>

        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        <ActivityIndicator size="large" color="#00f2ff" style={{ marginTop: 30 }} />

        <Text style={styles.footer}>J3TM1B // SIGNAL PROCESSING</Text>
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
    width: "80%",
    alignItems: "center"
  },
  title: {
    color: "#00f2ff",
    fontSize: 28,
    fontFamily: "monospace",
    marginBottom: 6
  },
  subtitle: {
    color: "#00f2ff",
    opacity: 0.6,
    marginBottom: 30
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(0,255,255,0.15)",
    borderRadius: 6,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00f2ff"
  },
  footer: {
    color: "#00f2ff",
    opacity: 0.5,
    marginTop: 40,
    fontSize: 12
  }
});

