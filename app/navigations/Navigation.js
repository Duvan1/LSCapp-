import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./MainTab";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
// firebase
import firebase from "firebase";
import "firebase/firestore";
import { firebaseApp } from "../utils/firebase";
import { FireSQL } from "firesql";

// stacks
import AccountStack from "./AccountStack";
import LogrosUsuario from "../screens/Account/LogrosUsuario";
import Clase from "../screens/Restaurants/Clase";

const db = firebase.firestore(firebaseApp);
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

const Stack = createStackNavigator();

export default function Navigation() {
  const [logged, setLogged] = useState(false);
  const [loadded, setLoadded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLogged(false);
        setLoadded(true);
      } else {
        setLogged(true);
        setLoadded(true);
      }
      let uid = user.uid;
      console.log(user);
      // consulto la información del usuario
      db.collection("info_user")
        .where("id_user", "==", uid)
        .get()
        .then((response) => {
          const arrayResponse = [];
          let idUserAux = null;
          response.forEach((doc) => {
            idUserAux = doc.id;
            arrayResponse.push(doc.data());
          });
          // Verifico si es el primer ingreso
          if (arrayResponse[0].primer_ingreso) {
            // si lo es limpio la colección "mis_temas" por si aun quedan documentos guardados
            // hecho esto ingreso todos los temas como mis temas pero con los puntos coronas y demas en 0
            db.collection("mis_temas")
              .get()
              .then((response) => {
                response.forEach((doc) => {
                  db.collection("mis_temas").doc(doc.id).delete();
                });
              });
            // con la tabla limpia empiezo a ingresas los documentos de tema a mis_temas
            db.collection("tema")
              .get()
              .then((response) => {
                response.forEach((doc) => {
                  let payload = {
                    tema: doc.data(),
                    veces_completado: 0,
                    coronas: 0,
                    completado: false,
                    id_tema: doc.id,
                    id_user: uid,
                    default: true,
                  };
                  db.collection("mis_temas")
                    .add(payload)
                    .then(() => {
                      console.log("se subieron todos los temas");
                    })
                    .catch(() => {
                      console.log("Un error a ocurrido");
                    });
                });
              });
            //--------------------------------ahora debo hacer lo mismo para mis_logros -------------------------/
            db.collection("mis_logros")
              .get()
              .then((response) => {
                response.forEach((doc) => {
                  db.collection("mis_logros").doc(doc.id).delete();
                });
              });
            // con la tabla limpia empiezo a ingresas los documentos de tema a mis_temas
            db.collection("logros")
              .get()
              .then((response) => {
                response.forEach((doc) => {
                  let payload = {
                    logro: doc.data(),
                    nivel: 1,
                    mi_puntaje: 0,
                    id_logro: doc.id,
                    id_user: uid,
                  };
                  db.collection("mis_logros")
                    .add(payload)
                    .then(() => {
                      console.log("se subieron todos los logros");
                    })
                    .catch(() => {
                      console.log("Un error a ocurrido");
                    });
                });
              });
            //--------------------------------ahora debo hacer lo mismo para mis_logros -------------------------/
            db.collection("objetos_comprados")
              .get()
              .then((response) => {
                response.forEach((doc) => {
                  db.collection("objetos_comprados").doc(doc.id).delete();
                });
              });
            // con la tabla limpia empiezo a ingresas los documentos de tema a mis_temas
            db.collection("objetos_tienda")
              .get()
              .then((response) => {
                response.forEach((doc) => {
                  let payload = {
                    objeto_tienda: doc.data(),
                    comprado: false,
                    id_objeto_tienda: doc.id,
                    id_user: uid,
                  };
                  db.collection("objetos_comprados")
                    .add(payload)
                    .then(() => {
                      console.log("se subieron todos los objetos de la tienda");
                    })
                    .catch(() => {
                      console.log("Un error a ocurrido");
                    });
                });
              });
          } else {
            let now = new Date();
            const oneDay = 24 * 60 * 60 * 1000;
            var last_class = new Date(
              arrayResponse[0].ultima_clase.seconds * 1000
            );
            const diffDays = Math.round(Math.abs((now - last_class) / oneDay));

            let objetosAux = [];

            arrayResponse[0].objetos_comprados.map((x) => {
              if (x.nombre.toLowerCase() == "protector") {
                diffDays = 0;
                // actualizo los objetos
                db.collection("objetos_comprados")
                  .where("id_user", "==", arrayResponse[0].id_user)
                  .where("objeto_tienda.nombre", "==", "Protector")
                  .get()
                  .then((res) => {
                    res.forEach((doc) => {
                      doc
                        .collection(objetos_comprados)
                        .doc(doc.id)
                        .update({ comprado: false });
                    });
                  });
              } else {
                objetosAux.push(x);
              }
            });

            if (diffDays > 1) {
              db.collection("info_user")
                .doc(idUserAux)
                .update({
                  dias_racha: 0,
                  objetos_comprados: objetosAux,
                })
                .then(() => alert("Perdiste tu racha :c"));
            } else if (
              arrayResponse[0].dias_racha >= 7 &&
              arrayResponse[0].objetos_comprados.find(
                (x) => x.nombre.toLowerCase() == "todo o nada"
              ) != undefined
            ) {
              db.collection("info_user")
                .doc(idUserAux)
                .update({
                  gemas: arrayResponse[0] * 2,
                })
                .then(() => {
                  db.collection("objetos_comprados")
                    .where("id_user", "==", arrayResponse[0].id_user)
                    .where("objeto_tienda.nombre", "==", "Todo o nada")
                    .get()
                    .then((res) => {
                      res.forEach((doc) => {
                        doc
                          .collection(objetos_comprados)
                          .doc(doc.id)
                          .update({ comprado: false });
                      });
                    });
                  alert(
                    "Todo o nada! ganaste tu apuesta toma tu premio: " +
                      arrayResponse[0] * 2 +
                      " gemas."
                  );
                });
            }
          }
        });
    });
  }, []);

  // Por si aun no carga hijo
  if (!loadded) {
    return <AppLoading />;
  }

  // por sino ha iniciado sesión hijo
  if (!logged) {
    return (
      <NavigationContainer>
        <AccountStack />
      </NavigationContainer>
    );
  }

  // Por si ya inicio sesión hijo
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="logros"
          component={LogrosUsuario}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="clase"
          component={Clase}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
