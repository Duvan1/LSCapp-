import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { ListItem } from "react-native-elements";

export default function LogrosUsuario() {
  const list = [
    {
      name: "On fire",
      avatar_url: require("../../../assets/icons/achievement-wildfire.png"),
      subtitle: "Alcanza una racha de 14 días",
      percentage: 0.5,
      status: "7/14",
    },
    {
      name: "Filósofo",
      avatar_url: require("../../../assets/icons/achievement-sage.png"),
      subtitle: "Gana 1000 EXP",
      percentage: 0.9,
      status: "935/1000",
    },
    {
      name: "Intelectual",
      avatar_url: require("../../../assets/icons/achievement-scholar.png"),
      subtitle: "Aprende 20 señas nuevas en un mismo curso",
      percentage: 0.85,
      status: "17/20",
    },
    {
      name: "Noble",
      avatar_url: require("../../../assets/icons/achievement-regal.png"),
      subtitle: "Gana 80 coronas",
      percentage: 0.79,
      status: "71/80",
    },
    {
      name: "En el blanco",
      avatar_url: require("../../../assets/icons/achievement-sharpshooter.png"),
      subtitle: "Completa 20 lecciones sin errores",
      percentage: 0.34,
      status: "5/20",
    },
    {
      name: "Primer lugar",
      avatar_url: require("../../../assets/icons/achievement-winner.png"),
      subtitle: "Queda en el puesto #1 de tu liga",
      percentage: 0,
      status: "0/1",
    },
    {
      name: "Fotogenico",
      avatar_url: require("../../../assets/icons/achievement-photogenic.png"),
      subtitle: "Cambia tu foto de perfil",
      percentage: 0,
      status: "0/1",
    },
  ];
  return (
    <ScrollView style={{ marginRight: 20, marginLeft: 20, borderRadius: 20 }}>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <View style={{ marginLeft: 0, minWidth: 77 }}>
            <ImageBackground
              source={l.avatar_url}
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
                Nivel 4
              </Text>
            </ImageBackground>
          </View>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {l.name}
            </ListItem.Title>
            <Text style={{ color: "gray" }}>{l.subtitle}</Text>
            <View style={styles.subtitleView}>
              <ProgressBar
                progress={l.percentage}
                color={"#FFC300"}
                style={styles.ratingImage}
              />
              <Text style={styles.ratingText}>{l.status}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
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
