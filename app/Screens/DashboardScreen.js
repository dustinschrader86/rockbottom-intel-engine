// /app/screens/DashboardScreen.js

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BEventManager";

export default function DashboardScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    J3TM1BEventManager.trigger("dashboard");

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
        <Text style={styles.title}>DASHBOARD</Text>
        <Text style={styles.subtitle}>System overview</Text>

        <ScrollView style={styles.scroll}>
          {/* Recent Scans */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>

            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Unknown Token</Text>
              <Text style={styles.cardSub}>Risk: 72 • 2h ago</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>SOL‑X</Text>
              <Text style={styles.cardSub}>Risk: 41 • 6h ago</Text>
            </TouchableOpacity>
          </View>

          {/* Watchlist */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Watchlist</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Wallet 0xA9…F3</Text>
              <Text style={styles.cardSub}>High activity detected</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Token: VOID</Text>
              <Text style={styles.cardSub}>Volatility spike</Text>
            </View>
          </View>

          {/* System Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>System Status</Text>

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Engine:</Text>
              <Text style={styles.statusValue}>Online</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Signals:</Text>
              <Text style={styles.statusValue}>Stable</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>J3TM1B:</Text>
              <Text style={styles.statusValue}>Active</Text>
            </View>
          </View>

          {/* Alerts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alerts</Text>

            <View style={styles.alertCard}>
              <Text style={styles.alertText}>
                Liquidity anomaly detected in monitored token.
              </Text>
            </View>

            <View style={styles.alertCard}>
              <Text style={styles.alertText}>
                Wallet 0xA9…F3 executed 12 transactions in 3 minutes.
              </Text>
            </View>
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
  card: {
    backgroundColor: "rgba(0,255,255,0.08)",
    borderWidth: 1,
    borderColor: "#00f2ff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10
  },
  cardTitle: {
    color: "#00f2ff",
    fontSize: 16
  },
  cardSub: {
    color: "#00f2ff",
    opacity: 0.6,
    fontSize: 12
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  statusLabel: {
    color: "#00f2ff",
    opacity: 0.7
  },
  statusValue: {
    color: "#00f2ff"
  },
  alertCard: {
    backgroundColor: "rgba(255,0,0,0.1)",
    borderWidth: 1,
    borderColor: "#ff0033",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10
  },
  alertText: {
    color: "#ff0033",
    fontSize: 13
  }
});

