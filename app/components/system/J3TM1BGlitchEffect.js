// /app/components/system/J3TM1BGlitchEffect.js

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function J3TM1BGlitchEffect({ active }) {
  const glitchOpacity = useRef(new Animated.Value(0)).current;
  const glitchShift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      startGlitch();
    } else {
      glitchOpacity.setValue(0);
      glitchShift.setValue(0);
    }
  }, [active]);

  const startGlitch = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glitchOpacity, {
            toValue: 0.4,
            duration: 60,
            useNativeDriver: true
          }),
          Animated.timing(glitchShift, {
            toValue: 6,
            duration: 60,
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(glitchOpacity, {
            toValue: 0,
            duration: 80,
            useNativeDriver: true
          }),
          Animated.timing(glitchShift, {
            toValue: -6,
            duration: 80,
            useNativeDriver: true
          })
        ]),
        Animated.timing(glitchShift, {
          toValue: 0,
          duration: 40,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.glitchLayer,
       

