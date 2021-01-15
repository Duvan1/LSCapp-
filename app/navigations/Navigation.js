import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// firebase

import firebase from "firebase";
import "firebase/firestore";
// stacks
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantsStack from "./RestaurantsStack";
import FavoritesSrack from "./FavoritesSrack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";
import UserLogged from "../screens/Account/UserLogged";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  const [logged, setLogged] = useState(false);
  const [loadded, setLoadded] = useState(false);
  const [barColor, setBarColor] = useState("#5fbdff");
  const [inactiveColor, setinactiveColor] = useState("#B0DDFF");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLogged(false);
        setLoadded(true);
      } else {
        setLogged(true);
        setLoadded(true);
      }
    });
  }, []);

  // Por si aun no carga hijo
  if (!loadded) {
    return <AppLoading />;
  }

  // por sino ha iniciado sesión hijo
  if (!logged) {
    return (
      <NavigationContainer>
        <AccountStack />
      </NavigationContainer>
    );
  }

  // Por si ya inicio sesión hijo
  return (
    <NavigationContainer>
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
          }}
          listeners={() => ({
            tabPress: (event) => {
              setBarColor("#00A680");
              setinactiveColor("#8EDCCA");
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
