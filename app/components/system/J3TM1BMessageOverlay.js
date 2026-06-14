// /app/components/system/J3TM1BMessageOverlay.js

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

let overlayRef = null;

const J3TM1BMessageOverlay = React.forwardRef((props, ref) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const message = useRef("");

  React.useImperativeHandle(ref, () => ({
    show(text) {
      message.current = text;
      fadeIn();
    }
  }));

  const fadeIn = () => {
    opacity.setValue(0);

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true
      }),
      Animated.delay(900),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.box}>
        <Text style={styles.text}>{message.current}</Text>
      </View>
    </Animated.View>
  );
});

export const show = (text) => {
  if (overlayRef) {
    overlayRef.show(text);
  }
};

export const registerOverlay = (ref) => {
  overlayRef = ref;
};

export default function OverlayWrapper() {
  return <J3TM1BMessageOverlay ref={(r) => registerOverlay(r)} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999
  },
  box: {
    backgroundColor: "rgba(0,0,0,0.85)",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3affff",
  },
  text: {
    color: "#3affff",
    fontFamily: "monospace",
    fontSize: 13,
  }
});

