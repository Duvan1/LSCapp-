import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { Image } from "react-native-elements";
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";
import Toast from "react-native-easy-toast";
import ListTopRestautant from "../components/Ranking/ListTopRestautant";

const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    db.collection("restaurants")
      .orderBy("rating", "desc")
      .limit(5)
      .get()
      .then((response) => {
        const restaurantArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          restaurantArray.push(data);
        });
        setRestaurants(restaurantArray);
      });
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
          marginTop: 24,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#3c3c3c",
              lineHeight: 26,
            }}
          >
            Liga Rubi
          </Text>
          <ImageBackground
            source={require("../../assets/icons/ruby.png")}
            style={{
              height: 18,
              width: 18,
              marginLeft: 10,
              position: "relative",
            }}
          ></ImageBackground>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <ImageBackground
          source={require("../../assets/icons/bronce.png")}
          style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
        ></ImageBackground>
        <ImageBackground
          source={require("../../assets/icons/plata.png")}
          style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
        ></ImageBackground>
        <ImageBackground
          source={require("../../assets/icons/oro.png")}
          style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
        ></ImageBackground>
        <ImageBackground
          source={require("../../assets/icons/ruby.png")}
          style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
        ></ImageBackground>
        <ImageBackground
          source={require("../../assets/icons/diamond.png")}
          style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
        ></ImageBackground>
        <ImageBackground
          source={require("../../assets/icons/esmeralda.png")}
          style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
        ></ImageBackground>
      </ScrollView>
      <View
        style={{
          borderBottomColor: "#e3e3e3",
          borderBottomWidth: 1,
          marginBottom: 24,
        }}
      />
      <ListTopRestautant restaurants={restaurants} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}
