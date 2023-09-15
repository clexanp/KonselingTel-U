import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./Chat";
import ProfileScreen from "./Profile";
import HistoryScreen from "./History";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, StatusBar, SafeAreaView, Image } from "react-native";
import { removeData } from "../utils/localStorage";
import Forum from "./Forum";
import Event from "./Event";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const onLogout = async () => {
    await removeData("user");
    navigation.replace("Login");
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 60,
            paddingHorizontal: 16,
            alignItems: "center",
            marginTop: 16,
          }}
        >
          {/* <View></View> */}
          <Image
            style={{
              width: 25,
              height: 30,
              resizeMode: "stretch",
            }}
            source={require("../assets/images/telu-logo.png")}
          />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            Konseling Tel-U
          </Text>
          <TouchableOpacity onPress={onLogout}>
            <FontAwesome name="sign-out" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Tab.Navigator initialRouteName="Profile">
        <Tab.Screen
          name="Forum"
          component={Forum}
          options={{
            headerShown: false,
            tabBarLabel: "Forum",
            tabBarIcon: ({ color, size }) => <FontAwesome name="users" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Event"
          component={Event}
          options={{
            headerShown: false,
            tabBarLabel: "Event",
            tabBarIcon: ({ color, size }) => <FontAwesome name="calendar" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-sharp" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            headerShown: false,
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => <FontAwesome name="history" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => <FontAwesome name="user" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
