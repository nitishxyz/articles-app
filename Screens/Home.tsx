import React, { useEffect } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import FoodListItem from "./components/FoodListItem";

const Home = () => {
  const [foods, setFoods] = React.useState([]);

  useEffect(() => {
    firestore()
      .collection("food-items")
      .get()
      .then((querySnapshot) => {
        console.log("Total food items: ", querySnapshot.size);

        const items = [];

        querySnapshot.forEach((documentSnapshot) => {
          items.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setFoods(items);
      });
  }, []);

  const renderItem = ({ item }) => <FoodListItem data={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
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
