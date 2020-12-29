import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

  useEffect(() => {
    (async () => {
      const user = await firebase.default.auth().currentUser;
      setuserInfo(user);
    })();
    setRealoadUserInfo(false);
  }, [realoadUserInfo]);

  return (
    <View style={styles.viewUserInfo}>
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

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.titleBtnCloseSession}
        onPress={() => {
          firebase.default.auth().signOut();
        }}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingBottom: 5,
    paddingTop: 5,
  },
  titleBtnCloseSession: {
    color: "#00a680",
  },
});
