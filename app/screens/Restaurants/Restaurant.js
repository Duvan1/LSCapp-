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
import { Button, Icon, Card } from "react-native-elements";
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
import { FireSQL } from "firesql";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

const db = firebase.firestore(firebaseApp);
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

export default function Restaurant(props) {
  const {
    displayName,
    setShowModal,
    toastRef,
    navigation,
    senia,
    tema,
    uid_mis_temas,
    uidInfoUser,
    setreaload,
    setreloadInfoUser,
  } = props;
  const [gameOver, setGameOver] = useState(false);
  const [final, setFinal] = useState(false);
  const [avance, setAvance] = useState(0);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [flexDirection, setflexDirection] = useState({});
  const [senias, setSenias] = useState(null);
  const [seniasLenght, setSeniasLenght] = useState(10);
  const [opciones, setOpciones] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [vidas, setVidas] = useState(3);
  const [correctas, setcorrectas] = useState([]);
  const [incorrectas, setincorrectas] = useState([]);
  const [seguidas, setseguidas] = useState(0);
  const [seniasOpciones, setseniasOpciones] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  let banderaSeguidas = false;
  let EXP = 0;
  let coronas = 0;
  let gemas = 0;
  let logros = new Map();

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setIsVisible(!isVisible);
    setAvance(avance + 1);
  };

  const finalizar = () => {
    setisLoading(true);
    if (final && !gameOver) {
      EXP =
        seguidas * 10 +
        100 +
        correctas.length * 10 +
        vidas * 10 -
        incorrectas.length * 10;
      coronas = 1;
      gemas = coronas * 4 + Math.ceil(EXP / 40);

      const uid = firebase.auth().currentUser.uid;
      db.collection("info_user")
        .where("id_user", "==", uid)
        .get()
        .then((response) => {
          const arrayResponse = [];
          response.forEach((doc) => {
            arrayResponse.push(doc.data());
          });
          // timestamp dia de hoy
          let now = new Date();
          // base del timestamp comparativo
          const oneDay = 24 * 60 * 60 * 1000;
          //ultima clase vista
          var last_class = new Date(
            arrayResponse[0].ultima_clase.seconds * 1000
          );
          //dias de diferencia
          const diffDays = Math.round(Math.abs((now - last_class) / oneDay));

          let experiencia = EXP + arrayResponse[0].EXP;
          let coronasaux = coronas + arrayResponse[0].coronas;
          let gemasaux = gemas + arrayResponse[0].gemas;
          let total = experiencia + coronasaux + gemasaux;
          let racha =
            diffDays == 0
              ? arrayResponse[0].dias_racha
              : diffDays == 1
              ? arrayResponse[0].dias_racha + 1
              : 0;
          let divicionAux =
            total >= 2500 && total < 3000
              ? "bronce"
              : total >= 3000 && total < 6000
              ? "plata"
              : total >= 6000 && total < 9000
              ? "oro"
              : total >= 9000 && total < 12000
              ? "ruby"
              : total >= 12000 && total < 20000
              ? "diamante"
              : total >= 20000
              ? "esmeralda"
              : arrayResponse[0].division;

          getAllmodulsUnlock(uid_mis_temas).then((data) => {
            let unlock = data
              ? arrayResponse[0].modulos_desbloqueados + 1
              : arrayResponse[0].modulos_desbloqueados;
            console.log(
              "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
                uidInfoUser +
                "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
            );
            db.collection("info_user")
              .doc(uidInfoUser)
              .update({
                EXP: experiencia,
                coronas: coronasaux,
                gemas: gemasaux,
                ultima_clase: now,
                division: divicionAux,
                dias_racha: racha,
                modulos_desbloqueados: unlock >= 3 ? 3 : unlock,
              })
              .then(() => {
                db.collection("mis_temas")
                  .doc(uid_mis_temas)
                  .update({
                    completado: true,
                    veces_completado: tema.item.veces_completado + 1,
                    coronas: tema.item.coronas + 1,
                  })
                  .then(() => {
                    let logros_logrados = false;
                    if (coronasaux >= 40) {
                      db.collection("mis_logros")
                        //.doc(logros.get("Noble"))
                        .where("logro.nombre", "==", "Noble")
                        .get()
                        .then((res) => {
                          res.forEach((doc) => {
                            let id = doc.id;
                            db.collection("mis_logros")
                              .doc(id)
                              .update({ nivel: 2, mi_puntaje: 40 })
                              .then(
                                () => (logros_logrados = true),
                                (err) => console.log("ocurrio un error", err)
                              );
                          });
                        });
                    }
                    if (experiencia >= 100) {
                      db.collection("mis_logros")
                        .where("logro.nombre", "==", "Filósofo")
                        .get()
                        .then((res) => {
                          res.forEach((doc) => {
                            let id = doc.id;
                            db.collection("mis_logros")
                              .doc(id)
                              .update({ nivel: 2, mi_puntaje: 100 })
                              .then(
                                () => (logros_logrados = true),
                                (err) => console.log("ocurrio un error", err)
                              );
                          });
                        });
                    }
                    if (incorrectas.length < 1) {
                      db.collection("mis_logros")
                        .where("logro.nombre", "==", "En el blanco")
                        .get()
                        .then((res) => {
                          res.forEach((doc) => {
                            let id = doc.id;
                            db.collection("mis_logros")
                              .doc(id)
                              .update({ nivel: 2, mi_puntaje: 20 })
                              .then(
                                () => (logros_logrados = true),
                                (err) => console.log("ocurrio un error", err)
                              );
                          });
                        });
                    }
                    if (correctas.length >= 5) {
                      db.collection("mis_logros")
                        .where("logro.nombre", "==", "Intelectual")
                        .get()
                        .then((res) => {
                          res.forEach((doc) => {
                            let id = doc.id;
                            db.collection("mis_logros")
                              .doc(id)
                              .update({ nivel: 2, mi_puntaje: 5 })
                              .then(
                                () => (logros_logrados = true),
                                (err) => console.log("ocurrio un error", err)
                              );
                          });
                        });
                    }
                    if (racha >= 14) {
                      db.collection("mis_logros")
                        .where("logro.nombre", "==", "On fire")
                        .get()
                        .then((res) => {
                          res.forEach((doc) => {
                            let id = doc.id;
                            db.collection("mis_logros")
                              .doc(id)
                              .update({ nivel: 2, mi_puntaje: 14 })
                              .then(
                                () => (logros_logrados = true),
                                (err) => console.log("ocurrio un error", err)
                              );
                          });
                        });
                    }

                    if (logros_logrados) {
                      alert(
                        "Has desbloqueados algunos logros!!!\n Felicitaciones!!"
                      );
                    }

                    setTimeout(() => {
                      setisLoading(false);
                      setreloadInfoUser(Math.random());
                      setreaload(Math.random());
                      setShowModal(false);
                    }, 2000);
                  });
              });
          });
        });
      //setShowModal(false);
    } else if (final && gameOver) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    setisLoading(true);
    // este estado sera el que guardara cuantas señas tengo lo qiue es lo mismo que la cantidad de preguntas

    setSeniasLenght(senia.length);
    if (senia.length > avance) {
      db.collection("senia")
        .doc(senia[avance])
        .get()
        .then((response) => {
          let payload = {
            nombre: response.data().nombre.toLowerCase(),
            icon: { uri: response.data().img },
            isCorrect: true,
          };
          crearOpciones(payload);
          setSenias(response.data());
          setisLoading(false);
        });
    } else {
      setisLoading(false);
      setFinal(true);
    }
  }, [avance]);

  const getAllmodulsUnlock = (id) => {
    return new Promise((resolve, reject) => {
      let isModuleCompleted = false;
      db.collection("mis_temas")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            let aux = doc.data();
            if (doc.id != id) {
              if (aux.completado) {
                isModuleCompleted = true;
              } else {
                isModuleCompleted = false;
              }
            }
          });
          resolve(isModuleCompleted);
        });
    });
  };

  function comprobar() {
    setisLoading(true);
    if (isEmpty(flexDirection)) {
      setisLoading(false);
      alert("Por favor seleccione una opción.");
      return;
    }
    if (flexDirection.isCorrect) {
      //alert("correcto");
      banderaSeguidas = true;
      setCorrectAnswer(true);
      correctas.push(senias);
    } else {
      banderaSeguidas = false;
      setCorrectAnswer(false);
      incorrectas.push(senias);
      setVidas(vidas - 1);
      if (vidas <= 1) {
        setFinal(true);
        setGameOver(true);
      }
      //setVidas(vidas.pop());
    }
    if (banderaSeguidas) {
      setseguidas(seguidas + 1);
    } else {
      setseguidas(0);
    }
    if (seguidas == 4) {
      alert("WOW 4 seguidas lo estas haciendo excelente");
    }
    setisLoading(false);
    setIsVisible(true);
    setflexDirection({});
  }

  const crearOpciones = (resp) => {
    // creo el array donde se guardaran las 4 opciones
    let auxOpciones = [];
    getRandomSign(resp.nombre).then(() => {
      auxOpciones[0] = seniasOpciones[generateRandom(seniasOpciones.length)];
      auxOpciones[1] = seniasOpciones[generateRandom(seniasOpciones.length)];
      auxOpciones[2] = seniasOpciones[generateRandom(seniasOpciones.length)];
      auxOpciones[3] = seniasOpciones[generateRandom(seniasOpciones.length)];
      // en una posicion aleatoria de las opciones guardo la respuesta correcta
      auxOpciones[generateRandom(3)] = resp;
      // guardo las opciones en un estado
      setOpciones(auxOpciones);
    });
  };

  function generateRandom(max) {
    return Math.floor(Math.random() * (max - 0 + 1) + 0);
  }

  const getRandomSign = (name) => {
    //alert("entro");
    return new Promise((resolve, reject) => {
      if (avance > 0) {
        resolve();
      } else {
        db.collection("senia")
          .where("nombre", "!=", name)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              seniasOpciones.push({
                nombre: doc.data().nombre.toLowerCase(),
                icon: { uri: doc.data().img },
                isCorrect: false,
              });
            });
            resolve();
          });
      }
    });
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
              {value.nombre.replace(" ", "\n")}
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
      {senias && !gameOver & !final ? (
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
                    width={widthScreen * 0.4}
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
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ color: "#EA2B2B", fontWeight: "bold", fontSize: 20 }}
                >
                  {vidas}
                </Text>
                <Icon
                  type="material-community"
                  name={"heart"}
                  iconStyle={{ color: "#EA2B2B" }}
                />
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
                  loading={isLoading}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      ) : gameOver ? (
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: heightScreen * 0.1,
            }}
          >
            <ImageBackground
              style={{ width: 150, height: 125, marginBottom: 10 }}
              source={require("../../../assets/img/mascota_triste.png")}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                textAlign: "center",
                lineHeight: 25,
                marginBottom: 10,
              }}
            >
              ¡Te quedaste sin vidas!{"\n"}
              Pero no te preocupes {"\n"}
              Sabemos que lo harás mejor la próxima{"\n"}
              la práctica hace al maestro.
            </Text>
            <Card
              containerStyle={{ width: widthScreen * 0.8, borderRadius: 10 }}
            >
              <Card.Title
                style={{ color: "#EA2B2B", fontWeight: "bold", fontSize: 17 }}
              >
                Respuestas incorrectas
              </Card.Title>
              <Card.Divider />

              {incorrectas.map((l, i) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      flex: 1,
                      marginLeft: 20,
                      textTransform: "uppercase",
                    }}
                  >
                    {l.nombre}
                  </Text>
                  <Icon
                    type="material-community"
                    name={"close"}
                    iconStyle={{ color: "#EA2B2B" }}
                    containerStyle={{ flex: 2 }}
                  />
                </View>
              ))}

              <Card.Divider />
              <Card.Title
                style={{ color: "#58A700", fontWeight: "bold", fontSize: 17 }}
              >
                Respuestas correctas
              </Card.Title>
              <Card.Divider />
              {correctas.map((l, i) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      flex: 1,
                      marginLeft: 20,
                      textTransform: "uppercase",
                    }}
                  >
                    {l.nombre}
                  </Text>
                  <Icon
                    type="material-community"
                    name={"check-decagram"}
                    iconStyle={{ color: "#58A700" }}
                    containerStyle={{ flex: 2 }}
                  />
                </View>
              ))}
            </Card>
            <Button
              onPress={() => {
                finalizar();
              }}
              title="Finalizar"
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
                width: "85%",
                marginTop: 15,
              }}
              titleStyle={{ fontSize: 20 }}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      ) : !gameOver && final ? (
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: heightScreen * 0.1,
            }}
          >
            <ImageBackground
              style={{ width: 170, height: 150, marginBottom: 10 }}
              source={require("../../../assets/img/mascota.png")}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              ¡Gantaste!{"\n"}
            </Text>

            <Card
              containerStyle={{ width: widthScreen * 0.8, borderRadius: 10 }}
            >
              <Card.Title
                style={{ color: "#EA2B2B", fontWeight: "bold", fontSize: 17 }}
              >
                Respuestas incorrectas
              </Card.Title>
              <Card.Divider />

              {incorrectas.map((l, i) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      flex: 1,
                      marginLeft: 20,
                      textTransform: "uppercase",
                    }}
                  >
                    {l.nombre}
                  </Text>
                  <Icon
                    type="material-community"
                    name={"close"}
                    iconStyle={{ color: "#EA2B2B" }}
                    containerStyle={{ flex: 2 }}
                  />
                </View>
              ))}

              <Card.Divider />
              <Card.Title
                style={{ color: "#58A700", fontWeight: "bold", fontSize: 17 }}
              >
                Respuestas correctas
              </Card.Title>
              <Card.Divider />
              {correctas.map((l, i) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      flex: 1,
                      marginLeft: 20,
                      textTransform: "uppercase",
                    }}
                  >
                    {l.nombre}
                  </Text>
                  <Icon
                    type="material-community"
                    name={"check-decagram"}
                    iconStyle={{ color: "#58A700" }}
                    containerStyle={{ flex: 2 }}
                  />
                </View>
              ))}
            </Card>

            <Button
              onPress={() => {
                finalizar();
              }}
              title="Finalizar"
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
                width: "85%",
                marginTop: 15,
              }}
              titleStyle={{ fontSize: 20 }}
            />
          </View>
        </ScrollView>
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
