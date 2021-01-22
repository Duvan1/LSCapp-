import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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
    <View>
      {size(restaurants) > 0 ? (
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 60,
          }}
          data={restaurants}
          numColumns={2}
          renderItem={(restaurant) => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
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
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, images, name, address, description } = restaurant.item;
  const imageRestaurant = images[0];

  const goRestaurant = () => {
    navigation.navigate("restaurant", {
      id,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={[styles.viewRestautant, { alignContent: "center" }]}>
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
  viewRestautant: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  viewRestautantImage: {
    marginRight: 15,
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
