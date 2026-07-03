import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "../Card/Card";
import colors from "../../styles/colors";

const EmergencyCard = ({ type, status, notes }) => {
  return (
    <Card>
      <Text style={styles.type}>
        {type}
      </Text>

      <Text>Status: {status}</Text>

      <Text>{notes}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
});

export default EmergencyCard;