import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import SplashScreen from "./screens/Splash";
import ChatDetailScreen from "./screens/ChatDetail";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import OnboardingScreen from "./screens/OnboardingScreen";
import ForumDetail from "./screens/ForumDetail";
import NewForum from "./screens/NewForum";
import NewEvent from "./screens/NewEvent";
import EventDetail from "./screens/EventDetail";

const Stack = createNativeStackNavigator();

export default function router() {
  const navigation = useNavigation();

  const headerOptions = {
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTitleStyle: {
      color: "#000",
      fontWeight: "600",
      fontSize: 14,
    },
    headerTitleAlign: "center",
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={22} color="black" />
      </TouchableOpacity>
    ),
  };

  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ ...headerOptions }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} options={{ title: "" }} />
      <Stack.Screen name="ForumDetail" component={ForumDetail} options={{ title: "Forum" }} />
      <Stack.Screen name="NewForum" component={NewForum} options={{ title: "Buat Postingan Baru" }} />
      <Stack.Screen name="NewEvent" component={NewEvent} options={{ title: "Buat Event Baru" }} />
      <Stack.Screen name="EventDetail" component={EventDetail} options={{ title: "Event" }} />
    </Stack.Navigator>
  );
}
