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
  const [objeto, setObjetos] = useState(null);
  const [userLogged, setuserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idusuario, setidusuario] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [gemas, setgemas] = useState(0);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setuserLogged(true) : setuserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = firebase.auth().currentUser.uid;
        setidusuario(idUser);

        db.collection("info_user")
          .where("id_user", "==", idUser)
          .get()
          .then((response) => {
            const array = [];
            response.forEach((doc) => {
              array.push(doc.data().gemas);
            });
            setgemas(array);
          });

        db.collection("objetos_comprados")
          .where("id_user", "==", idUser)
          //.orderBy("categoria", "asc")
          .get()
          .then((response) => {
            const array = [];
            response.forEach((doc) => {
              array.push(doc.data());
            });
            setObjetos(array);
          });
        //console.log(objeto);
      }
      setReloadData(false);
    }, [userLogged, reloadData])
  );

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
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
            {gemas[0]}
          </Text>
        </View>
      </View>
      <ScrollView>
        {objeto ? (
          <FlatList
            data={objeto}
            renderItem={(objeto) => (
              <Objeto
                objeto={objeto}
                idusuario={idusuario}
                gemas={gemas}
                keyExtractor={(item, index) => index.toString()}
                setIsLoading={setIsLoading}
                toastRef={toastRef}
                setReloadData={setReloadData}
                navigation={navigation}
              />
            )}
            contentContainerStyle={{ marginBottom: 20 }}
          />
        ) : (
          <View style={styles.loaderRestaurant}>
            <ActivityIndicator size="large" />
            <Text style={{ alignItems: "center" }}>Cargando...</Text>
          </View>
        )}
        <Toast position="center" opacity={0.9} ref={toastRef} />
        <Loading text="Cargando " isVisible={isLoading} />
      </ScrollView>
    </>
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

function Objeto(props) {
  const {
    objeto,
    setIsLoading,
    toastRef,
    setReloadData,
    navigation,
    idusuario,
    gemas,
  } = props;
  const { nombre, descripcion, fecha, precio, categoria } =
    objeto.item.objeto_tienda;
  //setIsLoading(false);
  const comprar = (id) => {
    setIsLoading(true);
    if (gemas >= precio) {
      db.collection("objetos_comprados")
        .where("id_objeto_tienda", "==", id)
        .get()
        .then((response) => {
          const array = [];
          let id_comprado = "";
          response.forEach((doc) => {
            id_comprado = doc.id;
            array.push(doc.data());
          });
          array[0].comprado = true;
          console.log(array[0]);
          db.collection("objetos_comprados")
            .doc(id_comprado)
            .update(array[0])
            .then((res) => {
              db.collection("info_user")
                .where("id_user", "==", idusuario)

                .get()
                .then((res) => {
                  let id_info_user = null;
                  let gemasAux = null;
                  res.forEach((doc) => {
                    id_info_user = doc.id;
                    gemasAux = doc.data().gemas;
                  });
                  db.collection("info_user")
                    .doc(id_info_user)
                    .update({
                      gemas: gemasAux - precio,
                      objetos_comprados: [{ nombre: nombre, fecha: fecha }],
                    })
                    .then(() => {
                      setIsLoading(false);
                      setReloadData(true);
                      toastRef.current.show("Objeto comprado :D");
                    });
                });
            });
        });
    } else {
      setIsLoading(false);
      alert("No tienes suficientes gemas para comprar este objeto :c");
    }
  };

  return (
    <View
      style={{
        padding: 0,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: objeto.index == 4 ? 50 : 10,
      }}
    >
      <View>
        <Text
          style={{
            marginTop: 40,
            color: "#3c3c3c",
            fontSize: 24,
            lineHeight: 26,
            marginBottom: 25,
          }}
        >
          {categoria.toUpperCase()}
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
              {nombre.replace(/^\w/, (c) => c.toUpperCase())}
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
              {descripcion.replace(/^\w/, (c) => c.toUpperCase())}
            </Text>
            {!objeto.item.comprado ? (
              <TouchableOpacity
                onPress={() => comprar(objeto.item.id_objeto_tienda)}
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
                  Llevatelo por: {precio}
                </Text>
                <ImageBackground
                  style={{ width: 40, height: 40 }}
                  source={require("../../assets/icons/esmeralda.png")}
                />
              </TouchableOpacity>
            ) : (
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
                Objeto comprado
              </Text>
            )}
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
