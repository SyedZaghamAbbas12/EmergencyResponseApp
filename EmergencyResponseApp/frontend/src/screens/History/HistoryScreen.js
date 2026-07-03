import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globalStyles from "../../styles/globalStyles";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem("sosHistory");
      if (data) {
        setHistory(JSON.parse(data));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // 📅 format date nicely
  const formatDate = (timeString) => {
    const date = new Date(timeString);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      date: date.toLocaleDateString(),
    };
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>SOS History</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>No emergency records yet</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => {
            const { day, date } = formatDate(item.time);

            return (
              <View style={styles.card}>
                
                {/* Emergency Number */}
                <View style={styles.headerRow}>
                  <Text style={styles.number}>
                    #{index + 1}
                  </Text>

                  <Text style={styles.type}>
                    🚨 {item.type}
                  </Text>
                </View>

                {/* Date */}
                <Text style={styles.date}>
                  📅 {day}, {date}
                </Text>

                {/* Location */}
                <Text style={styles.text}>
                  📍 {item.location}
                </Text>

                {/* Notes */}
                <Text style={styles.text}>
                  📝 {item.notes || "No notes provided"}
                </Text>

                {/* Time */}
                <Text style={styles.time}>
                  ⏰ {item.time}
                </Text>

              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#d90429",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#d90429",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  number: {
    backgroundColor: "#d90429",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 12,
    fontWeight: "bold",
  },

  type: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  date: {
    fontSize: 13,
    color: "#555",
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },

  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});