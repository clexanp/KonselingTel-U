import { Box, Button, HStack, Image, Input, ScrollView, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { database, getTable } from "../configs/firebaseConfig";
import { onValue, ref, update } from "firebase/database";
import { getData } from "../utils/localStorage";
import { ActivityIndicator, Linking } from "react-native";
import { formatDistance, fromUnixTime } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const EventDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bottom } = useSafeAreaInsets();
  const { id } = useRoute().params;

  const path = `event/${id}`;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  const getEvent = () => {
    onValue(getTable(path), (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    });
  };

  const onSend = async () => {
    await update(ref(database, path), {
      ...data,
    });
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (loading) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View flex={1} bg="white">
      <ScrollView>
        <View
          bg="white"
          borderRadius="md"
          px="4"
          py="2"
          mt="4"
          borderBottomWidth={1}
          borderBottomColor="gray.200"
          pb="4"
        >
          <HStack alignItems="center">
            <Image
              source={{ uri: data.author.photo }}
              borderRadius="full"
              size="xs"
              alt="Image"
              borderWidth={1}
              borderColor="amber.500"
            />
            <VStack>
              <Text ml="4" fontWeight="semibold" fontSize="md">
                {data.title}
              </Text>
              <Text ml="4" fontWeight="normal" fontSize="xs" umberOfLines={2}>
                {data.author.name}
              </Text>
              <Text ml="4" fontWeight="normal" fontSize="xs">
                {formatDistance(fromUnixTime(Math.floor(data.date / 1000)), new Date(), { addSuffix: true })}
              </Text>
            </VStack>
          </HStack>

          <View>
            {data.imageUrl && (
              <Image
                source={{ uri: data.imageUrl }}
                alt="Image"
                mt="4"
                width="full"
                borderRadius="md"
                style={{ aspectRatio: 3 / 2 }}
              />
            )}
            <Text mt="4" fontWeight="normal" fontSize="sm">
              {data.content}
            </Text>
          </View>
        </View>
      </ScrollView>
      {data.link && (
        <Box alignItems="center" w="100%" mb="4" px="4">
          <Button
            w="100%"
            onPress={async () => {
              if (await Linking.canOpenURL(data.link)) {
                await Linking.openURL(data.link);
              }
            }}
          >
            Buka Link Event
          </Button>
        </Box>
      )}
    </View>
  );
};

export default EventDetail;
