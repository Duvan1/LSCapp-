import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card, Image, Icon, Avatar, Rating } from "react-native-elements";
import TopRestaurants from "../../screens/TopRestaurants";

export default function ListTopRestautant(props) {
  const { restaurants, navigation } = props;
  const [restaurantLenght, setRestaurantLenght] = useState(0);

  useEffect(() => {
    setRestaurantLenght(restaurants.length);
  }, [restaurants]);

  console.log(restaurants.length);
  return (
    <FlatList
      data={restaurants}
      renderItem={(restaurant) => (
        <Restaurant
          restaurant={restaurant}
          navigation={navigation}
          restaurantLenght={restaurantLenght}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

function Restaurant(props) {
  const { restaurant, navigation, restaurantLenght } = props;
  const { id, name, rating, images, description } = restaurant.item;
  const [iconColor, setIconColor] = useState("#000");

  //console.log(restaurant);

  return (
    <Card containerStyle={styles.contairnerCard}>
      {restaurant.index <= 2 ? (
        <Icon
          type="material-community"
          name="arrow-up-bold-box"
          color="#5fbdff"
          size={40}
          containerStyle={styles.containerIcon}
        />
      ) : restaurant.index + 1 >= restaurantLenght - 1 ? (
        <Icon
          type="material-community"
          name="arrow-down-bold-box"
          color="red"
          size={40}
          containerStyle={styles.containerIcon}
        />
      ) : null}
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 0,
          paddingRight: 0,
          borderTopColor: "#e5e5e5",
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {restaurant.index + 1}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: -100,
            alignItems: "center",
          }}
        >
          <Avatar
            containerStyle={{ borderRadius: 80, marginRight: 10 }}
            source={
              images[0]
                ? { uri: images[0] }
                : require("../../../assets/img/no-image.png")
            }
          />
          <Text style={styles.title}>{name}</Text>
        </View>
        <Text style={{ fontSize: 24, color: "#a2a2a2" }}>
          {(399 / (restaurant.index + 1)).toFixed(2)} EXP
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  contairnerCard: {
    borderTopWidth: 2,
    borderTopColor: "#e5e5e5",
    borderWidth: 0,
    marginBottom: -17,
    paddingTop: 0,
    paddingBottom: 0,
  },
  containerIcon: {
    position: "absolute",
    top: -30,
    left: -30,
    zIndex: 1,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  titleImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "grey",
    marginTop: 10,
    textAlign: "justify",
  },
});
