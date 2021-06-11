import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import {
  SearchBar,
  ListItem,
  Avatar,
  Button,
  Icon,
} from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseApp } from "../utils/firebase";
import Loading from "../components/Loading";
import ModalSenia from "../components/ModalSenia";
import Alfabeto from "./Alfabeto";
import Senia from "./Senia";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
const db = firebase.firestore(firebaseApp);
export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [senias, setsenias] = useState([]);
  const [seniasAux, setseniasAux] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renderCoponent, setRenderCoponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [falgSearch, setfalgSearch] = useState(0);

  const list = [
    {
      video: "",
      senia: "Seña",
      categoria: "Categoria",
    },
  ];

  var miMapa = new Map();
  miMapa.set("actividades", "04pDSjsmeacjmOdLftag");
  miMapa.set("administracion", "QTRApaafzC2IJFoNImKa");
  miMapa.set("alimentacion", "IJEUQXIbiu7tkXxtOvz2"); //
  miMapa.set("aseo personal", "30q9iteRYjnVsr7mr4lj");
  miMapa.set("aseo personal", "30q9iteRYjnVsr7mr4lj");
  miMapa.set("calificar", "cyk0MWZOyUYM0Pz8rSsT");
  miMapa.set("cantidad", "htxJBQSF6z3wROPtdCmw");
  miMapa.set("caracteristicas y sentimientos", "EQn8aexRqlj7XmqIDvPI");
  miMapa.set("ciudad", "igyPr8UiCpmiyHHkODfl");
  miMapa.set("comunicacion", "REl2nup24ixzi0wYpzNJ");
  miMapa.set("cuerpo humano", "SAHMfQEBO1aLvmBggL1K");
  miMapa.set("cultura", "LqzpnJQVUHO0kLvCkb4B");
  miMapa.set("deporte", "BUal024b89qhydt0u6Hz");
  miMapa.set("dias de la semana", "8p4YHn9gnqMLfCQ09jlq");
  miMapa.set("educacion", "r9h9K4QoamnPwPqaJMGB");
  miMapa.set("espacio", "SP2vzZE9LXCkFveJV64B");
  miMapa.set("familia y relaciones personales", "sSeahgahvXUoLthVqSx0");
  miMapa.set("fisiologia", "RS4lnyCM0x9bFUss3uZv");
  miMapa.set("formulas de cortesia", "JYnLddQfx7LSgKTTp6A7");
  miMapa.set("hogar y vivienda", "IS7xgAgHvC8IF5qvK2ky");
  miMapa.set("inteligencia", "CeVxSCPVOn75xyp10TW6");
  miMapa.set("interrogar", "VTABSYXEOQaE9f4AjFwK");
  miMapa.set("meses del año", "ZLpPojxi0oPpUXz1eJAx");
  miMapa.set("profesiones y oficios", "LVcLIyu6OF9h8AltrMIm");
  miMapa.set("religion", "Zg6k8DpIPJKkiwB4NYNz");
  miMapa.set("salud", "Klskkx1w4q2uB5Vq4MDG");
  miMapa.set("sanciones sociales y vicios", "iSJn9BSal5rX8oFJ9NF9");
  miMapa.set("ser humano", "tsUYern1niVOOaIpoN30");
  miMapa.set("tecnologia", "HwyI4O5WdHIF7NfG9PjR");
  miMapa.set("tiempo", "enzH5ujRj5gYFv0Hnalj");
  miMapa.set("vestuario", "nf2slWVcsuW9fPNeKIoX");

  const similarity = (s1, s2) => {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (
      (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    );
  };

  const editDistance = (s1, s2) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };

  const sync = (tema, id) => {
    console.log("******************* cargar ********************");
    console.log(tema, " - ", id);
    return new Promise((resolve, reject) => {
      db.collection("senia")
        .where("tema", "==", tema)
        .get()
        .then((res) => {
          let seniasTema = [];
          res.forEach((doc) => {
            console.log(doc.id);
            seniasTema.push(doc.id);
          });
          console.log(seniasTema);

          db.collection("tema")
            .doc(id)
            .update({ senia: seniasTema })
            .then(() => {
              resolve();
              //alert("subio el tema");
              //setIsLoading(false);
            });
        });
    });
  };

  useEffect(() => {
    if (falgSearch > 0) {
      setIsLoading(true);
      if (search) {
        setTimeout(() => {
          let aux = [];
          seniasAux.map((senia) => {
            if (senia.nombre != undefined) {
              if (similarity(search, senia.nombre) > 0.5) {
                console.log("Agregando: " + senia.nombre);
                aux.push(senia);
              }
            }
          });
          setsenias(aux);
          setIsLoading(false);
        }, 1000);
      } else {
        setsenias(seniasAux);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      if (search) {
        let consultav = search.toLowerCase();
        fireSQL
          .query(`SELECT * FROM senia WHERE nombre LIKE '${consultav}%'`)
          .then((response) => {
            setsenias(response);
            setseniasAux(response);
            setIsLoading(false);
          });
      } else {
        fireSQL.query(`SELECT * FROM senia`).then((response) => {
          setsenias(response);
          setseniasAux(response);
          setIsLoading(false);
        });
      }
    }

    /*
    setIsLoading(true);
    let promises = [];
    miMapa.forEach(function (valor, clave) {
      promises.push(sync(clave, valor));
    });
    Promise.all(promises).then(
      () => {
        alert("todo melo");
        setIsLoading(false);
      },
      (err) => {
        alert("la cagamos");
        setIsLoading(false);
      }
    );
   
     */
  }, [falgSearch]);

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <SearchBar
            placeholder="Buscar seña..."
            onChangeText={(e) => setSearch(e)}
            value={search}
            containerStyle={styles.searchBar}
          />
          <Button
            title="Buscar"
            containerStyle={{ height: 100, width: "30%" }}
            buttonStyle={{ height: 60, fontSize: 15, fontWeight: "bold" }}
            onPress={() => setfalgSearch(falgSearch + 1)}
            //onPress={() => cargar()}
            loading={isLoading}
          />
        </View>
        {senias.length === 0 ? (
          <NotFoundRestaurants />
        ) : (
          <View>
            {list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <ImageBackground
                  style={{ width: 35, height: 30 }}
                  source={require("../../assets/img/mascota.png")}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>
                    {l.senia}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold" }}>
                    {l.categoria}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
            <FlatList
              data={senias}
              renderItem={(senia) => (
                <Restaurant
                  senia={senia}
                  navigation={navigation}
                  setRenderCoponent={setRenderCoponent}
                  setIsLoading={setIsLoading}
                  setShowModal={setShowModal}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
      <Icon
        reverse
        containerStyle={styles.btnContainer}
        type="material-community"
        name="book-open-variant"
        color="#5F7AFF"
        onPress={() => {
          setIsLoading(true);
          setRenderCoponent(
            <Alfabeto setShowModal={setShowModal} setIsLoading={setIsLoading} />
          );
          setShowModal(true);
        }}
      />
      <Loading text="Cargando... " isVisible={isLoading} />
      {renderCoponent && (
        <ModalSenia isVisible={showModal} setVisible={setShowModal}>
          {renderCoponent}
        </ModalSenia>
      )}
    </>
  );
}

const goDictionary = () => {
  //setIsLoading(true);
  setRenderCoponent(
    <Alfabeto setShowModal={setShowModal} setIsLoading={setIsLoading} />
  );
  setShowModal(true);
};

function NotFoundRestaurants(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 50,
        marginRight: 20,
        marginLeft: 20,
      }}
    >
      <Image
        source={require("../../assets/img/mascota_triste.png")}
        resizeMode="cover"
        style={{ width: 200, height: 167 }}
      />
      <Text
        style={{
          marginTop: 24,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        No se encontraron resultados para tu busqueda.
      </Text>
    </View>
  );
}

function Restaurant(props) {
  const { senia, navigation, setIsLoading, setShowModal, setRenderCoponent } =
    props;
  const {
    nombre,
    URL,
    id,
    tema,
    img,
    categoria_gramatical,
    definicion,
    descripcion,
    nombre_ingles,
    prosa,
    prosa_traduccion,
  } = senia.item;
  //console.log(img);
  const goRestaurant = () => {
    setIsLoading(true);
    let aux = senia;
    console.log(senia);
    if (senia != undefined) {
      setRenderCoponent(
        <Senia
          senia={senia}
          setShowModal={setShowModal}
          setIsLoading={setIsLoading}
        />
      );
      setShowModal(true);
    }
  };
  return (
    <View style={{ marginBottom: 40 }}>
      <ListItem key={id} bottomDivider onPress={() => goRestaurant()}>
        <Avatar
          source={{
            uri:
              img == "" || img == undefined
                ? "https://firebasestorage.googleapis.com/v0/b/tenedores-d1e09.appspot.com/o/senias-icons%2Fhombre%2Fgaleria-de-imagenes%20(1).png?alt=media&token=5dde644a-1a4a-4014-b57b-cd9c763fa6c0"
                : img,
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{nombre}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Title>{tema}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
    maxWidth: "100%",
    width: "70%",
    height: 60,
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
