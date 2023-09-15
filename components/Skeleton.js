import React from "react";
import { View } from "react-native";
import { Skeleton, VStack, HStack, Center } from "native-base";

export default function SkeletonList() {
  return (
    <View style={{ marginTop: 10 }}>
      {Array.apply(null, new Array(4)).map((_, index) => (
        <Center w="100%" style={{ marginVertical: 10 }} key={String(index)}>
          <HStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
            p="4"
          >
            <Skeleton flex="1" h="60" w="60" rounded="full" startColor="coolGray.100" />
            <VStack flex="3" space="4">
              <Skeleton.Text />
            </VStack>
          </HStack>
        </Center>
      ))}
    </View>
  );
}
