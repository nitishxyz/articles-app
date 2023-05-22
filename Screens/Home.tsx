import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import FoodListItem from "./components/FoodListItem";

const Home = () => {
  const [foods, setFoods] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    setLoading(true);
    firestore()
      .collection("food-items")
      .get({
        source: "server",
      })
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Alert.alert("Something went wrong");
      });
  };

  const renderItem = ({ item }) => <FoodListItem data={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onRefresh={loadFoods}
        refreshing={loading}
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
