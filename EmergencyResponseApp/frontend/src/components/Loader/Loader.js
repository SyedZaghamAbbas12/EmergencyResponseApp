import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../../styles/colors";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Loader;