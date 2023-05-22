import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

const FoodListItem = ({ data }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.countText}>⭐️ ({data.numberOfReviews})</Text>
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
