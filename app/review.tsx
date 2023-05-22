import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Review() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Add Review",
        }}
      />
      <View style={styles.container}>
        <Text>This is where you can review the food item.</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
