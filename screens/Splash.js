import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { getData } from "../utils/localStorage";

export default function SplahScreen({ navigation }) {
  useEffect(() => {
    getData("first_launch1").then((res) => {
      if (res === "true") {
        getData("user").then((res) => {
          if (res) {
            navigation.replace("Home");
          } else {
            navigation.replace("OnboardingScreen");
          }
        });
      } else {
        navigation.replace("Login");
      }
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{
          width: 90,
          height: 110,
          resizeMode: "stretch",
        }}
        source={require("../assets/images/telu-logo.png")}
      />
      <Text style={styles.title}>Konseling Tel-U</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 20,
  },
});
