import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
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
  const [mascota_feliz, setmascota_feliz] = useState(
    "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
  );
  const [mascota_triste, setmascota_triste] = useState(
    "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
  );

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
            let arrayResponse = [];
            response.forEach((doc) => {
              array.push(doc.data().gemas);
              arrayResponse.push(doc.data());
            });
            setgemas(array);
            if (arrayResponse[0].traje == "normal") {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
              );
            } else if (arrayResponse[0].traje == "Traje esmoquin") {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_traje.png?alt=media&token=3c6d98dd-f566-4758-bc2c-113ef567b8ba"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_traje_triste.png?alt=media&token=77aa098c-a1d3-41ee-98cb-b95b0cfdb440"
              );
            } else if (arrayResponse[0].traje == "Traje de playa") {
              setmascota_feliz(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_playa_feliz.png?alt=media&token=ce7ab628-4296-408a-b1e2-97ada844051b"
              );

              setmascota_triste(
                "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_playa_triste.png?alt=media&token=20cdecaf-c092-4ba9-a99b-42ff1ed47fb7"
              );
            } else if (arrayResponse[0].traje == "Traje robot para Coco.") {
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
      <TouchableOpacity
        onPress={() =>
          alert(
            "Hola! Soy Coco tu guía\n Aquí tienes la tienda de LSCapp completa tus lecciones y obtendras esmeraldas para comprar los objectos que aquí ves."
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

  const getImg = (nombre) => {
    let name = nombre.replace(/^\w/, (c) => c.toUpperCase());
    if (name == "Traje robot para Coco.") {
      return "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota-robot.png?alt=media&token=31db858e-43dd-4ada-98b1-a4eb4f84efc4";
    } else if (name == "Traje esmoquin") {
      return "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota-traje.png?alt=media&token=4a929d8a-f064-4a4f-a762-69c2ac9fb5e1";
    } else if (name == "Todo o nada") {
      return "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fapuesta.png?alt=media&token=447f1614-1a6f-4a2b-b5fd-203a52a11729";
    } else if (name == "Traje de playa") {
      return "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_playa.png?alt=media&token=d84ce01e-7722-4df6-a086-0624e317a99e";
    } else if (name == "Protector") {
      return "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fsecure-shield.png?alt=media&token=479088fd-4021-4943-91fd-7688966d42c1";
    } else {
      return "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fdiamond.png?alt=media&token=3cfc1ec5-1d64-4ffb-a46a-1d0496d37f21";
    }
  };

  const comprar = (id) => {
    console.log(id);

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
                  if (categoria == "traje") {
                    db.collection("info_user")
                      .doc(id_info_user)
                      .update({
                        gemas: gemasAux - precio,
                        objetos_comprados: [{ nombre: nombre, fecha: fecha }],
                        traje: nombre,
                      })
                      .then(() => {
                        setIsLoading(false);
                        setReloadData(true);
                        toastRef.current.show("Objeto comprado :D");
                      });
                  } else {
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
                  }
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
              source={{ uri: getImg(nombre) }}
              style={{
                width: 100,
                height: 90,
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
                  //position: "absolute",
                  //top: 120,
                  marginBottom: -30,
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
