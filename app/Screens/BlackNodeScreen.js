// /app/screens/BlackNodeScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BE";
import J3TM1BGlitchEffect from "../components/system/J3TM1BGlitchEffect";

export default function BlackNodeScreen({ navigation }) {
  const [glitch, setGlitch] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const opacity = new Animated.Value(0);

  const fullMessage = [
    "J3TM1B NODE ONLINE...",
    "ACCESS OVERRIDE ACCEPTED...",
    "DEEP SYSTEM LAYER UNLOCKED...",
    "YOU WERE NOT SUPPOSED TO FIND THIS...",
    "BUT NOW THAT YOU HAVE...",
    "THE SYSTEM SEES YOU."
  ];

  // Terminal text reveal
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        setDisplayText((prev) => prev + fullMessage[index] + "\n");
        index++;
      } else {
        clearInterval(interval);
      }
    }, 900);

    return () => clearInterval(interval);
  }, []);

  // Fade‑in animation
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true
    }).start();
  }, []);

  // Glitch listener
  useEffect(() => {
    const sub = J3TM1BEventManager.subscribe("flicker", () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 600);
    });

    return () => sub.remove();
  }, []);

  // Trigger glitch on entry
  useEffect(() => {
    J3TM1BEventManager.trigger("flicker");
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity }}>
        <ScrollView>
          <Text style={styles.title}>BLACK NODE</Text>

          <View style={styles.terminalBox}>
            <Text style={styles.terminalText}>{displayText}</Text>
          </View>

          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.exitButtonText}>RETURN TO SURFACE</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Hidden glitch overlay */}
      {glitch && <J3TM1BGlitchEffect />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20
  },
  title: {
    color: "#b400ff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  terminalBox: {
    backgroundColor: "#050505",
    borderWidth: 1,
    borderColor: "#111",
    padding: 20,
    borderRadius: 10,
    minHeight: 300
  },
  terminalText: {
    color: "#00eaff",
    fontSize: 16,
    lineHeight: 26,
    fontFamily: "monospace"
  },
  exitButton: {
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderColor: "#00eaff",
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  },
  exitButtonText: {
    color: "#00eaff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
