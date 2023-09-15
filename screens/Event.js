import { onValue } from "firebase/database";
import { Button, Center, HStack, Image, Pressable, ScrollView, Skeleton, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { getTable } from "../configs/firebaseConfig";
import { formatDistance, fromUnixTime } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../utils/localStorage";

const Event = () => {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  const getListData = () => {
    onValue(getTable("event"), (snapshot) => {
      let dataArr = [];

      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        dataArr.push({
          id: childKey,
          ...childData,
        });
      });

      setItemList(dataArr);
      setLoading(false);
    });
  };

  useEffect(() => {
    getListData();
  }, []);

  if (loading) {
    return (
      <View flex={1}>
        {[1, 2, 3, 4].map((item) => (
          <Center w="100%" mt="4" key={item}>
            <VStack
              bg="white"
              w="90%"
              maxW="400"
              borderWidth="1"
              space={8}
              overflow="hidden"
              rounded="md"
              p="4"
              _dark={{
                borderColor: "coolGray.500",
              }}
              _light={{
                borderColor: "coolGray.200",
              }}
            >
              <Skeleton.Text px="4" />
            </VStack>
          </Center>
        ))}
      </View>
    );
  }

  if (itemList.length === 0) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Image
          source={require("../assets/images/no-message.png")}
          alt="No Message"
          style={{
            height: 100,
            width: 100,
          }}
        />
        <Text
          style={{
            fontWeight: "600",
            color: "grey",
          }}
        >
          Belum ada event
        </Text>
        {!!userData && userData?.nik && (
          <Button
            position="absolute"
            zIndex={10}
            right={4}
            bottom={4}
            borderRadius="full"
            onPress={() => navigation.navigate("NewEvent")}
          >
            <HStack alignItems="center">
              <FontAwesome name="plus-circle" size={24} color="white" />
              <Text ml="3" color="white" fontWeight="medium">
                Event
              </Text>
            </HStack>
          </Button>
        )}
      </View>
    );
  }

  return (
    <View flex={1}>
      <ScrollView pt="4" contentContainerStyle={{ paddingHorizontal: 16 }}>
        {itemList?.map((item, index) => (
          <Pressable
            key={index}
            bg="white"
            shadow="1"
            borderRadius="md"
            px="4"
            py="2"
            mb="4"
            onPress={() => {
              navigation.navigate("EventDetail", {
                id: item.id,
              });
            }}
          >
            <HStack alignItems="center">
              <Image
                source={{ uri: item.author.photo }}
                borderRadius="full"
                size="xs"
                alt="Image"
                borderWidth={1}
                borderColor="amber.500"
              />
              <VStack>
                <Text ml="4" fontWeight="semibold" fontSize="md">
                  {item.title}
                </Text>
                <Text ml="4" fontWeight="normal" fontSize="xs" numberOfLines={2}>
                  {item.author.name}
                </Text>
                <Text ml="4" fontWeight="normal" fontSize="xs" numberOfLines={2}>
                  {formatDistance(fromUnixTime(Math.floor(item.date / 1000)), new Date(), { addSuffix: true })}
                </Text>
              </VStack>
            </HStack>

            <View>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  alt="Image"
                  mt="4"
                  width="full"
                  borderRadius="md"
                  style={{ aspectRatio: 3 / 2 }}
                />
              )}
              <Text mt="2" fontWeight="normal" fontSize="sm" numberOfLines={2}>
                {item.content}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {!!userData && userData?.nik && (
        <Button
          position="absolute"
          zIndex={10}
          right={4}
          bottom={4}
          borderRadius="full"
          onPress={() => navigation.navigate("NewEvent")}
        >
          <HStack alignItems="center">
            <FontAwesome name="plus-circle" size={24} color="white" />
            <Text ml="3" color="white" fontWeight="medium">
              Event
            </Text>
          </HStack>
        </Button>
      )}
    </View>
  );
};

export default Event;
