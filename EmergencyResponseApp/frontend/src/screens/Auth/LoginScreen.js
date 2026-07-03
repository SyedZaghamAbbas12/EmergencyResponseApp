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

import globalStyles from "../../styles/globalStyles";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { loginUser } from "../../services/authService";
import { saveToken } from "../../utils/storage";
import { validateLogin } from "../../utils/validators";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  const error = validateLogin(phone, password);

  if (error) {
    return Alert.alert("Validation", error);
  }

  try {
    const res = await loginUser({ phone, password });

    await saveToken(res.token);

    Alert.alert("Success", "Login Successful");

    // 🔥 ADD THIS LINE
   navigation.replace("Main")

  } catch (err) {
    Alert.alert(
      "Error",
      err.response?.data?.message || "Login Failed"
    );
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Emergency Response</Text>
        <Text style={styles.subtitle}>
          Login to continue 
        </Text>

        <View style={styles.form}>
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

          <Button title="Login" onPress={handleLogin} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.linkText}>
            Don't have an account?{" "}
            <Text style={styles.linkBold}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // dark modern background
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
    fontSize: 28,
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
    marginTop: 10,
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