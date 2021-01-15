import React, { useRef } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";

import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
        <SignIn />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

function SignIn() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textLogin}>
      ¿Ya tienes una cuenta?{" "}
      <Text
        onPress={() => navigation.navigate("login")}
        style={styles.btnLogin}
      >
        Ingresa
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  btnLogin: {
    color: "#5fbdff",
    fontWeight: "bold",
  },
  textLogin: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    color: "#AFAFAF",
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
