import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { Image } from "react-native-elements";
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";
import Toast from "react-native-easy-toast";
import ListTopRestautant from "../components/Ranking/ListTopRestautant";
import { FireSQL } from "firesql";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [division, setdivision] = useState("bronce");
  const [top, settop] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    const user = firebase.default.auth().currentUser;

    db.collection("info_user")
      .where("id_user", "==", user.uid)
      .get()
      .then((response) => {
        let infoUser = [];
        response.forEach((doc) => {
          infoUser.push(doc.data());
          //setlogros(listLogros);
        });
        setdivision(infoUser[0].division);
        console.log(division);

        fireSQL
          .query(`SELECT * FROM info_user WHERE division = '${division}' `)
          .then((response) => {
            console.log(response);
            settop(response);
          });
      });

    db.collection("restaurants")
      .orderBy("rating", "desc")

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
  }, [division]);

  const getIcon = (nombre) => {
    switch (nombre) {
      case "ruby":
        return require("../../assets/icons/ruby.png");
        break;
      case "bronce":
        return require("../../assets/icons/bronce.png");
        break;
      case "diamante":
        return require("../../assets/icons/diamond.png");
        break;
      case "plata":
        return require("../../assets/icons/plata.png");
        break;
      case "oro":
        return require("../../assets/icons/oro.png");
        break;
      case "esmeralda":
        return require("../../assets/icons/esmeralda.png");
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={{ marginBottom: 24 }}>
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
            {/* string.charAt(0).toUpperCase() + string.slice(1) */}
            LIGA {division.toUpperCase()}
          </Text>
          <ImageBackground
            source={getIcon(division)}
            style={{
              height: 30,
              width: 30,
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
      <ListTopRestautant top={top} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}
