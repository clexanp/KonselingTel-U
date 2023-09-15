import * as React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Router from "./router";
import 'expo-dev-client';


LogBox.ignoreLogs(["In React 18, SSRProvider", "Setting a timer for a long period"]);

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator> */}

        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
