import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { registerUser } from "../../services/authService";
import { validateRegister } from "../../utils/validators";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const error = validateRegister(name, phone, password);

    if (error) {
      return Alert.alert("Validation", error);
    }

    try {
      await registerUser({ name, phone, password });

      Alert.alert("Success", "Registration Successful");

      navigation.navigate("Login");
    } catch (err) {
  console.log("REGISTER ERROR:", err.response?.data || err.message);

  Alert.alert(
    "Error",
    JSON.stringify(err.response?.data) || err.message
  );
}
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account ✨</Text>
        <Text style={styles.subtitle}>
          Sign up to get started
        </Text>

        <View style={styles.form}>
          <Input
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />

          <Input
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Register" onPress={handleRegister} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
  },

  form: {
    gap: 12,
  },

  linkText: {
    marginTop: 20,
    textAlign: "center",
    color: "#cbd5e1",
  },

  linkBold: {
    color: "#38bdf8",
    fontWeight: "bold",
  },
});