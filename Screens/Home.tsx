import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import FoodListItem from "./components/FoodListItem";

const Home = () => {
  const renderItem = ({ item }) => <FoodListItem />;

  return (
    <View style={styles.container}>
      <FlatList
        data={["", "", "", "", "", ""]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
});

export default Home;
