import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "react-native-elements";

export default function SeparetorClass() {
  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        minWidth: windowWidth * 0.8,
        width: "90%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            backgroundColor: "#e5e5e5",
            height: 2,
            marginTop: 25,
          }}
        ></View>
        <ImageBackground
          style={{
            borderRadius: 98,
            backgroundColor: "#fff",
            height: 50,
            width: 50,
            flexGrow: 0,
            marginRight: 10,
            marginLeft: 10,
          }}
          source={require("../../../assets/icons/shield.png")}
        ></ImageBackground>
        <View
          style={{
            flexGrow: 1,
            backgroundColor: "#e5e5e5",
            height: 2,
            marginTop: 25,
          }}
        ></View>
      </View>
    </View>
  );
}
