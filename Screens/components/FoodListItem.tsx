import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TestImage from "../../Images/food_test.jpeg";
import { Link } from "expo-router";

const FoodListItem = () => {
  return (
    <View style={styles.itemContainer}>
      <Image source={TestImage} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>KFC Chicken Bucket</Text>
        <Text style={styles.description}>
          Chizza, a recent addition to the KFC menu, is a favorite among those
          who enjoy both pizza and poultry. It is a crunchy chicken breast
        </Text>
        <Text style={styles.countText}>⭐️ (45)</Text>
        <Link href={"/review"} asChild>
          <Pressable style={styles.reviewButton}>
            <Text style={styles.buttonText}>Review your order</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 5,
    marginBottom: 10,
  },
  reviewButton: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  countText: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 10,
  },
});

export default FoodListItem;