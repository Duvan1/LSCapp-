import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
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
    <View style={styles.viewBody}>
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
    </View>
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
    <View style={styles.restaurant}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("restaurants", {
            screen: "restaurant",
            params: { id },
          })
        }
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            images[0]
              ? { uri: images[0] }
              : require("../../assets/img/no-image.png")
          }
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorites}
            onPress={confirmRemoveFavorites}
          />
        </View>
      </TouchableOpacity>
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
