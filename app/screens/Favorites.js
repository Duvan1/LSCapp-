import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DataTable } from "react-native-paper";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";
import Loading from "../components/Loading";
import Toast from "react-native-easy-toast";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
  const [restaurant, setRestaurant] = useState(null);
  const [userLogged, setuserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const toastRef = useRef();

  React.useLayoutEffect(() => {
    navigation.dangerouslyGetParent().setOptions({
      //tabBarVisible: false,
      //headerVisible: false,
      //headerShown: false,
    });
  }, []);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setuserLogged(true) : setuserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = firebase.auth().currentUser.uid;

        db.collection("favorites")
          .where("idUser", "==", idUser)
          .get()
          .then((response) => {
            const idRestaurantsArray = [];
            response.forEach((doc) => {
              idRestaurantsArray.push(doc.data().idRestaurant);
            });
            getDataRestaurant(idRestaurantsArray).then((response) => {
              const restaurants = [];
              response.forEach((doc) => {
                const restaurant = doc.data();
                restaurant.id = doc.id;
                restaurants.push(restaurant);
              });
              setRestaurant(restaurants);
            });
          });
      }
      setReloadData(false);
    }, [userLogged, reloadData])
  );

  const getDataRestaurant = (idRestaurantsArray) => {
    const arrayRestaurant = [];
    idRestaurantsArray.forEach((idRestaurant) => {
      const result = db.collection("restaurants").doc(idRestaurant).get();
      arrayRestaurant.push(result);
    });
    return Promise.all(arrayRestaurant);
  };

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (restaurant?.length === 0) {
    return <NotFoundRestaurant />;
  }

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 0,
          width: "100%",
          zIndex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderBottomColor: "#e5e5e5",
          borderBottomWidth: 2,
        }}
      >
        <View
          style={{
            zIndex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 17,
              fontWeight: "700",
              marginRight: 10,
            }}
          >
            Mi Tienda
          </Text>
          <ImageBackground
            style={{ width: 20, height: 20 }}
            source={require("../../assets/icons/esmeralda.png")}
          />
          <Text
            style={{
              color: "black",
              fontSize: 17,
              fontWeight: "700",
              marginLeft: 10,
            }}
          >
            10
          </Text>
        </View>
      </View>
      <ScrollView>
        {restaurant ? (
          <FlatList
            data={restaurant}
            renderItem={(restaurant) => (
              <Restaurant
                restaurant={restaurant}
                keyExtractor={(item, index) => index.toString()}
                setIsLoading={setIsLoading}
                toastRef={toastRef}
                setReloadData={setReloadData}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <View style={styles.loaderRestaurant}>
            <ActivityIndicator size="large" />
            <Text style={{ alignItems: "center" }}>Cargando...</Text>
          </View>
        )}
        <Toast position="center" opacity={0.9} ref={toastRef} />
        <Loading text="elimiando " isVisible={isLoading} />
      </ScrollView>
    </>
  );
}

function NotFoundRestaurant(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        No Tienes restaurantes en favoritos
      </Text>
    </View>
  );
}

function UserNoLogged(props) {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Necesitas estar loggeado para ver esta sección
      </Text>
      <Button
        title="Ir a login"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#00a680" }}
        onPress={() => navigation.navigate("account", { screen: "login" })}
      />
    </View>
  );
}

function Restaurant(props) {
  const {
    restaurant,
    setIsLoading,
    toastRef,
    setReloadData,
    navigation,
  } = props;
  const { id, name, images } = restaurant.item;

  const confirmRemoveFavorites = () => {
    Alert.alert(
      "Eliminar Restaurante de favoritos",
      "¿Lo quieres eliminar?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Eliminar", onPress: removeFavorites },
      ],
      { cancelable: false }
    );
  };

  const removeFavorites = (params) => {
    setIsLoading(true);
    db.collection("favorites")
      .where("idRestaurant", "==", id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorites = doc.id;
          db.collection("favorites")
            .doc(idFavorites)
            .delete()
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show("Eliminado");
            })
            .catch(() => {
              setIsLoading(false);
              toastRef.current.show("error");
            });
        });
      });
  };

  return (
    <View style={{ padding: 0, marginRight: 10, marginLeft: 10 }}>
      <View style={{ position: "relative" }}>
        <Text
          style={{
            marginTop: 40,
            color: "#3c3c3c",
            fontSize: 24,
            lineHeight: 26,
            marginBottom: 25,
          }}
        >
          Tonicos
        </Text>
        <View style={{ margin: 0, padding: 0 }}>
          <View
            style={{
              position: "relative",
              paddingTop: 20,
              paddingRight: 0,
              paddingBottom: 20,
              paddingLeft: 110,
              borderTopColor: "#e5e5e5",
              borderTopWidth: 2,
            }}
          >
            <ImageBackground
              source={require("../../assets/icons/diamond.png")}
              style={{
                width: 100,
                height: 100,
                float: "left",
                marginTop: -10,
                marginRight: 0,
                marginLeft: -110,
                marginBottom: -20,
              }}
            />
            <Text
              style={{
                marginTop: -60,
                marginRight: 0,
                marginBottom: 10,
                marginLeft: 0,
                fontSize: 19,
                fontWeight: "700",
              }}
            >
              Racha
            </Text>
            <Text
              style={{
                color: "#777",
                width: "auto",
                marginTop: 0,
                marginRight: 0,
                marginBottom: 18,
                marginLeft: 0,
                fontSize: 16,
              }}
            >
              Te permite mantener tu racha cuando no estudias por un día.
            </Text>
            <TouchableOpacity
              style={{
                float: "right",
                right: 0,
                minWidth: 100,
                position: "absolute",
                top: 120,
                backgroundColor: "#fff",
                flexDirection: "row",
                padding: 8,
                borderColor: "#00B100",
                borderTopWidth: 0.5,
                borderLeftWidth: 1,
                borderBottomWidth: 3,
                borderRightWidth: 3,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#00B100",
                  fontSize: 15,
                  fontWeight: "bold",
                  lineHeight: 20,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                Llevatelo por:
              </Text>
              <ImageBackground
                style={{ width: 40, height: 40 }}
                source={require("../../assets/icons/esmeralda.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loaderRestaurant: {
    marginTop: 10,
    marginBottom: 10,
  },
  restaurant: {
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: -30,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
  },
  favorites: {
    marginTop: -35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
  },
});
