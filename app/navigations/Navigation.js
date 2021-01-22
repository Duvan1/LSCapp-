import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./MainTab";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
// firebase
import firebase from "firebase";
import "firebase/firestore";
// stacks
import AccountStack from "./AccountStack";
import IconClass from "../components/Restaurants/IconClass";

const Stack = createStackNavigator();

export default function Navigation() {
  const [logged, setLogged] = useState(false);
  const [loadded, setLoadded] = useState(false);

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
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={IconClass}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
