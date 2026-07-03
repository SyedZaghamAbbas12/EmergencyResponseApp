import React, { useEffect } from "react";
import { View, Text } from "react-native";
import globalStyles from "../../styles/globalStyles";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={globalStyles.center}>
      <Text style={globalStyles.title}>
        Emergency Response
      </Text>

      <Text>Your Safety Matters</Text>
    </View>
  );
}