import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { update } from "lodash";

export default function InfoUser(props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    setloadingText,
    setloading,
  } = props;

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
        setloading(false);
        toastRef.current.show("Imagen Actualizada");
      })
      .catch(() => {
        toastRef.current.show("Error al actuañlizar el avatar");
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
          photoURL
            ? { uri: photoURL }
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
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
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
