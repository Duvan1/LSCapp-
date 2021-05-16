import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { ListItem } from "react-native-elements";
import Loading from "../../components/Loading";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function LogrosUsuario() {
  const [isVisible, setisVisible] = useState(false);
  const [list, setlist] = useState([]);

  useEffect(() => {
    setisVisible(true);

    const user = firebase.default.auth().currentUser;

    db.collection("mis_logros")
      .where("id_user", "==", user.uid)
      .get()
      .then((response) => {
        let listLogros = [];
        response.forEach((doc) => {
          listLogros.push(doc.data());
          //setlogros(listLogros);
        });
        //console.log("*********************  ", listLogros);
        setlist(listLogros);
        setisVisible(false);
        console.log("*********************  ", list);
      });
  }, []);

  const getIcon = (nombre) => {
    switch (nombre) {
      case "Filósofo":
        return require("../../../assets/icons/achievement-sage.png");
        break;
      case "Intelectual":
        return require("../../../assets/icons/achievement-scholar.png");
        break;
      case "Fotogenico":
        return require("../../../assets/icons/achievement-photogenic.png");
        break;
      case "Primer lugar":
        return require("../../../assets/icons/achievement-winner.png");
        break;
      case "En el blanco":
        return require("../../../assets/icons/achievement-sharpshooter.png");
        break;
      case "On fire":
        return require("../../../assets/icons/achievement-wildfire.png");
        break;
      case "Noble":
        return require("../../../assets/icons/achievement-regal.png");
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={{ marginRight: 20, marginLeft: 20, borderRadius: 20 }}>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <View style={{ marginLeft: 0, minWidth: 77 }}>
            <ImageBackground
              source={getIcon(l.logro.nombre)}
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                paddingBottom: "124.5%",
                position: "relative",
                width: "100%",
              }}
            >
              <Text
                style={{
                  bottom: 10,
                  fontSize: 14,
                  color: "#fff",
                  fontWeight: "700",
                  display: "flex",
                  position: "absolute",
                }}
              >
                {"Nivel "}
                {l.nivel}
              </Text>
            </ImageBackground>
          </View>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {l.logro.nombre}
            </ListItem.Title>
            <Text style={{ color: "gray" }}>{l.logro.descripcion}</Text>
            <View style={styles.subtitleView}>
              <ProgressBar
                progress={l.mi_puntaje}
                color={"#FFC300"}
                style={styles.ratingImage}
              />
              <Text style={styles.ratingText}>
                {l.mi_puntaje} {"/"}
                {l.logro.puntaje_a_lograr}
              </Text>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
      <Loading text="Cargando... " isVisible={isVisible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
    marginBottom: 60,
    marginTop: 20,
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#5fbdff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingBottom: 5,
    paddingTop: 5,
  },
  titleBtnCloseSession: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 0,
    paddingTop: 5,
  },
  ratingImage: {
    borderRadius: 5,
    height: 10,
    minWidth: 140,
    width: "90%",
  },
  ratingText: {
    paddingLeft: 2,
    color: "grey",
  },
});
