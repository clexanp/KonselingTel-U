import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Input, Box, Button } from "native-base";
import useAuthentication from "../hooks/useAuthentication";

export default function LoginScreen({ navigation }) {
  const {
    form,
    isLoading,
    onChangeInput,
    onLogin,
    isDisableButton,
    isConsular,
    setIsConsular,
    resetForm,
  } = useAuthentication(navigation);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 70,
          height: 90,
          resizeMode: "stretch",
        }}
        source={require("../assets/images/telu-logo.png")}
      />
      <Text style={styles.title}>Welcome to Konseling Tel-U</Text>
      <Text style={styles.subtitle}>Sign In With Your Account</Text>
      <Box alignItems="center" style={styles.input}>
        <Input
          mx="3"
          placeholder={isConsular ? "NIP" : "NIM"}
          w="100%"
          backgroundColor={"gray.200"}
          size="lg"
          onChangeText={(value) =>
            onChangeInput(isConsular ? "nik" : "nim")(value)
          }
          value={isConsular ? form.nik : form.nim}
        />
      </Box>
      <Box alignItems="center" style={styles.input}>
        <Input
          mx="3"
          placeholder="Password"
          w="100%"
          backgroundColor={"gray.200"}
          size="lg"
          type="password"
          onChangeText={(value) => onChangeInput("password")(value)}
          value={form.password}
        />
      </Box>
      <Box alignItems="center" w="100%" style={styles.button}>
        <Button
          onPress={onLogin}
          w="100%"
          isLoading={isLoading}
          isDisabled={isDisableButton}
        >
          Login
        </Button>
      </Box>

      <Box alignItems="center" w="100%" style={styles.button}>
        <Button
          variant="ghost"
          onPress={() => {
            setIsConsular(!isConsular);
            resetForm();
          }}
          w="100%"
          isLoading={isLoading}
        >
          {isConsular ? "Login as Student" : "Login as Consular"}
        </Button>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 32,
  },
  subtitle: {
    color: "grey",
    marginTop: 16,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
