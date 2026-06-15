// /app/screens/AnalysisScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BE";
import J3TM1BGlitchEffect from "../components/system/J3TM1BGlitchEffect";

export default function AnalysisScreen({ route, navigation }) {
  const { imageUri } = route.params;

  const [glitch, setGlitch] = useState(false);
  const progress = React.useRef(new Animated.Value(0)).current;


  // Trigger hidden J3TM1B flicker on load
  useEffect(() => {
    J3TM1BEventManager.trigger("flicker");
  }, []);

  // Listen for J3TM1B glitch events
  useEffect(() => {
    const sub = J3TM1BEventManager.subscribe("flicker", () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 600);
    });

    return () => sub.remove();
  }, []);

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false
    }).start();
  }, []);

  // Run backend analysis
  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          type: "image/jpeg",
          name: "scan.jpg"
        });

        const response = await fetch("http://100.64.250.250:8000/api/analyze", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        navigation.replace("Results", { analysis: data });
      } catch (err) {
        console.error("Analysis error:", err);
      }
    };

    setTimeout(runAnalysis, 800); // slight delay for cinematic effect
  }, []);

  const widthInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ANALYZING</Text>
      <Text style={styles.subtitle}>Decrypting Screenshot Intelligence</Text>

      {/* Progress Bar */}
      <View style={styles.progressBackground}>
        <Animated.View
          style={[styles.progressFill, { width: widthInterpolate }]}
        />
      </View>

      <ActivityIndicator size="large" color="#00eaff" style={{ marginTop: 30 }} />

      <Text style={styles.statusText}>Running OCR, AI models, and risk engine…</Text>

      {/* Hidden glitch overlay */}
      {glitch && <J3TM1BGlitchEffect />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#00eaff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    color: "#777",
    fontSize: 14,
    marginBottom: 30,
  },
  progressBackground: {
    width: "80%",
    height: 10,
    backgroundColor: "#111",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00eaff",
  },
  statusText: {
    color: "#888",
    fontSize: 13,
    marginTop: 20,
    textAlign: "center",
  },
});

