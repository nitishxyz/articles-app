import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";

import { Image } from "expo-image";
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Crypto from "expo-crypto";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";

const ReviewFood = ({ data }) => {
  const router = useRouter();
  const [feedback, setFeedback] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const canSubmit = useMemo(() => {
    const hasFeedback = feedback.length > 0;
    const hasRating = rating > 0;
    const hasImages = images.length > 0;
    const allUploaded = images.every((img) => !img.uploading);
    return hasFeedback && hasImages && allUploaded && hasRating;
  }, [feedback, images]);

  const submitReview = () => {
    console.log("submitting review", data.id);
    setLoading(true);
    firestore()
      .runTransaction(async (transaction) => {
        const foodRef = firestore().collection("food-items").doc(data.id);
        const reviewRef = firestore().collection("reviews").doc();
        const review = {
          feedback,
          rating,
          images: images.map((img) => img.remote),
          food: foodRef,
          id: reviewRef.id,
        };
        transaction.set(reviewRef, review);
        const foodDoc = await transaction.get(foodRef);
        const food = foodDoc.data();
        const five_star = food["5"] || 0;
        const four_star = food["4"] || 0;
        const three_star = food["3"] || 0;
        const two_star = food["2"] || 0;
        const one_star = food["1"] || 0;
        const total_stars =
          five_star + four_star + three_star + two_star + one_star;
        const new_rating =
          (5 * five_star +
            4 * four_star +
            3 * three_star +
            2 * two_star +
            1 * one_star +
            rating) /
          (total_stars + 1);

        console.log("new_rating: ", new_rating);

        transaction.update(foodRef, {
          reviews: firestore.FieldValue.arrayUnion(reviewRef),
          [rating]: firestore.FieldValue.increment(1),
          numberOfReviews: firestore.FieldValue.increment(1),
          rating: new_rating,
        });
      })
      .then(() => {
        console.log("Review Submitted");
        Alert.alert("Review Submitted");
        router.back();
        setLoading(false);
      })
      .catch((error) => {
        console.log("Review submit error: ", error);
        setLoading(false);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setImages([...images, { local: uri, remote: null, uploading: true }]);
    const UUID = Crypto.randomUUID();
    const mime = uri.split(".").pop();

    const imgRef = storage().ref(`images/${UUID}.${mime}`);

    imgRef.putFile(uri).on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("upload file error: ", error);
        // remove the image from the list

        setImages(images.filter((img) => img.local !== uri));
      },
      async () => {
        const url = await imgRef.getDownloadURL();
        setImages([...images, { local: uri, remote: url, uploading: false }]);
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.foodContainer}>
          <Image
            source={{ uri: data.image }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.foodRight}>
            <Text style={styles.foodTitle}>{data.name}</Text>
            <Text style={styles.foodDescription} numberOfLines={3}>
              {data.description}
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
        <Rating showRating onFinishRating={setRating} />

        <Text style={styles.addImageText}>Add Images</Text>
        <View style={styles.imagesContainer}>
          {images.map((image) => (
            <View style={styles.imageBox} key={image.local}>
              <Image
                source={{ uri: image.remote || image.local }}
                style={styles.flex}
                contentFit="cover"
              />
              {image.uploading ? (
                <View style={styles.imageLoadingContainer}>
                  <ActivityIndicator color={"blue"} />
                </View>
              ) : null}
            </View>
          ))}
          {images?.length < 3 ? (
            <View style={styles.imageBox}>
              <TouchableOpacity
                style={styles.addImageButton}
                onPress={pickImage}
              >
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            backgroundColor: canSubmit ? "#000" : "transparent",
          },
        ]}
        disabled={!canSubmit}
        onPress={submitReview}
      >
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text
            style={[
              styles.submitText,
              {
                color: canSubmit ? "#fff" : "grey",
              },
            ]}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20,
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
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: "row",
    marginTop: 30,
    // justifyContent: "center",
  },
  imageBox: {
    width: "30%",
    height: 100,
    borderWidth: 1,
    borderColor: "grey",
    marginRight: 10,
  },
  flex: { flex: 1 },
  submitButton: {
    width: "100%",
    paddingVertical: 20,
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
  addImageButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageLoadingContainer: {
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
  },
});

export default ReviewFood;
