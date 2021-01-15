import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/social";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const navigation = useNavigation();
  const { toastRef } = props;
  const [loading, setloading] = useState(false);

  const login = async () => {
    await Facebook.initializeAsync(FacebookApi.application_id);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: FacebookApi.permissions,
    });

    if (type === "success") {
      setloading(true);
      const credentials = firebase.default.auth.FacebookAuthProvider.credential(
        token
      );
      firebase.default
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          setloading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setloading(false);
          toastRef.current.show("credenciales incorrectas");
        });
    } else if (type === "cancel") {
      toastRef.current.show("Cancelaste el inicio de sesión");
    } else {
      toastRef.current.show("error desconocido intentelo mas tarde");
    }
  };

  return (
    <>
      <SocialIcon
        title="Inicia Sesion con Facebook"
        fontWeight="bold"
        button
        type="facebook"
        onPress={login}
      />
      <Loading title="Cargando" isVisible={loading} />
    </>
  );
}
