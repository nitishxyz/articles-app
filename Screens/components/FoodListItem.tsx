import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { useRouter } from "expo-router";

const FoodListItem = ({ data }) => {
  const router = useRouter();
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
        <View style={styles.reviewContainer} pointerEvents="none">
          <Rating imageSize={10} startingValue={data.rating} />
          <Text style={styles.countText}> ({data.numberOfReviews})</Text>
        </View>

        <Pressable
          style={styles.reviewButton}
          onPress={() => {
            router.push(`/review/${data.id}`);
          }}
        >
          <Text style={styles.buttonText}>Review your order</Text>
        </Pressable>
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
  reviewContainer: {
    flexDirection: "row",
  },
});

export default FoodListItem;
