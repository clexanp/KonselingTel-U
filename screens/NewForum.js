import "react-native-get-random-values";

import { Button, HStack, Image, Input, ScrollView, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { useUploadImage } from "../hooks/useUploadImage";
import { ref, set } from "firebase/database";
import { database } from "../configs/firebaseConfig";
import { v4 } from "uuid";
import { getData } from "../utils/localStorage";
import { useNavigation } from "@react-navigation/native";

const NewForum = () => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const { url, pickImage, loading, removeImage, uploadImage } = useUploadImage();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  const path = `forum/${v4()}`;

  const handlePickImage = async () => {
    if (status.status === ImagePicker.PermissionStatus.UNDETERMINED) {
      const res = await requestPermission();
      if (res.granted) {
        await pickImage();
      }
    }

    if (status.status === ImagePicker.PermissionStatus.GRANTED) {
      await pickImage();
    }
  };

  const onSend = async () => {
    setSubmitLoading(true);
    const imageUrl = await uploadImage();
    await set(ref(database, path), {
      author: userData,
      content,
      title,
      imageUrl,
      date: Date.now(),
    });
    setContent("");
    setTitle("");
    setSubmitLoading(false);
    navigation.goBack();
  };

  const isImageAvailable = !!url;
  const isLoading = loading || submitLoading;

  return (
    <ScrollView flex={1} bg="white">
      <VStack flex={1} px="4" mt="6">
        {isImageAvailable && (
          <VStack>
            <Image source={{ uri: url }} width="full" height={undefined} style={{ aspectRatio: 3 / 2 }} alt="" />
          </VStack>
        )}
        <Input value={title} onChangeText={setTitle} placeholder="Tulis Judul" mt="2" disabled={isLoading} />
        <Input
          value={content}
          onChangeText={setContent}
          placeholder="Tulis Konten"
          multiline
          height="32"
          mt="2"
          textAlignVertical="top"
          disabled={isLoading}
        />
        <HStack mt="4">
          <Button flex={1} variant="outline" mr="2" disabled={isLoading} onPress={handlePickImage}>
            {isImageAvailable ? "Ubah Gambar" : "Tambah Gambar"}
          </Button>
          <Button flex={1} ml="2" onPress={onSend} disabled={isLoading}>
            {isLoading ? "Loading..." : "Buat Postingan"}
          </Button>
        </HStack>
        {isImageAvailable && (
          <Button w="1/3" mt="2" variant="link" onPress={removeImage} disabled={isLoading}>
            Hapus Gambar
          </Button>
        )}
      </VStack>
    </ScrollView>
  );
};

export default NewForum;
