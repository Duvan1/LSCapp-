import React from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();
  return (
    <View style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/logo.font.png")}
        resizeMode="contain"
        style={styles.imageFont}
      />
      <Image
        source={require("../../../assets/img/mascota.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Aprende Lengua de señas colombiana</Text>
      <View style={styles.viewBtn}>
        <Button
          title="EMPIEZA"
          buttonStyle={styles.btnStyleRegister}
          titleStyle={{ color: "#5fbdff", fontWeight: "bold", fontSize: 20 }}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("register")}
        />
        <Button
          title="YA TENGO UNA CUENTA"
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          buttonStyle={styles.btnStyleLogin}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "#5fbdff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: "100%",
    marginBottom: 40,
  },
  imageFont: {
    height: 70,
    width: "100%",
    marginBottom: 40,
    marginTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 40,
    textAlign: "center",
    color: "white",
  },
  description: {
    textAlign: "justify",
    marginBottom: 20,
  },
  btnStyleRegister: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  btnStyleLogin: {
    backgroundColor: "#5fbdff",
    borderRadius: 10,
    padding: 15,
  },
  btnContainer: {
    width: "100%",
    marginBottom: 10,
    borderColor: "#62B2EF",
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomEndRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  viewBtn: {
    alignItems: "center",
    backgroundColor: "#5fbdff",
    width: "80%",
  },
});
