import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Divider, ProgressBar } from "react-native-paper";
import { ListItem, Image } from "react-native-elements";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";
import { ImageBackgroundBase } from "react-native";

const db = firebase.firestore(firebaseApp);

export default function UserLogged(props) {
  const { navigation } = props;
  const [loading, setloading] = useState(false);
  const [loadingText, setloadingText] = useState("");
  const toastRef = useRef();
  const [realoadUserInfo, setRealoadUserInfo] = useState(0);
  const [userInfo, setuserInfo] = useState(null);
  const [infoUser, setInfoUser] = useState([]);
  const [logros, setlogros] = useState([]);

  const getInsignia = (division) => {
    if (division == "bronce") {
      return {
        uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/divisiones%2Fbronce.png?alt=media&token=ca5367e6-d115-45e1-8ecb-dd768b28bd74",
      };
    } else if (division == "plata") {
      return {
        uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/divisiones%2Fplata.png?alt=media&token=aab5c56b-6701-4791-8f27-0ff088c9919c",
      };
    } else if (division == "oro") {
      return {
        uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/divisiones%2Foro.png?alt=media&token=deaec550-3388-46ca-b651-3e7770fedd39",
      };
    } else if (division == "ruby") {
      return {
        uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/divisiones%2Fruby.png?alt=media&token=9a3679e6-46f7-4e90-83ff-bc201858eb1e",
      };
    } else if (division == "diamante") {
      return {
        uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/divisiones%2Fdiamond.png?alt=media&token=bc642b26-b1d6-4ab5-8d5c-515c6f06bf9d",
      };
    } else if (division == "esmeralda") {
      return {
        uri: "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/divisiones%2Fesmeralda.png?alt=media&token=b24b73e1-5113-47bc-988f-d92aee13f951",
      };
    }
  };

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

  useEffect(() => {
    (async () => {
      const user = await firebase.default.auth().currentUser;
      setuserInfo(user);
      db.collection("info_user")
        .where("id_user", "==", user.uid)
        .get()
        .then((response) => {
          const arrayResponse = [];
          response.forEach((doc) => {
            arrayResponse.push(doc.data());
          });

          setInfoUser(arrayResponse);
        });

      db.collection("mis_logros")
        .where("id_user", "==", user.uid)
        .orderBy("mi_puntaje")
        .limit(2)
        .get()
        .then((response) => {
          let listLogros = [];
          response.forEach((doc) => {
            listLogros.push(doc.data());
            //setlogros(listLogros);
          });
          //console.log("*********************  ", listLogros);
          setlogros(listLogros);
          console.log("*********************  ", logros);
        });
    })();

    setRealoadUserInfo(false);
  }, [realoadUserInfo]);

  return (
    <>
      <ScrollView style={styles.viewUserInfo}>
        {userInfo != null && (
          <InfoUser
            setloading={setloading}
            setloadingText={setloadingText}
            toastRef={toastRef}
            realoadUserInfo={realoadUserInfo}
            //userInfo={infoUser[0]}
            uid={userInfo.uid}
          />
        )}

        <AccountOptions
          userInfo={userInfo}
          toastRef={toastRef}
          setRealoadUserInfo={setRealoadUserInfo}
        />

        <View style={{ marginRight: 20, marginLeft: 20 }}>
          <View
            style={{
              alignItems: "baseline",
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#ABABAB",
            }}
          >
            <Text
              style={{
                color: "#3c3c3c",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Tus estadisticas
            </Text>
          </View>
        </View>
        {!(typeof infoUser[0] === "undefined") ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              marginRight: 20,
              marginLeft: 20,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  width: "40%",
                  borderColor: "#A7A7A7",
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      style={{ height: 30, width: 30 }}
                      source={require("../../../assets/icons/shield.png")}
                    />
                  </View>
                  <View style={{ width: "60%" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {infoUser[0].EXP}
                    </Text>
                    <Text>EXP total</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "40%",
                  borderColor: "#A7A7A7",
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      style={{ height: 30, width: 30 }}
                      source={require("../../../assets/icons/on-fire.png")}
                    />
                  </View>
                  <View style={{ width: "60%" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {infoUser[0].dias_racha}
                    </Text>
                    <Text>Días de racha</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  width: "40%",
                  borderColor: "#A7A7A7",
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      style={{ height: 30, width: 30 }}
                      source={require("../../../assets/icons/crown.png")}
                    />
                  </View>
                  <View style={{ width: "60%" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {infoUser[0].coronas}
                    </Text>
                    <Text>Coronas</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "40%",
                  borderColor: "#A7A7A7",
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      style={{ height: 30, width: 30 }}
                      source={getInsignia(infoUser[0].division)}
                    />
                  </View>
                  <View style={{ width: "60%" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {infoUser[0].division}
                    </Text>
                    <Text>División</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <Text>Cargando</Text>
        )}
        <View style={{ marginRight: 20, marginLeft: 20 }}>
          <View
            style={{
              alignItems: "baseline",
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#ABABAB",
            }}
          >
            <Text
              style={{
                color: "#3c3c3c",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Logros
            </Text>
          </View>
        </View>

        <View style={{ marginRight: 20, marginLeft: 20, borderRadius: 20 }}>
          {logros.length > 0 ? (
            logros.map((l, i) => (
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
                    {l.mi_puntaje > 0 ? (
                      <ProgressBar
                        progress={l.logro.puntaje_a_lograr / l.mi_puntaje}
                        color={"#FFC300"}
                        style={styles.ratingImage}
                      />
                    ) : (
                      <ProgressBar
                        progress={0}
                        color={"#FFC300"}
                        style={styles.ratingImage}
                      />
                    )}

                    <Text style={styles.ratingText}>
                      {l.mi_puntaje}/{l.logro.puntaje_a_lograr}
                    </Text>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <ImageBackground
                style={{ width: 200, height: 180 }}
                source={require("../../../assets/img/logros_not_found.png")}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Aun no tienes logros para mostrar, pero no te preocupes sabemos
                que muy pronto lo lograras.
              </Text>
            </View>
          )}

          {logros.length > 1 ? (
            <View>
              <Button
                title="Ver más..."
                onPress={() => navigation.navigate("logros")}
                titleStyle={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                }}
                buttonStyle={{
                  backgroundColor: "#fff",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: "#A7A7A7",
                }}
              />
            </View>
          ) : null}
        </View>

        <Button
          title="Cerrar sesión"
          containerStyle={{ marginBottom: 60 }}
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.titleBtnCloseSession}
          onPress={() => {
            firebase.default.auth().signOut();
          }}
        />
        <Toast ref={toastRef} position="center" opacity={0.9} />
        <Loading isVisible={loading} text={loadingText} />
      </ScrollView>
    </>
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
