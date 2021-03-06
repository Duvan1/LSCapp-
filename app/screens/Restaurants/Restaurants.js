import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [infoUser, setInfoUser] = useState([]);
  const limitRestaurants = 6;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const uid = firebase.auth().currentUser.uid;
      // consulto la información del usuario
      db.collection("info_user")
        .where("id_user", "==", uid)
        .get()
        .then((response) => {
          const arrayResponse = [];
          response.forEach((doc) => {
            arrayResponse.push(doc.data());
          });
          setInfoUser(arrayResponse);
        });

      db.collection("restaurants")
        .get()
        .then((snap) => {
          setTotalRestaurants(snap.size);
        });

      const resultRestaurants = [];

      db.collection("restaurants")
        .orderBy("creatAt", "desc")
        //.limit(limitRestaurants)
        .get()
        .then((response) => {
          setStartRestaurants(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            resultRestaurants.push(restaurant);
          });
          setRestaurants(resultRestaurants);
        });

      db.collection("tema")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            console.log(doc.data());
          });
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    db.collection("restaurants")
      .orderBy("creatAt", "desc")
      .startAfter(startRestaurants.data().creatAt)
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartRestaurants(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });

        setRestaurants([...restaurants, ...resultRestaurants]);
      });
  };

  return (
    <>
      <View
        style={{
          marginTop: 0,
          height: 80,
          backgroundColor: "#fff",
          borderBottomWidth: 2,
          borderBottomColor: "#e5e5e5",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <ImageBackground
            style={{ width: 35, height: 30 }}
            source={require("../../../assets/icons/crown1.png")}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 5,
              color: "#FF9F00",
            }}
          >
            {infoUser[0] ? infoUser[0].coronas : null}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <ImageBackground
            style={{ width: 35, height: 30 }}
            source={require("../../../assets/icons/on-fire.png")}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 5,
              color: "#F27215",
            }}
          >
            {infoUser[0] ? infoUser[0].dias_racha : null}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            style={{ width: 35, height: 30 }}
            source={require("../../../assets/icons/esmeralda.png")}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 5,
              color: "#00B100",
            }}
          >
            {infoUser[0] ? infoUser[0].gemas : null}
          </Text>
        </View>
      </View>
      <View style={styles.viewBody}>
        <ListRestaurants
          restaurants={restaurants}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
        {user && (
          <Icon
            reverse
            containerStyle={styles.btnContainer}
            type="material-community"
            name="plus"
            color="#00a680"
            onPress={() => navigation.navigate("add-restaurant")}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
