// /app/screens/SettingsScreen.js

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Animated,
  ScrollView
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BEventManager";

export default function SettingsScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  const [darkMode, setDarkMode] = React.useState(true);
  const [personaEnabled, setPersonaEnabled] = React.useState(true);

  useEffect(() => {
    J3TM1BEventManager.trigger("settings");

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
        <Text style={styles.title}>SETTINGS</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>

        <ScrollView style={styles.scroll}>
          {/* Theme Toggle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                thumbColor="#00f2ff"
              />
            </View>
          </View>

          {/* Persona Toggle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Persona System</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Enable J3TM1B</Text>
              <Switch
                value={personaEnabled}
                onValueChange={setPersonaEnabled}
                thumbColor="#00f2ff"
              />
            </View>
          </View>

          {/* Data Wipe */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Wipe Local Data</Text>
            </TouchableOpacity>
          </View>

          {/* Version Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>

            <Text style={styles.info}>Version: 1.0.0</Text>
            <Text style={styles.info}>Build: 2026‑06‑13</Text>
            <Text style={styles.info}>Engine: Rockbottom Intel Engine</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 60,
    paddingHorizontal: 20
  },
  inner: {
    flex: 1
  },
  title: {
    color: "#00f2ff",
    fontSize: 28,
    fontFamily: "monospace",
    textAlign: "center"
  },
  subtitle: {
    color: "#00f2ff",
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 20
  },
  scroll: {
    flex: 1
  },
  section: {
    marginBottom: 30
  },
  sectionTitle: {
    color: "#00f2ff",
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "monospace"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  label: {
    color: "#00f2ff",
    fontSize: 16
  },
  button: {
    borderWidth: 1,
    borderColor: "#ff0033",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: "#ff0033",
    fontSize: 16,
    textAlign: "center"
  },
  info: {
    color: "#00f2ff",
    opacity: 0.7,
    marginBottom: 4
  }
});
