import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card, Image, Icon, Avatar, Rating } from "react-native-elements";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import { FireSQL } from "firesql";
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

const db = firebase.firestore(firebaseApp);

export default function ListTopRestautant(props) {
  const { top, navigation } = props;
  const [restaurantLenght, setRestaurantLenght] = useState(0);

  useEffect(() => {
    let uid = firebase.default.auth().currentUser.uid;
    if (top[0] != undefined) {
      if (top[0].id_user == uid) {
        db.collection("mis_logros")
          .where("logro.nombre", "==", "Primer lugar")
          .get()
          .then((res) => {
            res.forEach((doc) => {
              db.collection("mis_logros")
                .doc(doc.id)
                .update({
                  mi_puntaje: 1,
                })
                .then((response) => {
                  console.log(response);
                });
            });
          });
      }
    }

    setRestaurantLenght(top.length);
  }, [top]);

  console.log(top.length);
  return (
    <FlatList
      data={top}
      renderItem={(item) => (
        <Restaurant
          item={item}
          navigation={navigation}
          restaurantLenght={restaurantLenght}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

function Restaurant(props) {
  const { item, navigation, restaurantLenght } = props;
  const { EXP, id_user, displayName, photoURL } = item.item;
  const [iconColor, setIconColor] = useState("#000");

  console.log(displayName);
  console.log(photoURL);

  return (
    <TouchableOpacity>
      <Card containerStyle={styles.contairnerCard}>
        {item.index <= 2 ? (
          <Icon
            type="material-community"
            name="arrow-up-bold-box"
            color="#5fbdff"
            size={40}
            containerStyle={styles.containerIcon}
          />
        ) : item.index + 1 >= restaurantLenght - 1 ? (
          <Icon
            type="material-community"
            name="arrow-down-bold-box"
            color="red"
            size={40}
            containerStyle={styles.containerIcon}
          />
        ) : null}
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 0,
            paddingRight: 0,
            borderTopColor: "#e5e5e5",
            position: "relative",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {item.index + 1}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginLeft: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <Avatar
              containerStyle={{ borderRadius: 80, marginRight: 10 }}
              source={
                photoURL
                  ? { uri: photoURL }
                  : require("../../../assets/img/no-image.png")
              }
            />
            <Text style={styles.title}>{displayName}</Text>
          </View>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "#a2a2a2" }}>
            {EXP} EXP
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contairnerCard: {
    borderTopWidth: 2,
    borderTopColor: "#e5e5e5",
    borderWidth: 0,
    marginBottom: -17,
    paddingTop: 0,
    paddingBottom: 0,
  },
  containerIcon: {
    position: "absolute",
    top: -30,
    left: -30,
    zIndex: 1,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  titleImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  description: {
    color: "grey",
    marginTop: 10,
    textAlign: "justify",
  },
});
