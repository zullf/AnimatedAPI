import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AnimatedCard from "./components/AnimatedCard";
import SwipeableListItem from "./components/SwipeableListItem";
import BackgroundQuote from "./components/BackgroundQuote";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <AnimatedCard />

          <SwipeableListItem title="Tugas Mobile Programming" />

          <BackgroundQuote />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    padding: 20,
  },
});