import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "@screens/Home";

export default function App() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Food Items",
        }}
      />
      <Home />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
