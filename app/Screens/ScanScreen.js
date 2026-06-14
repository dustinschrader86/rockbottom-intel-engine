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
import J3TM1BEventManager from "../services/J3TM1BE";
import J3TM1BGlitchEffect from "../components/syste";

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

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "screenshot.jpg",
      type: "image/jpeg"
    });

    try {
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setLoading(false);

      navigation.navigate("Results", { analysis: data });
    } catch (error) {
      console.log("Scan error:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Screenshot</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.preview} />
      )}

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        image && (
          <TouchableOpacity style={styles.button} onPress={runScan}>
            <Text style={styles.buttonText}>Analyze Screenshot</Text>
          </TouchableOpacity>
        )
      )}

      {glitch && <J3TM1BGlitchEffect />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  button: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 18 },
  preview: { width: "100%", height: 300, marginTop: 20 }
});
