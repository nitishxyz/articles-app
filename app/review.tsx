import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ReviewFood from "../Screens/ReviewFood";

export default function Review() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Add Review",
        }}
      />
      <ReviewFood />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
