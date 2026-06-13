// screens/ScreenshotIntakeScreen.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ScreenshotIntakeScreen({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      // Navigate to analysis screen
      navigation.navigate("Analysis", { imageUri: uri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Screenshot</Text>

      {image && (
        <Image source={{ uri: image }} style={styles.preview} />
      )}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Screenshot</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  preview: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

