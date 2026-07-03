import React from "react";
import { View, Text, StyleSheet } from "react-native";

import globalStyles from "../../styles/globalStyles";
import Button from "../../components/Button/Button";

export default function HomeScreen({ navigation }) {
  return (
    <View style={[globalStyles.container, styles.wrapper]}>
      
      <Text style={styles.title}>
        Emergency Response
      </Text>

      <Text style={styles.subtitle}>
        Press the button below to send an SOS request immediately.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          🚨 Your location and alert will be shared with emergency contacts.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Emergency 🚨 "
          onPress={() => navigation.navigate("SOS")}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#d90429",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 25,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#fff3f3",
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: "#d90429",
  },

  cardText: {
    fontSize: 14,
    color: "#333",
  },

  buttonContainer: {
    marginTop: 10,
  },
});