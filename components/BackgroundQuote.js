import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TASK_NAME = "fetch-random-quote-task";
const QUOTE_KEY = "last_quote";

const fetchAndSaveQuote = async () => {
  const response = await fetch("https://dummyjson.com/quotes/random");
  const data = await response.json();

  const quoteData = {
    content: data.quote,
    author: data.author,
    time: new Date().toLocaleString(),
  };

  await AsyncStorage.setItem(QUOTE_KEY, JSON.stringify(quoteData));

  return quoteData;
};

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    await fetchAndSaveQuote();
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.log("Background task error:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export default function BackgroundQuote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    registerBackgroundTask();
    loadLastQuote();
  }, []);

  const registerBackgroundTask = async () => {
    try {
      const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);

      if (!isRegistered) {
        await BackgroundTask.registerTaskAsync(TASK_NAME, {
          minimumInterval: 15,
        });

        console.log("Background task registered");
      }
    } catch (error) {
      console.log("Register task error:", error);
    }
  };

  const loadLastQuote = async () => {
    try {
      const savedQuote = await AsyncStorage.getItem(QUOTE_KEY);

      if (savedQuote) {
        setQuote(JSON.parse(savedQuote));
      }
    } catch (error) {
      console.log("Load quote error:", error);
    }
  };

  const fetchQuoteNow = async () => {
    try {
      const newQuote = await fetchAndSaveQuote();
      setQuote(newQuote);
    } catch (error) {
      console.log("Fetch quote error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latihan 3: Background Quote</Text>

      {quote ? (
        <>
          <Text style={styles.quote}>"{quote.content}"</Text>
          <Text style={styles.author}>- {quote.author}</Text>
          <Text style={styles.time}>Last update: {quote.time}</Text>
        </>
      ) : (
        <Text style={styles.empty}>Belum ada quote tersimpan.</Text>
      )}

      <Button title="Test Fetch Quote" color="green" onPress={fetchQuoteNow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 8,
  },
  author: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  empty: {
    marginBottom: 10,
  },
});