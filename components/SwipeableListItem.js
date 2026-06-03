import React, { useState } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DELETE_THRESHOLD = SCREEN_WIDTH * 0.7;

export default function SwipeableListItem({ title }) {
  const [visible, setVisible] = useState(true);
  const translateX = useSharedValue(0);

  const removeItem = () => {
    setVisible(false);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > DELETE_THRESHOLD) {
        translateX.value = withTiming(
          translateX.value > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 300 },
          () => {
            runOnJS(removeItem)();
          }
        );
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: translateX.value > 0 ? "green" : "red",
    alignItems: translateX.value > 0 ? "flex-start" : "flex-end",
  }));

  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.background, backgroundStyle]}>
        <Text style={styles.actionText}>DELETE / ARCHIVE</Text>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.item, animatedStyle]}>
          <Text style={styles.itemText}>{title}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 70,
    marginBottom: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 20,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
  },
});