import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GiftedChat, Bubble, Composer, Send, InputToolbar, Avatar } from "react-native-gifted-chat";
import { Text, TouchableOpacity, View, StatusBar, SafeAreaView, Image } from "react-native";
import { FontAwesome, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { getTable, database } from "../configs/firebaseConfig";
import { onValue, update, ref } from "firebase/database";
import { getData } from "../utils/localStorage";
import { useNavigation } from "@react-navigation/native";

export default function ChatDetailScreen({ navigation, route }) {
  const { item } = route?.params;
  const sourcePage = route?.params?.sourcePage;

  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  const onGetMessages = () => {
    onValue(
      getTable(
        `history/${
          userData?.nik ? `${userData?.nik}${item?.identityNumber}` : `${item?.identityNumber}${userData?.nim}`
        }`
      ),
      (snapshot) => {
        const data = snapshot?.val();
        setMessages(data?.messages || []);
      }
    );
  };

  useEffect(() => {
    if (userData) {
      onGetMessages();
    }
  }, [userData]);

  const { setOptions } = useNavigation();
  useEffect(() => {
    setOptions({
      title: item?.name,
    });
  }, [item]);

  const onSend = (newMessages = []) => {
    update(
      ref(
        database,
        `history/${
          userData?.nik ? `${userData?.nik}${item?.identityNumber}` : `${item?.identityNumber}${userData?.nim}`
        }/`
      ),
      { messages: GiftedChat.append(messages, newMessages) }
    );
  };

  const renderBubble = (props) => (
    <View
      style={{
        marginBottom: 26,
      }}
    >
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#0066CB",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 0,
          },
          left: {
            backgroundColor: "#e8e8e8",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 0,
          },
        }}
      />
    </View>
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={{ borderWidth: 0 }}>
      <View
        style={{
          width: 54,
          height: "100%",
          marginBottom: 0,
          backgroundColor: "#0066CB",
          justifyContent: "center",
          alignItems: "center",
          borderTopEndRadius: 22,
          borderBottomEndRadius: 22,
        }}
      >
        <FontAwesome5 name="paper-plane" size={24} color="white" />
      </View>
    </Send>
  );

  const renderChatEmpty = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        transform: [{ rotate: '-180deg' }],
      }}
    >
      <Image
        source={require("../assets/images/no-message.png")}
        style={{
          height: 100,
          width: 100,
        }}
      />

      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          marginLeft: 16,
          color: "#7D8797",
        }}
      >
        Belum ada pesan!
      </Text>
    </View>
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e8e8e8",
        borderRadius: 22,
      }}
    />
  );

  const renderAvatar = (props) => (
    <View
      style={{
        marginBottom: 26,
      }}
    >
      <Avatar {...props} />
    </View>
  );
  return (
    <>
      <GiftedChat
        renderBubble={renderBubble}
        render
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderAvatar={renderAvatar}
        text={message}
        onInputTextChanged={(val) => setMessage(val)}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderChatEmpty={renderChatEmpty}
        user={{
          _id: userData?.nik || userData?.nim,
          name: userData?.name,
          avatar: userData?.photo,
          targetUser: {
            _id: item?.identityNumber,
            name: item?.name,
            avatar: item?.photo,
          },
        }}
      />
    </>
  );
}
