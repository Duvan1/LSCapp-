import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// components
import RestaurantsStack from "./RestaurantsStack";
import FavoritesSrack from "./FavoritesSrack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import UserLogged from "../screens/Account/UserLogged";
import SearchStack from "./SearchStack";

const Tab = createMaterialBottomTabNavigator();

export default function MainTab() {
  const [barColor, setBarColor] = useState("#5fbdff");
  const [inactiveColor, setinactiveColor] = useState("#B0DDFF");

  return (
    <Tab.Navigator
      initialRouteName="restaurants"
      activeColor="#FFF"
      inactiveColor={inactiveColor}
      barStyle={{ backgroundColor: barColor }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="restaurants"
        component={RestaurantsStack}
        options={{
          title: "Inicio",
        }}
        listeners={() => ({
          tabPress: (event) => {
            setBarColor("#5fbdff");
            setinactiveColor("#B0DDFF");
          },
        })}
      />
      <Tab.Screen
        name="favorites"
        component={FavoritesSrack}
        options={{
          title: "Favoritos",
        }}
        listeners={() => ({
          tabPress: (event) => {
            setBarColor("#FF5F5F");
            setinactiveColor("#FF9292");
          },
        })}
      />
      <Tab.Screen
        name="top-restaurants"
        component={TopRestaurantsStack}
        options={{
          title: "Top",
        }}
        listeners={() => ({
          tabPress: (event) => {
            setBarColor("#AF5FFF");
            setinactiveColor("#C992FF");
          },
        })}
      />
      <Tab.Screen
        name="search"
        component={SearchStack}
        options={{
          title: "Buscar",
        }}
        listeners={() => ({
          tabPress: (event) => {
            setBarColor("#5F7AFF");
            1;
            setinactiveColor("#92A4FF");
          },
        })}
      />
      <Tab.Screen
        name="account"
        component={UserLogged}
        options={{
          title: "Cuenta",
          headerShown: true,
        }}
        listeners={() => ({
          tabPress: (event) => {
            setBarColor("#00A680");
            setinactiveColor("#8EDCCA");
          },
        })}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline";

      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "top-restaurants":
      iconName = "star-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "account-outline";
      break;
    default:
      break;
  }
  return (
    //<Icon type="material-community" name={iconName} size={22} color={color} />
    <MaterialCommunityIcons name={iconName} color={color} size={26} />
  );
}

const styles = StyleSheet.create({});
