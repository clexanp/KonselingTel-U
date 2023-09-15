import { Button, HStack, Image, Input, ScrollView, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { database, getTable } from "../configs/firebaseConfig";
import { onValue, ref, update } from "firebase/database";
import { getData, setData } from "../utils/localStorage";
import { ActivityIndicator } from "react-native";
import { formatDistance, fromUnixTime } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const ForumDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bottom } = useSafeAreaInsets();
  const { id } = useRoute().params;

  const path = `forum/${id}`;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  const [commentValue, setCommentValue] = useState("");

  const getForum = () => {
    onValue(getTable(path), (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    });
  };

  const onSend = async () => {
    await update(ref(database, path), {
      ...data,
      comments: [
        ...(data.comments ? data.comments : []),
        {
          user: userData,
          comment: commentValue,
          date: Date.now(),
        },
      ],
    });
    setCommentValue("");
  };

  useEffect(() => {
    getForum();
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
                {data.author.name} •{" "}
                {formatDistance(fromUnixTime(Math.floor(data.date / 1000)), new Date(), { addSuffix: true })}
              </Text>
            </VStack>
          </HStack>

          <View>
            <Text mt="4" fontWeight="normal" fontSize="sm">
              {data.content}
            </Text>
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
          </View>
        </View>

        <View p="4">
          <Text>Komentar :</Text>

          {data.comments?.map((item, index) => (
            <View key={index} mt="4" bg="gray.100" px="4" py="2" borderRadius="lg">
              <HStack alignItems="center">
                <Image
                  source={{ uri: item.user.photo }}
                  borderRadius="full"
                  style={{ width: 32, height: 32 }}
                  alt="Image"
                  borderWidth={1}
                  borderColor="amber.500"
                />
                <VStack>
                  <Text ml="4" fontWeight="normal" fontSize="xs">
                    {item.user.name} •{" "}
                    {formatDistance(fromUnixTime(Math.floor(item.date / 1000)), new Date(), { addSuffix: true })}
                  </Text>
                </VStack>
              </HStack>

              <Text mt="2" fontWeight="normal" fontSize="sm">
                {item.comment}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View m="4" style={{ marginBottom: bottom + 16 }}>
        <Text>Tambah Komentar:</Text>
        <HStack alignItems="center">
          <VStack flex={1}>
            <Input
              value={commentValue}
              onChangeText={setCommentValue}
              placeholder="Tulis Komentar"
              multiline
              height="16"
              mt="2"
            />
          </VStack>
          <View ml="3">
            <Button onPress={onSend} disabled={!commentValue} opacity={!commentValue ? 0.5 : 1}>
              Komentar
            </Button>
          </View>
        </HStack>
      </View>
    </View>
  );
};

export default ForumDetail;
