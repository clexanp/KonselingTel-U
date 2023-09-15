import { useNavigation } from "@react-navigation/native";
import { Box, Button, Image, Text } from "native-base";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { getData, setData } from "../utils/localStorage";

const data = [
  {
    title: "Forum",
    image:
      "https://i.ibb.co/31PzQXD/internet-troll-quarreling-upsetting-user-online-tablet-with-troll-face-internet-trolling-digital-har.jpg",
    description:
      " Fitur ini bisa membuat postingan forum yang bisa digunakan untuk ruang diskusi membahas semua hal tentang konseling yang bisa dimanfaatkan oleh mahasiswa dan juga konselor.",
  },
  {
    title: "Event",
    image:
      "https://i.ibb.co/wJBv6Xv/manager-with-checklist-creating-event-plan-development-event-management-planning-service-how-plan-ev.jpg",
    description:
      "Fitur ini bisa digunakan untuk melihat berbagai jenis event yang berkaitan dengan konseling yang bisa dimanfaatkan oleh mahasiswa dan konselor.",
  },
  {
    title: "Chatting",
    image:
      "https://i.ibb.co/VgPr1JK/digital-marketing-online-advertising-smm-app-notification-chatting-texting-viral-content-internet-me.jpg",
    description:
      "Fitur ini bisa digunakan untuk membuat percakapan dan bisa menyimpan riwayat nya juga untuk semua hal yang memiliki topik konseling yang bisa dimanfaatkan oleh mahasiswa dan konselor.",
  },
];

const Dot = ({ active = false }) => {
  return (
    <TouchableOpacity>
      <Box height={3} width={3} borderRadius="full" bg={active ? "blue.400" : "gray.300"} />
    </TouchableOpacity>
  );
};
const PaginationDots = React.memo(({ activePage, totalPage, ...rest }) => {
  return (
    <Box flexDir="row" alignItems="center" justifyContent="space-between">
      {Array(totalPage)
        .fill(0)
        .map((_, idx) => (
          <Box key={String(idx)}>
            <Dot {...rest} active={typeof activePage === "number" ? idx === activePage : activePage.includes(idx)} />
          </Box>
        ))}
    </Box>
  );
});

const OnboardingScreen = () => {
  const { width } = useWindowDimensions();
  const [activePage, setActivePage] = useState(0);
  const ref = useRef(null);
  const navigation = useNavigation();

  const handleOnScroll = useCallback(
    (event) => {
      const { contentOffset } = event.nativeEvent;
      const pageFraction = contentOffset.x / width;
      const page = Math.round(pageFraction);

      if (page !== activePage) {
        setActivePage(page);
      }
    },
    [activePage, width]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Box
          flex={1}
          backgroundColor={item}
          px="4"
          width={width}
          alignItems="center"
          justifyContent="center"
          bg="white"
        >
          <Text fontWeight={600} fontSize={24} color="black">
            {item.title}
          </Text>
          <Image source={{ uri: item.image }} alt={item.title} resizeMode="contain" width={80} height={80} />
          <Text fontWeight={400} fontSize={14} color="black" textAlign="center">
            {item.description}
          </Text>
        </Box>
      );
    },
    [width]
  );

  const handleScrollToNext = useCallback(async () => {
    const lastItemIndex = data.length - 1;
    const nextItemIndex = activePage + 1;

    if (nextItemIndex <= lastItemIndex) {
      ref?.current?.scrollToIndex({ animated: true, index: nextItemIndex });
    } else {
      await setData("first_launch1", "true");
      getData("user").then((res) => {
        if (res) {
          navigation.replace("Home");
        } else {
          navigation.replace("Login");
        }
      });
    }
  }, [activePage]);

  return (
    <Box flex={1}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        scrollEnabled={false}
        ref={ref}
        onScroll={handleOnScroll}
        renderItem={renderItem}
      />
      <Box p={4} alignItems="center" bg="white">
        <Box px="1.5" width="16">
          <PaginationDots activePage={activePage} totalPage={data.length} />
        </Box>
        <Button width="full" onPress={handleScrollToNext} mt="3">
          Selanjutnya
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingScreen;
