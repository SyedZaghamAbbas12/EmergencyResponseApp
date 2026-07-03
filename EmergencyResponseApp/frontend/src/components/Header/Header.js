import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: colors.primary,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default Header;