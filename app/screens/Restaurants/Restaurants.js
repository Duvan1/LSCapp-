import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
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
  const [modulos, setModulos] = useState([]);
  const [uidInfoUser, setuidInfoUser] = useState("");
  const [infoErrorReload, setinfoErrorReload] = useState(0);
  const limitRestaurants = 6;
  const [reloadInfoUser, setreloadInfoUser] = useState(0);

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
