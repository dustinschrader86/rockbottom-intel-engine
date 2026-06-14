// /app/screens/ScanScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import J3TM1BEventManager from "../services/J3TM1BEventManager";
import J3TM1BGlitchEffect from "../components/system/J3TM1BGlitchEffect";

export default function ScanScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const pickImage = async () => {
    J3TM1BEventManager.trigger("tap");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const runScan = async () => {
    if (!image) return;

    setLoading(true);
    setGlitch(true);

    J3TM1BEventManager.trigger("scanStart");

    setTimeout(() => {
      setGlitch(false);
      setLoading(false);
      navigation.navigate("Results", { screenshot: image });
    }, 1800);
  };

  return (
    <View style={styles.container}>
      <J3TM1BGlitchEffect active={glitch} />

      <Text style={styles.title}>SCAN A SCREENSHOT</Text>
      <Text style={styles.subtitle}>Upload a screenshot to analyze</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload screenshot</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.scanButton, !image && styles.disabled]}
        onPress={runScan}
        disabled={!image}
      >
        {loading ? (
          <ActivityIndicator color="#00f2ff" />
        ) : (
          <Text style={styles.scanText}>SCAN NOW</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 80,
    paddingHorizontal: 20
  },
  title: {
    color: "#00f2ff",
    fontSize: 26,
    fontFamily: "monospace",
    textAlign: "center"
  },
  subtitle: {
    color: "#00f2ff",
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 30
  },
  uploadBox: {
    height: 260,
    borderWidth: 1,
    borderColor: "#00f2ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    marginBottom: 30
  },
  uploadText: {
    color: "#00f2ff",
    opacity: 0.7,
    fontSize: 14
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover"
  },
  scanButton: {
    backgroundColor: "#00f2ff",
    paddingVertical: 14,
    borderRadius: 8
  },
  disabled: {
    opacity: 0.3
  },
  scanText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  }
});

