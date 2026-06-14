// /app/screens/HomeScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BE";
import J3TM1BGlitchEffect from "../components/system/J3TM1BGlitchEffect";

export default function HomeScreen({ navigation }) {
  const [glitch, setGlitch] = useState(false);

  // Hidden J3TM1B Easter‑egg listener
  useEffect(() => {
    const sub = J3TM1BEventManager.subscribe("flicker", () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 600);
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* HEADER */}
        <Text style={styles.title}>INTELLIGENCE ENGINE</Text>
        <Text style={styles.subtitle}>Steel‑Noir Analysis Console</Text>

        {/* START SCAN BUTTON */}
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate("Scan")}
        >
          <Text style={styles.scanButtonText}>START SCAN</Text>
        </TouchableOpacity>

        {/* RECENT SCANS (placeholder for now) */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Recent Scans</Text>
          <Text style={styles.blockText}>
            No scans saved yet. Your results will appear here.
          </Text>
        </View>

        {/* SYSTEM STATUS */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>System Status</Text>
          <Text style={styles.statusLine}>• Engine: <Text style={styles.cyan}>Online</Text></Text>
          <Text style={styles.statusLine}>• OCR Module: <Text style={styles.cyan}>Active</Text></Text>
          <Text style={styles.statusLine}>• J3TM1B Node: <Text style={styles.purple}>Dormant</Text></Text>
        </View>

      </ScrollView>

      {/* Hidden glitch overlay */}
      {glitch && <J3TM1BGlitchEffect />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    padding: 20
  },
  title: {
    color: "#00eaff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10
  },
  subtitle: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30
  },
  scanButton: {
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderColor: "#00eaff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 30
  },
  scanButtonText: {
    color: "#00eaff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  block: {
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25
  },
  blockTitle: {
    color: "#b400ff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  blockText: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 22
  },
  statusLine: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5
  },
  cyan: {
    color: "#00eaff"
  },
  purple: {
    color: "#b400ff"
  }
});
