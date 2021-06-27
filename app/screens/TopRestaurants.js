import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";
import Toast from "react-native-easy-toast";
import ListTopRestautant from "../components/Ranking/ListTopRestautant";
import { FireSQL } from "firesql";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [division, setdivision] = useState("bronce");
  const [top, settop] = useState([]);
  const toastRef = useRef();
  const [mascota_feliz, setmascota_feliz] = useState(
    "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
  );
  const [mascota_triste, setmascota_triste] = useState(
    "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
  );

  useEffect(() => {
    const user = firebase.default.auth().currentUser;

    db.collection("info_user")
      .where("id_user", "==", user.uid)
      .get()
      .then((response) => {
        let infoUser = [];
        response.forEach((doc) => {
          infoUser.push(doc.data());
          //setlogros(listLogros);
        });
        setdivision(infoUser[0].division);

        if (infoUser[0].traje == "normal") {
          setmascota_feliz(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
          );

          setmascota_triste(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
          );
        } else if (infoUser[0].traje == "Traje esmoquin") {
          setmascota_feliz(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_traje.png?alt=media&token=3c6d98dd-f566-4758-bc2c-113ef567b8ba"
          );

          setmascota_triste(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_traje_triste.png?alt=media&token=77aa098c-a1d3-41ee-98cb-b95b0cfdb440"
          );
        } else if (infoUser[0].traje == "Traje de playa") {
          setmascota_feliz(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_playa_feliz.png?alt=media&token=ce7ab628-4296-408a-b1e2-97ada844051b"
          );

          setmascota_triste(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_playa_triste.png?alt=media&token=20cdecaf-c092-4ba9-a99b-42ff1ed47fb7"
          );
        } else if (infoUser[0].traje == "Traje robot para Coco.") {
          setmascota_feliz(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota-robot-feliz.png?alt=media&token=2c8a699b-f3e7-42ab-936b-d991b1e853e9"
          );

          setmascota_triste(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota-robot-triste.png?alt=media&token=81913344-efef-4ec6-82ff-10cfcb4aecca"
          );
        } else {
          setmascota_feliz(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota.png?alt=media&token=44b8ae65-a3e7-4ca9-a130-a5474c1f474d"
          );

          setmascota_triste(
            "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/mascota%2Fmascota_triste.png?alt=media&token=9411bf24-d226-48ce-8fbb-0c8c4361e780"
          );
        }

        fireSQL
          .query(
            `SELECT * FROM info_user WHERE division = '${division}' ORDER BY EXP DESC`
          )
          .then((response) => {
            console.log(response);
            settop(response);
          });
      });

    db.collection("restaurants")
      .orderBy("rating", "desc")

      .get()
      .then((response) => {
        const restaurantArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          restaurantArray.push(data);
        });
        setRestaurants(restaurantArray);
      });
  }, [division]);

  const getIcon = (nombre) => {
    switch (nombre) {
      case "ruby":
        return require("../../assets/icons/ruby.png");
        break;
      case "bronce":
        return require("../../assets/icons/bronce.png");
        break;
      case "diamante":
        return require("../../assets/icons/diamond.png");
        break;
      case "plata":
        return require("../../assets/icons/plata.png");
        break;
      case "oro":
        return require("../../assets/icons/oro.png");
        break;
      case "esmeralda":
        return require("../../assets/icons/esmeralda.png");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ScrollView style={{ marginBottom: 24 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
            marginTop: 24,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#3c3c3c",
                lineHeight: 26,
              }}
            >
              {/* string.charAt(0).toUpperCase() + string.slice(1) */}
              LIGA {division.toUpperCase()}
            </Text>
            <ImageBackground
              source={getIcon(division)}
              style={{
                height: 30,
                width: 30,
                marginLeft: 10,
                position: "relative",
              }}
            ></ImageBackground>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <ImageBackground
            source={require("../../assets/icons/bronce.png")}
            style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
          ></ImageBackground>
          <ImageBackground
            source={require("../../assets/icons/plata.png")}
            style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
          ></ImageBackground>
          <ImageBackground
            source={require("../../assets/icons/oro.png")}
            style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
          ></ImageBackground>
          <ImageBackground
            source={require("../../assets/icons/ruby.png")}
            style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
          ></ImageBackground>
          <ImageBackground
            source={require("../../assets/icons/diamond.png")}
            style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
          ></ImageBackground>
          <ImageBackground
            source={require("../../assets/icons/esmeralda.png")}
            style={{ height: 80, width: 80, marginBottom: 40, marginRight: 10 }}
          ></ImageBackground>
        </ScrollView>
        <View
          style={{
            borderBottomColor: "#e3e3e3",
            borderBottomWidth: 1,
            marginBottom: 24,
          }}
        />
        <ListTopRestautant top={top} navigation={navigation} />
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          alert(
            "Hola! Soy Coco tu guía\n Vamos a competir! obten puntos de experiencia (EXP) completando tus lecciones y ocupa los primeros puestos."
          )
        }
        style={{
          zIndex: 1,
          alignSelf: "flex-end",
          position: "absolute",
          bottom: 30,
          right: 30,
          height: 40,
          justifyContent: "center",
          alignContent: "center",
          width: 80,
        }}
      >
        <ImageBackground
          source={{ uri: mascota_feliz }}
          style={styles.btnContainer}
        ></ImageBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#fff",
    width: 80,
    height: 70,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
