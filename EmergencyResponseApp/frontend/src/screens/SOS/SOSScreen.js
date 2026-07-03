import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import globalStyles from "../../styles/globalStyles";

const emergencyOptions = [
  "Medical Emergency",
  "Fire",
  "Crime / Theft",
  "Accident",
  "Other",
];

export default function SOSScreen() {
  const [emergencyType, setEmergencyType] = useState("");
  const [notes, setNotes] = useState("");
  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);

  // 📍 Get current GPS location
  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = loc.coords;

    setCoords({ latitude, longitude });

    const locText = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

    setLocationText(locText);
  };

  // 🗺️ Open in Google Maps
  const openInMap = () => {
    if (!coords) {
      Alert.alert("Error", "No location found");
      return;
    }

    const url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    Linking.openURL(url);
  };

  // 🚨 SOS Submit + Save History
  const handleSOS = async () => {
    if (!emergencyType) {
      Alert.alert("Error", "Please select emergency type");
      return;
    }

    if (!locationText) {
      Alert.alert("Error", "Please get your location first");
      return;
    }

    const newSOS = {
      id: Date.now(),
      type: emergencyType,
      notes: notes,
      location: locationText,
      time: new Date().toLocaleString(),
    };

    try {
      const existing = await AsyncStorage.getItem("sosHistory");
      const history = existing ? JSON.parse(existing) : [];

      history.push(newSOS);

      await AsyncStorage.setItem("sosHistory", JSON.stringify(history));

      Alert.alert("SOS Sent 🚨", "Saved to history successfully");

      // reset form
      setEmergencyType("");
      setNotes("");
      setLocationText("");
      setCoords(null);
    } catch (error) {
      Alert.alert("Error", "Failed to save SOS");
    }
  };

  return (
    <View style={globalStyles.container}>
      
      <Text style={styles.title}>Send SOS</Text>
      <Text style={styles.subtitle}>
        Get live location and send emergency alert
      </Text>

      {/* Emergency Type */}
      <Text style={styles.label}>Emergency Type</Text>

      <View style={styles.optionsContainer}>
        {emergencyOptions.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.option,
              emergencyType === item && styles.selectedOption,
            ]}
            onPress={() => setEmergencyType(item)}
          >
            <Text
              style={[
                styles.optionText,
                emergencyType === item && styles.selectedText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Location */}
      <Text style={styles.label}>Location</Text>

      <View style={styles.locationBox}>
        <Button
          title="Get Current Location 📍"
          onPress={getCurrentLocation}
        />

        {locationText ? (
          <>
            <Text style={styles.locationText}>
              📌 {locationText}
            </Text>

            <TouchableOpacity onPress={openInMap}>
              <Text style={styles.mapLink}>
                Open in Google Maps 🗺️
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>

      {/* Notes */}
      <Text style={styles.label}>Notes</Text>

      <Input
        placeholder="Write additional details..."
        value={notes}
        onChangeText={setNotes}
      />

      {/* SOS Button */}
      <View style={{ marginTop: 20 }}>
        <Button title="Send Emergency 🚨" onPress={handleSOS} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d90429",
    marginBottom: 5,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },

  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },

  selectedOption: {
    backgroundColor: "#d90429",
    borderColor: "#d90429",
  },

  optionText: {
    fontSize: 13,
    color: "#333",
  },

  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },

  locationBox: {
    marginBottom: 10,
  },

  locationText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },

  mapLink: {
    marginTop: 5,
    color: "#1e90ff",
    fontWeight: "600",
  },
});