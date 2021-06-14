import React, { useState } from "react";
import { StyleSheet, View, Text, TextBase } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";

const db = firebase.firestore(firebaseApp);

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toastRef, setRealoadUserInfo } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre es obligatorio");
    } else if (displayName === newDisplayName) {
      setError("El nombre no puede ser igual al actual.");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase.default
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          let uid = firebase.default.auth().currentUser.uid;
          db.collection("info_user")
            .where("id_user", "==", uid)
            .get()
            .then((res) => {
              res.forEach((doc) => {
                db.collection("info_user").doc(doc.id).update(update);
              });
            });
          setIsLoading(false);
          setRealoadUserInfo(Math.random());
          setShowModal(false);
        })
        .catch(() => {
          setError("error al actualizar nombre y apellidos");
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellidos"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        defaultValue={displayName || ""}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar Nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyles}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnStyles: {
    backgroundColor: "#5fbdff",
  },
});
