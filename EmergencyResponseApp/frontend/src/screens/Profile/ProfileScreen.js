import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Button from "../../components/Button/Button";
import globalStyles from "../../styles/globalStyles";
import { removeToken } from "../../utils/storage";

export default function ProfileScreen() {
  // 👤 Dummy user data (replace later with backend)
  const [user, setUser] = useState({
    name: "Zagham User",
    phone: "+92 300 1234567",
    photo: null,
  });

  // 📸 Pick profile image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, photo: result.assets[0].uri });
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await removeToken();
      Alert.alert("Success", "Logged Out");
    } catch (error) {
      Alert.alert("Error", "Logout failed");
    }
  };

  return (
    <View style={globalStyles.container}>

      <Text style={styles.title}>Profile</Text>

      {/* Profile Card */}
      <View style={styles.card}>

        {/* Profile Image */}
        <TouchableOpacity onPress={pickImage} style={styles.imageBox}>
          {user.photo ? (
            <Image source={{ uri: user.photo }} style={styles.image} />
          ) : (
            <Text style={styles.addPhoto}>+ Add Photo</Text>
          )}
        </TouchableOpacity>

        {/* User Info */}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>📞 {user.phone}</Text>

        <Text style={styles.hint}>
          Tap image to change profile picture
        </Text>

      </View>

      {/* Logout */}
      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={logout} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#d90429",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
  },

  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  addPhoto: {
    color: "#888",
    fontWeight: "600",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  phone: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },

  hint: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});