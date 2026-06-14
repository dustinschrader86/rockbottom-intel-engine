// /app/screens/ResultsScreen.js

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image
} from "react-native";

import J3TM1BEventManager from "../services/J3TM1BEventManager";

export default function ResultsScreen({ route }) {
  const { screenshot } = route.params;

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    J3TM1BEventManager.trigger("results");

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
        <Text style={styles.title}>SCAN RESULTS</Text>
        <Text style={styles.subtitle}>Intelligence summary</Text>

        <Image source={{ uri: screenshot }} style={styles.preview} />

        <ScrollView style={styles.resultsBox}>
          <Text style={styles.sectionTitle}>Token Overview</Text>
          <Text style={styles.item}>Name: <Text style={styles.value}>Unknown Token</Text></Text>
          <Text style={styles.item}>Symbol: <Text style={styles.value}>N/A</Text></Text>

          <Text style={styles.sectionTitle}>Risk Score</Text>
          <Text style={styles.score}>72 / 100</Text>

          <Text style={styles.sectionTitle}>Contract Flags</Text>
          <Text style={styles.item}>• Owner privileges detected</Text>
          <Text style={styles.item}>• Liquidity not locked</Text>
          <Text style={styles.item}>• High volatility</Text>

          <Text style={styles.sectionTitle}>Holder Analysis</Text>
          <Text style={styles.item}>• Top wallet holds 41%</Text>
          <Text style={styles.item}>• Distribution uneven</Text>

          <Text style={styles.sectionTitle}>Liquidity</Text>
          <Text style={styles.item}>• Liquidity pool unstable</Text>
          <Text style={styles.item}>• Sudden inflow detected</Text>

          <Text style={styles.sectionTitle}>J3TM1B Commentary</Text>
          <Text style={styles.comment}>
            “Signal integrity partial.  
            Recommend caution.  
            Patterns resemble prior anomalies.”
          </Text>
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
  title

