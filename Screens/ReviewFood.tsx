import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import TestImage from "../Images/food_test.jpeg";
import { Image } from "expo-image";
import { AirbnbRating, Rating } from "react-native-ratings";

const ReviewFood = () => {
  const [feedback, setFeedback] = React.useState("");
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.foodContainer}>
          <Image source={TestImage} style={styles.image} contentFit="cover" />
          <View style={styles.foodRight}>
            <Text style={styles.foodTitle}>KFC Chicken Bucket</Text>
            <Text style={styles.foodDescription}>
              Chizza, a recent addition to the KFC menu, is a favorite among
              those whofavorite among those who favorite among...
            </Text>
          </View>
        </View>
        <TextInput
          value={feedback}
          multiline
          placeholder="Leave your feedback..."
          style={styles.input}
          onChangeText={(text) => setFeedback(text)}
          maxLength={250}
        />
        <Rating showRating />
        <View style={styles.imagesContainer}>
          <View style={styles.imageBox}></View>
          <View style={styles.imageBox}>
            <Image source={TestImage} style={styles.flex} contentFit="cover" />
          </View>
          <View style={styles.imageBox}>
            <Image source={TestImage} style={styles.flex} contentFit="cover" />
          </View>
        </View>
        <View style={styles.imagesContainer}>
          <View style={styles.imageBox}>
            <Image source={TestImage} style={styles.flex} contentFit="cover" />
          </View>
          <View style={styles.imageBox}>
            <Image source={TestImage} style={styles.flex} contentFit="cover" />
          </View>
          <View style={styles.imageBox}>
            <Image source={TestImage} style={styles.flex} contentFit="cover" />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 15,
  },
  foodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "grey",
  },
  foodRight: {
    width: "75%",
  },
  foodTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 2,
    marginBottom: 3,
  },
  foodDescription: {
    fontSize: 13,
    fontWeight: "400",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    height: 120,
    marginTop: 20,
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imageBox: {
    width: "30%",
    height: 100,
    borderWidth: 1,
    borderColor: "grey",
  },
  flex: { flex: 1 },
  submitButton: {
    width: "100%",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  submitText: {
    fontSize: 15,
    fontWeight: "600",
  },
});

export default ReviewFood;
