import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { update } from "lodash";
import { firebaseApp } from "../../utils/firebase";

const db = firebase.firestore(firebaseApp);

export default function InfoUser(props) {
  const {
    userInfo, //: { photoURL, displayName, email },
    uid,
    toastRef,
    setloadingText,
    setloading,
  } = props;
  let logros = new Map();

  useEffect(() => {
    console.log(
      "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n----------------------->",
      userInfo
    );
    db.collection("mis_logros")
      //.where("logro.nombre", "==", "Noble")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          if (doc.id != undefined) {
            logros.set(doc.data().logro.nombre, doc.id);
          }
        });
        for (let clavevalor of logros.entries()) {
          console.log(clavevalor);
        }
      });
  }, []);

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermisionCamera =
      resultPermission.permissions.cameraRoll.status;
    if (resultPermisionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la gleria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show("Has cerrado la seleccion de imagenes");
      } else {
        uploadImages(result.uri)
          .then(() => {
            updatePhotoURL();
          })
          .catch(() => {
            toastRef.current.show("Ha ocurrido un error");
          });
      }
    }
  };

  const uploadImages = async (uri) => {
    setloadingText("Actualizando avatar");
    setloading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.default.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoURL = () => {
    firebase.default
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.default.auth().currentUser.updateProfile(update);
        let uid = firebase.default.auth().currentUser.uid;
        db.collection("info_user")
          .where("id_user", "==", uid)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              db.collection("info_user").doc(doc.id).update(update);
            });
          });
        db.collection("mis_logros")
          .doc(logros.get("Fotogenico"))
          .update({ nivel: 2, mi_puntaje: 1 })
          .then(() =>
            alert(
              "Logro desbloquedo\nFelicitaciones ahora tienes el logro 'Fotogenico'\n¡Felicitaciones.!"
            )
          );
        setloading(false);
        toastRef.current.show("Imagen Actualizada");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        toastRef.current.show("Error al actualizar el avatar");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showAccessory
        containerStyle={styles.userInfoAvatar}
        source={
          userInfo.photoURL
            ? { uri: userInfo.photoURL }
            : require("../../../assets/img/avatar-default.jpg")
        }
      >
        <Avatar.Accessory
          style={{
            height: 30,
            width: 30,
            borderRadius: 500,
            backgroundColor: "#5fbdff",
          }}
          onPress={changeAvatar}
        />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {userInfo.displayName ? userInfo.displayName : "Anonimo"}
        </Text>
        <Text>{userInfo.email ? userInfo.email : "Social Login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoAvatar: {
    marginRight: 20,
  },
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
