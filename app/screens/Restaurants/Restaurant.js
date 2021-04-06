import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { Button, Icon, SocialIcon } from "react-native-elements";
//import basic react native components
import { BottomSheet } from "react-native-btr";
//////// firebase
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import * as Progress from "react-native-progress";
import { isEmpty } from "lodash";

const db = firebase.firestore(firebaseApp);
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

export default function Restaurant(props) {
  const { displayName, setShowModal, toastRef, navigation, senia } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [avance, setAvance] = useState(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [flexDirection, setflexDirection] = useState({});
  const [senias, setSenias] = useState(null);
  const [seniasLenght, setSeniasLenght] = useState(10);
  const [opciones, setOpciones] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setIsVisible(!isVisible);
    setAvance(avance + 1);
  };

  const onSubmit = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // este estado sera el que guardara cuantas señas tengo lo qiue es lo mismo que la cantidad de preguntas
    setSeniasLenght(senia.length);
    db.collection("senia")
      .doc(senia[avance])
      .get()
      .then((response) => {
        let payload = {
          nombre: response.data().nombre,
          icon: require("../../../assets/icons/crown.png"),
          isCorrect: true,
        };
        crearOpciones(payload);
        setSenias(response.data());
        console.log("========>>>>>>>>>>>>>        ", senias);
      });
  }, [avance]);

  function comprobar() {
    if (isEmpty(flexDirection)) {
      alert("Por favor seleccione una opción.");
      return;
    }
    if (flexDirection.isCorrect) {
      //alert("correcto");
      setCorrectAnswer(true);
    } else {
      //alert("incorrecto :c");
      setCorrectAnswer(false);
    }
    setIsVisible(true);
    setflexDirection({});
  }

  const crearOpciones = (res) => {
    // creo el array donde se guardaran las 4 opciones
    let auxOpciones = [];
    for (let index = 0; index < 4; index++) {
      auxOpciones.push({
        nombre: "opcion: " + (index + 1),
        icon: require("../../../assets/icons/esmeralda.png"),
        isCorrect: false,
      });
    }
    // en una posicion aleatoria de las opciones guardo la respuesta correcta
    auxOpciones[Math.floor(Math.random() * (3 - 0 + 1) + 0)] = res;
    // guardo las opciones en un estado
    setOpciones(auxOpciones);
  };

  const PreviewLayout = ({
    label,
    children,
    values,
    selectedValue,
    setSelectedValue,
  }) => (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {values.map((value) => (
          <TouchableOpacity
            onPress={() => setSelectedValue(value)}
            style={[styles.button, selectedValue === value && styles.selected]}
          >
            <ImageBackground
              style={{ width: 35, height: 35 }}
              source={value.icon}
            />
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}
            >
              {value.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.container, { [label]: selectedValue }]}>
        {children}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {senias ? (
        <View style={styles.container}>
          <BottomSheet
            visible={isVisible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={() => {
              setIsVisible(true);
            }}
            //Toggling the visibility state
            onBackdropPress={() => {
              setIsVisible(true);
            }}
            //Toggling the visibility state
          >
            {/*Bottom Sheet inner View*/}
            <View
              style={
                correctAnswer
                  ? styles.bottomNavigationViewCorrect
                  : styles.bottomNavigationViewInCorrect
              }
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      padding: 20,
                      fontSize: correctAnswer ? 30 : 20,
                      fontWeight: "bold",
                      width: "70%",
                      color: correctAnswer ? "#58a700" : "#EA2B2B",
                    }}
                  >
                    {correctAnswer
                      ? "!Buen Trabajo¡"
                      : "La solución correcta es: "}
                    {correctAnswer ? null : senias.nombre}
                  </Text>
                  <ImageBackground
                    style={{ width: 110, height: 100 }}
                    source={
                      correctAnswer
                        ? require("../../../assets/img/mascota.png")
                        : require("../../../assets/img/mascota_triste.png")
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    title={"Entendido"}
                    buttonStyle={{
                      backgroundColor: correctAnswer ? "#58CB02" : "#FF4B4B",
                      borderColor: correctAnswer ? "#58A700" : "#EA2B2B",
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    containerStyle={{
                      width: "80%",
                      borderColor: correctAnswer ? "#58A700" : "#EA2B2B",
                      borderTopWidth: 0.5,
                      borderLeftWidth: 1,
                      borderBottomWidth: 3,
                      borderRightWidth: 3,
                      borderBottomEndRadius: 12,
                      borderBottomLeftRadius: 12,
                      borderTopRightRadius: 12,
                      marginBottom: 20,
                      marginTop: -40,
                    }}
                    titleStyle={{ color: "#FFF", fontSize: 20 }}
                    onPress={() => {
                      toggleBottomNavigationView();
                    }}
                  />
                </View>
              </View>
            </View>
          </BottomSheet>
          <StatusBar animated={true} backgroundColor="#61dafb" />
          <View style={styles.row}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Icon
                type="material-community"
                name={"close"}
                iconStyle={styles.iconRight}
                onPress={() => {
                  Alert.alert(
                    "¡Espera!",
                    "¿Seguro que quieres salir de la clase?",
                    [
                      {
                        text: "Quedarme",
                        onPress: () => null,
                        style: "cancel",
                      },
                      { text: "Salir", onPress: () => setShowModal(false) },
                    ]
                  );
                }}
              />
              <View>
                {avance == 0 ? (
                  <Progress.Bar
                    progress={0}
                    width={widthScreen * 0.8}
                    height={4}
                    animated={true}
                    color={"#61dafb"}
                  />
                ) : (
                  <Progress.Bar
                    progress={avance / senia.length}
                    width={widthScreen * 0.8}
                    height={4}
                    animated={true}
                    color={"#61dafb"}
                  />
                )}
              </View>
            </View>
            <View style={[styles.box, styles.two]}></View>
          </View>
          <ScrollView>
            <View style={{ height: " 100%", width: "100%" }}>
              <Text
                style={{
                  fontSize: 25,
                  lineHeight: 24,
                  margin: 0,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Mira el video y selecciona la seña correcta
              </Text>
              <Video
                ref={video}
                style={{ alignSelf: "center", width: 320, height: 200 }}
                source={{
                  uri: senias.URL,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
              <View
                style={{
                  marginBottom: 24,
                  marginTop: 24,
                  borderBottomWidth: 1,
                  borderBottomColor: "#A7A7A7",
                  borderTopWidth: 1,
                  borderTopColor: "#A7A7A7",
                  paddingBottom: 10,
                  paddingTop: 10,
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 20, color: "#a7a7a7", marginBottom: 5 }}
                  >
                    Tu seleción:
                  </Text>
                  {flexDirection.nombre ? (
                    <Button
                      title={flexDirection.nombre}
                      buttonStyle={{
                        backgroundColor: "#FFF",
                        borderColor: "#a7a7a7",
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                      containerStyle={{
                        width: "50%",
                        borderColor: "#a7a7a7",
                        borderTopWidth: 0.5,
                        borderLeftWidth: 1,
                        borderBottomWidth: 3,
                        borderRightWidth: 3,
                        borderBottomEndRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                      titleStyle={{ color: "#a7a7a7" }}
                    />
                  ) : null}
                </View>
              </View>
              <View style={{ marginBottom: 50 }}>
                <PreviewLayout
                  label={"Selecciona tu respuesta"}
                  values={opciones}
                  selectedValue={flexDirection}
                  setSelectedValue={setflexDirection}
                ></PreviewLayout>
              </View>
              <View style={{ marginBottom: 30 }}>
                <Button
                  onPress={() => {
                    comprobar();
                  }}
                  title="comprobar"
                  buttonStyle={{
                    backgroundColor: "#61dafb",
                    borderColor: "#55C1E2",
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                  containerStyle={{
                    borderColor: "#55C1E2",
                    borderTopWidth: 0.5,
                    borderLeftWidth: 1,
                    borderBottomWidth: 3,
                    borderRightWidth: 3,
                    borderBottomEndRadius: 12,
                    borderBottomLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  titleStyle={{ fontSize: 20 }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: heightScreen * 0.5,
          }}
        >
          <Text>Cargando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "white",
  },
  bottomNavigationViewCorrect: {
    backgroundColor: "#D7FFB8",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavigationViewInCorrect: {
    backgroundColor: "#FFDFE0",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "white",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    borderColor: "#a7a7a7",
    borderTopWidth: 0.5,
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderRadius: 12,
    height: "50%",
  },
  selected: {
    backgroundColor: "#62B2EF",
    borderColor: "#5fbdff",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: "500",
    color: "#a7a7a7",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    color: "#555555",
    marginBottom: 10,
    fontSize: 20,
  },
});
