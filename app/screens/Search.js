import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseApp } from "../utils/firebase";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
const db = firebase.firestore(firebaseApp);
export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [senias, setsenias] = useState([]);
  const [seniasID, setseniasID] = useState([]);
  const list = [
    {
      video: "",
      senia: "Seña",
      categoria: "Categoria",
    },
  ];

  useEffect(() => {
    if (search) {
      let consultav = search.toLowerCase();
      fireSQL
        .query(`SELECT * FROM senia WHERE nombre LIKE '${consultav}%'`)
        .then((response) => {
          setsenias(response);
        });
    } else {
      fireSQL.query(`SELECT * FROM senia`).then((response) => {
        setsenias(response);
      });
    }
    console.log(senias);
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Buscar seña..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />

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
              <Restaurant senia={senia} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

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
  const { senia, navigation } = props;
  const { nombre, images, id, tema } = senia.item;
  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={() => navigation.navigate("seña", { senia: senia })}
    >
      <Avatar source={require("../../assets/icons/achievement-winner.png")} />
      <ListItem.Content>
        <ListItem.Title>{nombre}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content>
        <ListItem.Title>{tema}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});
