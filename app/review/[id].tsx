import { Stack, usePathname, useRouter } from "expo-router";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import ReviewFood from "@screens/ReviewFood";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function Review() {
  const pathname = usePathname();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = pathname?.split("/")[2];
    if (id) {
      firestore()
        .collection("food-items")
        .doc(id)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setFood({ ...documentSnapshot.data(), id: documentSnapshot.id });
          }
          setLoading(false);
        })
        .catch((error) => {
          Alert.alert("Something went wrong");
          setLoading(false);
          console.log(error);
        });
    }
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "Add Review",
        }}
      />
      <ReviewFood data={food} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
