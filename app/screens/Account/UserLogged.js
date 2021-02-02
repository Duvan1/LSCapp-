import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { ListItem, Image } from "react-native-elements";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const [loading, setloading] = useState(false);
  const [loadingText, setloadingText] = useState("");
  const toastRef = useRef();
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);
  const [userInfo, setuserInfo] = useState(null);

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
  ];

  useEffect(() => {
    (async () => {
      const user = await firebase.default.auth().currentUser;
      setuserInfo(user);
    })();
    setRealoadUserInfo(false);
  }, [realoadUserInfo]);

  return (
    <ScrollView style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUser
          setloading={setloading}
          setloadingText={setloadingText}
          toastRef={toastRef}
          userInfo={userInfo}
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
                <Text style={{ fontWeight: "bold" }}>389</Text>
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
                  source={require("../../../assets/icons/shield.png")}
                />
              </View>
              <View style={{ width: "60%" }}>
                <Text style={{ fontWeight: "bold" }}>389</Text>
                <Text>EXP total</Text>
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
                  source={require("../../../assets/icons/shield.png")}
                />
              </View>
              <View style={{ width: "60%" }}>
                <Text style={{ fontWeight: "bold" }}>389</Text>
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
                  source={require("../../../assets/icons/shield.png")}
                />
              </View>
              <View style={{ width: "60%" }}>
                <Text style={{ fontWeight: "bold" }}>389</Text>
                <Text>EXP total</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

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
              <ListItem.Title>{l.name}</ListItem.Title>
              <Text style={{ color: "gray" }}>{l.subtitle}</Text>
              <View style={styles.subtitleView}>
                <ProgressBar
                  progress={0.3}
                  color={"#FFC300"}
                  style={styles.ratingImage}
                />
                <Text style={styles.ratingText}>{l.status}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
        <View>
          <Button
            title="Ver más..."
            titleStyle={{ fontSize: 20, fontWeight: "bold", color: "black" }}
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
