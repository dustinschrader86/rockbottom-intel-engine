// /app/screens/DashboardScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BE";
import J3TM1BGlitchEffect from "../components/system/J3TM1BGlitchEffect";

export default function DashboardScreen({ navigation }) {
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
        <Text style={styles.title}>DASHBOARD</Text>
        <Text style={styles.subtitle}>Operational Intelligence Overview</Text>

        {/* NAV BUTTONS */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Scan")}
          >
            <Text style={styles.navButtonText}>NEW SCAN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={styles.navButtonText}>SETTINGS</Text>
          </TouchableOpacity>
        </View>

        {/* RECENT SCANS */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Recent Scans</Text>
          <Text style={styles.blockText}>
            No saved scans yet. Your completed results will appear here.
          </Text>
        </View>

        {/* SYSTEM INTEL */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>System Intelligence</Text>
          <Text style={styles.line}>• OCR Engine: <Text style={styles.cyan}>Active</Text></Text>
          <Text style={styles.line}>• AI Analysis: <Text style={styles.cyan}>Operational</Text></Text>
          <Text style={styles.line}>• Risk Model: <Text style={styles.cyan}>Calibrated</Text></Text>
          <Text style={styles.line}>• J3TM1B Node: <Text style={styles.purple}>Dormant</Text></Text>
        </View>

        {/* RISK OVERVIEW */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Risk Overview</Text>
          <Text style={styles.line}>• High‑Risk Scans: <Text style={styles.red}>0</Text></Text>
          <Text style={styles.line}>• Medium‑Risk Scans: <Text style={styles.orange}>0</Text></Text>
          <Text style={styles.line}>• Low‑Risk Scans: <Text style={styles.cyan}>0</Text></Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25
  },
  navButton: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderColor: "#00eaff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5
  },
  navButtonText: {
    color: "#00eaff",
    fontSize: 18,
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
  line: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5
  },
  cyan: { color: "#00eaff" },
  purple: { color: "#b400ff" },
  red: { color: "#ff0033" },
  orange: { color: "#ff8800" }
});
