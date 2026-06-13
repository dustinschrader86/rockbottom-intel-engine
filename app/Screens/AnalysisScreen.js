import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

export default function AnalysisScreen({ route }) {
  const { imageUri } = route.params;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    analyzeImage();
  }, []);

  const analyzeImage = async () => {
    try {
      // Convert screenshot to base64
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Send to backend
      const response = await fetch("https://54v96r4gj4wf7gj5-8000.app.github.dev/api/analyze-screenshot", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log("Analysis error:", error);
      setResult({ error: "Failed to analyze screenshot" });
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Analyzing screenshot…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.preview} />

      {result?.error && (
        <Text style={styles.error}>{result.error}</Text>
      )}

      {result && !result.error && (
        <View style={styles.box}>
          <Text style={styles.title}>Analysis Complete</Text>

          <Text style={styles.label}>Detected Content:</Text>
          <Text style={styles.value}>{result.raw_text || "None"}</Text>

          <Text style={styles.label}>Tokens:</Text>
          <Text style={styles.value}>
            {result.tokens?.length ? result.tokens.join(", ") : "None"}
          </Text>

          <Text style={styles.label}>Warnings:</Text>
          <Text style={styles.value}>
            {result.warnings?.length ? result.warnings.join("\n") : "None"}
          </Text>

          <Text style={styles.label}>Summary:</Text>
          <Text style={styles.value}>{result.summary || "No summary"}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 18,
  },
  preview: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
  },
  label: {
    color: "#4A90E2",
    marginTop: 10,
    fontSize: 16,
  },
  value: {
    color: "white",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 18,
    marginTop: 20,
  },
});
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ScreenshotUploadScreen({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = () => {
    navigation.navigate("AnalysisScreen", { screenshot: image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Screenshot</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>Choose Screenshot</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.preview} />
      )}

      {image && (
        <TouchableOpacity style={styles.analyzeButton} onPress={analyzeImage}>
          <Text style={styles.analyzeText}>Analyze Screenshot</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0d0d0d" },
  title: { fontSize: 26, color: "#fff", marginBottom: 20, fontWeight: "600" },
  uploadButton: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  uploadText: { color: "#fff", fontSize: 16 },
  preview: {
    width: "100%",
    height: 350,
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  analyzeButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  analyzeText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

