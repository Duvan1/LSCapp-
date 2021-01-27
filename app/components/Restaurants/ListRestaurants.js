import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import IconClass from "./IconClass";

export default function ListRestaurants(props) {
  const { restaurants, handleLoadMore, isLoading } = props;
  //const restaurants = [];
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ alignItems: "center", backgroundColor: "#f2f2f2" }}>
      {size(restaurants) > 0 ? (
        <FlatList
          contentContainerStyle={{
            marginTop: 10,
            marginBottom: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          data={restaurants}
          numColumns={2}
          renderItem={(restaurant) => (
            <View style={{}}>
              <View
                style={{
                  flex: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  marginRight: 40,
                  marginLeft: 40,
                }}
              >
                <Restaurant restaurant={restaurant} navigation={navigation} />
              </View>
            </View>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListEmptyComponent={
            <FooterList isLoading={isLoading} handleLoadMore={handleLoadMore} />
          }
        />
      ) : (
        <View style={styles.loadRestaurants}>
          <ActivityIndicator size="large" color="#00a680" />
          <Text>Cargando Restaurantes</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, images, name, address, description } = restaurant.item;
  const imageRestaurant = images[0];
  const number = Math.floor(Math.random() * (9 + 1));

  let index = restaurant.index;
  const goRestaurant = () => {
    navigation.navigate("restaurant", {
      id,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={{ marginBottom: 20 }}>
        <IconClass />
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <View style={styles.loadRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestaurants}>
        <Text>No quedan restaurantes por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  imageRestaurant: {
    height: 80,
    width: 80,
  },
  restaurantName: {
    fontWeight: "bold",
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
