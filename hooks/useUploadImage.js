import "react-native-get-random-values";

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

async function uploadImageAsync(uri) {
  try {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), v4());
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useUploadImage = () => {
  //   const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
    });

    if (pickerResult.canceled) return setLoading(false);

    setUrl(pickerResult.assets[0].uri);
  };

  const uploadImage = async () => {
    if (url) {
      setLoading(true);

      const _url = await uploadImageAsync(url);
      setLoading(false);
      return _url;
    }
    return "";
  };

  const removeImage = () => {
    setUrl("");
  };

  return { url, pickImage, loading, uploadImage, removeImage };
};
