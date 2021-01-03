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

export default function ListRestaurants(props) {
  const { restaurants, handleLoadMore, isLoading } = props;
  //const restaurants = [];
  const navigation = useNavigation();

  return (
    <View>
      {size(restaurants) > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => {
            index.toString();
          }}
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
    }); /*
    navigation.navigate("restaurant", {
      id,
      images,
      name,
      address,
      description,
    });*/
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={styles.viewRestautant}>
        <View style={styles.viewRestautantImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#fff" />}
            source={
              imageRestaurant
                ? { uri: imageRestaurant }
                : require("../../../assets/img/no-image.png")
            }
            style={styles.imageRestaurant}
          />
        </View>
        <View>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text restaurantAddress>{address}</Text>
          <Text restaurantDescription>{description.substr(0, 60)}...</Text>
        </View>
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
    flexDirection: "row",
    margin: 10,
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
