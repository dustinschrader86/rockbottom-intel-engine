// /app/screens/ResultsScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import J3TM1BEventManager from "../services/J3TM1BE";
import J3TM1BGlitchEffect from "../components/system/J3TM1BGlitchEffect";

export default function ResultsScreen({ route }) {
  const { analysis } = route.params;

  const [glitch, setGlitch] = useState(false);

  // Listen for hidden J3TM1B triggers
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
        <Text style={styles.title}>SCAN RESULTS</Text>

        {/* SUMMARY */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Summary</Text>
          <Text style={styles.blockText}>{analysis.summary}</Text>
        </View>

        {/* RISK SCORE */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Risk Score</Text>
          <Text style={[styles.riskScore, getRiskColor(analysis.risk_score)]}>
            {analysis.risk_score}/100
          </Text>
        </View>

        {/* FLAGS */}
        {analysis.flags.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Flags</Text>
            {analysis.flags.map((flag, i) => (
              <Text key={i} style={styles.listItem}>• {flag}</Text>
            ))}
          </View>
        )}

        {/* CONTRACTS */}
        {analysis.contracts.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Detected Contracts</Text>
            {analysis.contracts.map((c, i) => (
              <Text key={i} style={styles.listItem}>{c}</Text>
            ))}
          </View>
        )}

        {/* WALLETS */}
        {analysis.wallets.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Detected Wallets</Text>
            {analysis.wallets.map((w, i) => (
              <Text key={i} style={styles.listItem}>{w}</Text>
            ))}
          </View>
        )}

        {/* TICKERS */}
        {analysis.tickers.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Token Tickers</Text>
            {analysis.tickers.map((t, i) => (
              <Text key={i} style={styles.listItem}>{t}</Text>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Hidden Easter‑Egg Glitch Layer */}
      {glitch && <J3TM1BGlitchEffect />}
    </View>
  );
}

function getRiskColor(score) {
  if (score >= 80) return { color: "#ff0033" };   // red
  if (score >= 50) return { color: "#ff8800" };   // orange
  return { color: "#00eaff" };                    // neon cyan
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    padding: 20
  },
  title: {
    color: "#00eaff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  block: {
    backgroundColor: "#0d0d0d",
    borderWidth: 1,
    borderColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
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
  listItem: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5
  },
  riskScore: {
    fontSize: 32,
    fontWeight: "bold"
  }
});
