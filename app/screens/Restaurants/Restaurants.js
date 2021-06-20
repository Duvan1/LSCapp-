import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native";
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
  const [modulos, setModulos] = useState([]);
  const [uidInfoUser, setuidInfoUser] = useState("");
  const [infoErrorReload, setinfoErrorReload] = useState(0);
  const limitRestaurants = 6;
  const [reloadInfoUser, setreloadInfoUser] = useState(0);
  const [mascota_feliz, setmascota_feliz] = useState(
    "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
  );
  const [mascota_triste, setmascota_triste] = useState(
    "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, [reloadInfoUser]);

  useFocusEffect(
    useCallback(() => {
      const uid = firebase.auth().currentUser.uid;
      // consulto la información del usuario
      db.collection("info_user")
        .where("id_user", "==", uid)
        .get()
        .then((response) => {
          if (response.docs.length === 0) {
            //alert("no viene usuario");
            setinfoErrorReload(Math.random());
            return;
          } else {
            const arrayResponse = [];
            response.forEach((doc) => {
              setuidInfoUser(doc.id);
              arrayResponse.push(doc.data());
            });
            setInfoUser(arrayResponse);

            if (arrayResponse[0].traje == "normal") {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
              );
            } else if (arrayResponse[0].traje == "formal") {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_traje.png?alt=media&token=3c6d98dd-f566-4758-bc2c-113ef567b8ba"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_traje_triste.png?alt=media&token=77aa098c-a1d3-41ee-98cb-b95b0cfdb440"
              );
            } else if (arrayResponse[0].traje == "playa") {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_playa_feliz.png?alt=media&token=ce7ab628-4296-408a-b1e2-97ada844051b"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_playa_triste.png?alt=media&token=20cdecaf-c092-4ba9-a99b-42ff1ed47fb7"
              );
            } else if (arrayResponse[0].traje == "robot") {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota-robot-feliz.png?alt=media&token=2c8a699b-f3e7-42ab-936b-d991b1e853e9"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota-robot-triste.png?alt=media&token=81913344-efef-4ec6-82ff-10cfcb4aecca"
              );
            } else {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
              );
            }

            db.collection("modulo")
              .orderBy("nombre")
              .get()
              .then((response) => {
                //alert(response.docs.length === 0);
                let i = 0;
                response.forEach((doc) => {
                  if (infoUser[0] == undefined) {
                    setinfoErrorReload(Math.random());
                    return;
                  }
                  let modulos_unlock = infoUser[0].modulos_desbloqueados - 1;
                  const modulo = doc.data();
                  modulo.id = doc.id;
                  if (i <= modulos_unlock) {
                    resultModulos.push(modulo);
                  }
                  i += 1;
                });
                setModulos(resultModulos);
                console.log(modulos);
              });
          }
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
      // proceso para cargar los modulos
      const resultModulos = [];
    }, [infoErrorReload, reloadInfoUser])
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
      {/* Header con la información del usuario */}
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
        {/* Coronas */}
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
        {/* Días de racha */}
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
        {/* esmeraldas */}
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
      {/* body del inicio */}
      <ScrollView style={styles.viewBody}>
        {modulos.map((modulo, i) => (
          <ListRestaurants
            uidInfoUser={uidInfoUser}
            restaurants={modulos}
            setreloadInfoUser={setreloadInfoUser}
            handleLoadMore={handleLoadMore}
            isLoading={isLoading}
            indice={i}
            modulo={modulo}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() =>
          alert(
            "Hola! Soy Coco tu guía\n en esta sección encontraras todos los retos, y parte de tu progreso, completa todas las lecciones y obtén grandiosos items."
          )
        }
        style={{
          zIndex: 1,
          alignSelf: "flex-end",
          position: "absolute",
          bottom: 30,
          right: 30,
          height: 40,
          justifyContent: "center",
          alignContent: "center",
          width: 80,
        }}
      >
        <ImageBackground
          source={{ uri: mascota_feliz }}
          style={styles.btnContainer}
        ></ImageBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#fff",
    width: 80,
    height: 70,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
