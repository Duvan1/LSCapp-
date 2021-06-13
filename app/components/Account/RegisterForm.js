import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
import { size, isEmpty } from "lodash";
//import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
//////// firebase
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepite, setShowPasswordRepite] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();
  const [flagUserInfo, setflagUserInfo] = useState(0);
  const [flagTemas, setflagTemas] = useState(0);
  const [flagLogros, setflagLogros] = useState(0);
  const [flagTienda, setflagTienda] = useState(0);
  const [loading, setloading] = useState(false);

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      //console.log("no");
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(formData.email)) {
      //console.log("email invalido");
      toastRef.current.show("email invalido.");
    } else if (formData.password !== formData.repeatPassword) {
      //console.log("contraseñas no coinciden");
      toastRef.current.show("contraseñas no coinciden.");
    } else if (size(formData.password) < 6) {
      //console.log("contraseña muy corta");
      toastRef.current.show("contraseña muy corta, minimo 6 caracteres.");
    } else {
      setloading(true);
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((user) => {
          console.log("\n\n\n\n\n\n", user.user.uid);
          let uid = user.user.uid;
          // si la respuesta es 0 quiere decir que no tiene
          db.collection("info_user")
            .where("id_user", "==", uid)
            .get()
            .then((response) => {
              if (response.docs.length === 0) {
                //agrego la información de usuario correspondiente
                const payload = {
                  EXP: 0,
                  coronas: 0,
                  dias_racha: 0,
                  division: "bronce",
                  gemas: 0,
                  id_user: uid,
                  primer_ingreso: true,
                  ultima_clase: null,
                  vidas: 5,
                  modulos_desbloqueados: 1,
                  displayName: user.user.email,
                  email: user.user.email,
                  photoURL:
                    "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/avatar%2Fmascota_saludo.png?alt=media&token=b75dd4dd-b269-40e6-a265-607ffa09ecd5",
                  objetos_comprados: [],
                };
                if (flagUserInfo < 1) {
                  db.collection("info_user")
                    .add(payload)
                    .then(() => {
                      setflagUserInfo(flagUserInfo + 1);
                      // ingresas los documentos de tema a mis_temas
                      if (flagTemas < 1) {
                        db.collection("tema")
                          .get()
                          .then((response) => {
                            let promesas = [];
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
                              promesas.push(
                                db.collection("mis_temas").add(payload)
                              );
                            });
                            Promise.all(promesas).then(
                              () => {
                                setflagTemas(flagTemas + 1);
                                console.log("se crearon todos lo temas");
                              },
                              (err) => {
                                console.log("algo salio mal: ", err);
                              }
                            );
                          });
                      } else {
                        console.log(
                          "estas intentando crear mas de los temas correspondientes"
                        );
                      }
                      //--------------------------------ahora debo hacer lo mismo para mis_logros -------------------------/

                      if (flagLogros < 1) {
                        db.collection("logros")
                          .get()
                          .then((response) => {
                            let promesas = [];
                            response.forEach((doc) => {
                              let payload = {
                                logro: doc.data(),
                                nivel: 1,
                                mi_puntaje: 0,
                                id_logro: doc.id,
                                id_user: uid,
                              };
                              promesas.push(
                                db.collection("mis_logros").add(payload)
                              );
                            });
                            Promise.all(promesas).then(
                              () => {
                                setflagLogros(flagLogros + 1);
                                console.log("se crearon todos lo temas");
                              },
                              (err) => {
                                console.log("algo salio mal: ", err);
                              }
                            );
                          });
                      } else {
                        console.log(
                          "estas intentando crear mas de los logros correspondientes"
                        );
                      }
                      //--------------------------------ahora debo hacer lo mismo para mis_logros -------------------------/
                      if (flagTienda < 1) {
                        db.collection("objetos_tienda")
                          .get()
                          .then((response) => {
                            let promesas = [];
                            response.forEach((doc) => {
                              let payload = {
                                objeto_tienda: doc.data(),
                                comprado: false,
                                id_objeto_tienda: doc.id,
                                id_user: uid,
                              };
                              promesas.push(
                                db.collection("objetos_comprados").add(payload)
                              );
                            });

                            Promise.all(promesas).then(
                              () => {
                                setflagTienda(flagTienda + 1);
                                console.log("se crearon todos lo temas");
                              },
                              (err) => {
                                console.log("algo salio mal: ", err);
                              }
                            );
                          });
                      } else {
                        console.log(
                          "intentas crear mas objetos de tienda de los correspondientes"
                        );
                      }
                    })
                    .catch(() => {
                      toastRef.current.show("Un error a ocurrido");
                      setIsLoading(false);
                    });
                } else {
                  console.log(
                    "estas intentando crear el usuario mas de una vez"
                  );
                }
              }
            });
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
          toastRef.current.show("Error al crear el usuario.");
        });
    }
  };

  const onChange = (e, type) => {
    // con "...formData" le estoy diciendo que mantenga las propiedades
    // anteriores y con "[type]: e.nativeEvent.text" actualizao ese componente
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.input}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        password={true}
        secureTextEntry={showPassword ? false : true}
        placeholder="Contraseña"
        inputContainerStyle={styles.input}
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        password={true}
        secureTextEntry={showPasswordRepite ? false : true}
        inputContainerStyle={styles.input}
        placeholder="repetir contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPasswordRepite ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPasswordRepite(!showPasswordRepite)}
          />
        }
      />
      <Button
        buttonStyle={styles.btnRegister}
        title="Unirse"
        titleStyle={{ fontWeight: "bold", fontSize: 20 }}
        containerStyle={styles.btnContainerRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    borderColor: "#E5E5E5",
    borderWidth: 2,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputForm: {
    width: "100%",
    marginTop: -5,
  },
  btnContainerRegister: {
    width: "95%",
    borderColor: "#62B2EF",
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomEndRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  btnRegister: {
    backgroundColor: "#5fbdff",
    borderRadius: 10,
    padding: 15,
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
