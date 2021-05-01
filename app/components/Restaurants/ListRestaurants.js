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
import ModalEjercicio from "../ModalEjercicio";
import Restaurant from "../../screens/Restaurants/Restaurant";

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
                  let aux = response.data();
                  aux.uid = response.id;
                  db.collection("mis_temas")
                    .where("id_tema", "==", tema)
                    .get()
                    .then((res) => {
                      res.forEach((doc) => {
                        aux.uid_mis_temas = doc.id;
                        aux.completado = doc.data().completado;
                        aux.coronas = doc.data().coronas;
                        aux.veces_completado = doc.data().veces_completado;
                      });
                      console.log(
                        "************************************   ",
                        aux
                      );
                      temasAux.push(aux);
                      setTemas([...temasAux]);
                    });
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
                  <Tema restaurant={tema} navigation={navigation} />
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

function Tema(props) {
  const { restaurant, navigation } = props;
  const [renderCoponent, setRenderCoponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(
    "------------------------------->>>>>>>>>>>>>>>>>>>>>   ",
    restaurant
  );
  //const { id, images, name, address, description } = restaurant.item;
  const {
    senia,
    nombre,
    completado,
    veces_completado,
    coronas,
    uid_mis_temas,
  } = restaurant.item;
  let nombreIcon = nombre.replace(" ", "-").toLowerCase();
  //const imageRestaurant = images[0];
  const number = Math.floor(Math.random() * (9 + 1));

  let index = restaurant.index;
  const goRestaurant = () => {
    /*
    navigation.navigate("clase", {
      senia,
      nombre,
    });
    */
    setRenderCoponent(
      <Restaurant
        tema={restaurant}
        navigation={navigation}
        nombre={nombre}
        senia={senia}
        setShowModal={setShowModal}
      />
    );
    setShowModal(true);
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={{ marginBottom: 20 }}>
        <IconClass
          nombre={nombre}
          nombreIcon={nombreIcon}
          completado={completado}
          coronas={coronas}
          veces_completado={veces_completado}
        />
      </View>
      {renderCoponent && (
        <ModalEjercicio isVisible={showModal} setVisible={setShowModal}>
          {renderCoponent}
        </ModalEjercicio>
      )}
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
