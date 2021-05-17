import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
//////// firebase
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
//////// firebase
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

const db = firebase.firestore(firebaseApp);

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("email invalido.");
    } else {
      setloading(true);
      // Verifico si el usuario y contraseña son correctos
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          // obtengo el uid del usuario que acaba de iniciar sesion
          const uid = firebase.auth().currentUser.uid;
          console.log("///////////////////////  ", uid);
          // consulta en la base de datos si dicho usuario ya tiene información de perfil
          db.collection("info_user")
            .where("id_user", "==", uid)
            .get()
            .then((response) => {
              // si la respuesta es 0 quiere decir que no tiene
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
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                };
                db.collection("info_user")
                  .add(payload)
                  .then(() => {})
                  .catch(() => {
                    toastRef.current.show("Un error a ocurrido");
                    setIsLoading(false);
                  });
              } else {
                response.forEach((doc) => {
                  db.collection("info_user")
                    .doc(doc.id)
                    .get()
                    .then((info_user) => {
                      let now = new Date();
                      const oneDay = 24 * 60 * 60 * 1000;
                      var last_class = new Date(
                        info_user.data().ultima_clase.seconds * 1000
                      );
                      const diffDays = Math.round(
                        Math.abs((now - last_class) / oneDay)
                      );

                      if (diffDays > 1) {
                        db.collection("info_user")
                          .doc(doc.id)
                          .update({ dias_racha: 0 })
                          .then(() => alert("Perdiste tu racha :c"));
                      }
                    });
                });
                /** aca voy agregar el primer ingreso en false y hago otras validaciones mas */
              }
              setloading(false);
              navigation.navigate("account");
            });
          setloading(false);
          navigation.navigate("account");
          /*
          firebase.auth().onAuthStateChanged((user) => {
            let uid = user.uid;
            db.collection("info_user")
              .where("id_user", "==", uid)
              .get()
              .then((response) => {
                if (response.docs.length === 0) {

                }
                setloading(false);
                navigation.navigate("account");
              });
          });
          */
        })
        .catch(() => {
          setloading(false);
          toastRef.current.show("Datos incorrectos.");
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
        placeholder="Correo Electronico"
        labelStyle={{ fontWeight: "bold", fontSize: 10 }}
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
        placeholder="Contraseña"
        password={true}
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.input}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="INGRESAR"
        titleStyle={{ fontWeight: "bold", fontSize: 20 }}
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando Sesion" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
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
  },
  btnContainerLogin: {
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
  btnLogin: {
    backgroundColor: "#5fbdff",
    borderRadius: 10,
    padding: 15,
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
