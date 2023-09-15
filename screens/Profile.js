import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getData } from "../utils/localStorage";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: "stretch",
          borderRadius: 50,
          backgroundColor: "grey",
        }}
        source={
          userData?.photo
            ? { uri: userData?.photo }
            : require("../assets/images/user-placeholder.png")
        }
      />

      <Text style={styles.name}>{userData?.name}</Text>
      <View style={styles.divider}></View>
      {userData?.subject && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#EDEEF0",
            marginTop: 16,
            paddingHorizontal: 5,
            paddingVertical: 16,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            Jurusan:
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {userData?.subject}
          </Text>
        </View>
      )}

      {userData?.jabatan && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#EDEEF0",
            marginTop: 16,
            paddingHorizontal: 3,
            paddingVertical: 16,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            Jabatan:
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {userData?.jabatan}
          </Text>
        </View>
      )}


      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#EDEEF0",
          marginTop: 16,
          paddingHorizontal: 3,
          paddingVertical: 16,
          borderRadius: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 12,
          }}
        >
          {userData?.nik ? "NIP:" : "NIM:"}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {userData?.nik || userData?.nim}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 40,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  nimNik: {
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  subject: {
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  jabatan: {
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  divider: {
    backgroundColor: "#EDEEF0",
    height: 4,
    width: "100%",
    marginTop: 16,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  actionWrapper: {
    width: "100%",
    backgroundColor: "#EDEEF0",
    padding: 10,
    borderRadius: 4,
    marginTop: 18,
  },
  actionText: { marginLeft: 10, fontWeight: "600", color: "blue" },
});
