import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import IconClass from "./IconClass";
import SeparetorClass from "./SeparetorClass";

const db = firebase.firestore(firebaseApp);

export default function ListRestaurants(props) {
  const { restaurants, handleLoadMore, isLoading, indice } = props;
  const [temas, setTemas] = useState([]);
  //const restaurants = [];
  const navigation = useNavigation();

  useFocusEffect(useCallback(() => {}, []));

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    let temasAux = [];
    restaurants.forEach((modulo) => {
      modulo.categorias.forEach((categoria) => {
        db.collection("categoria_principal")
          .doc(categoria)
          .get()
          .then((response) => {
            response.data().temas.forEach((tema) => {
              db.collection("tema")
                .doc(tema)
                .get()
                .then((response) => {
                  temasAux.push(response.data());

                  setTemas([...temasAux]);
                });
            });
            console.log(temasAux);
          });
      });
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      {size(temas) > 0 ? (
        <View style={{ alignItems: "center" }}>
          <View>
            <SeparetorClass indice={indice} />
          </View>
          <FlatList
            contentContainerStyle={{
              marginTop: 10,
              marginBottom: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
            data={temas}
            numColumns={2}
            renderItem={(tema) => (
              <View style={{}}>
                <View
                  style={{
                    flex: 1,
                    marginBottom: 10,
                    marginTop: 10,
                    marginRight: 40,
                    marginLeft: 40,
                  }}
                >
                  <Restaurant restaurant={tema} navigation={navigation} />
                </View>
              </View>
            )}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            ListEmptyComponent={
              <FooterList
                isLoading={isLoading}
                handleLoadMore={handleLoadMore}
              />
            }
          />
        </View>
      ) : (
        <View style={styles.loadRestaurants}>
          <ActivityIndicator size="large" color="#00a680" />
          <Text>Cargando...</Text>
        </View>
      )}
    </ScrollView>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  //const { id, images, name, address, description } = restaurant.item;
  const { id, nombre } = restaurant.item;
  //const imageRestaurant = images[0];
  const number = Math.floor(Math.random() * (9 + 1));

  let index = restaurant.index;
  const goRestaurant = () => {
    navigation.navigate("clase");
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={{ marginBottom: 20 }}>
        <IconClass />
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <View style={styles.loadRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestaurants}>
        <Text>No quedan restaurantes por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  imageRestaurant: {
    height: 80,
    width: 80,
  },
  restaurantName: {
    fontWeight: "bold",
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
