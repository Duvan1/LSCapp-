import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import Senia from "../screens/Senia";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{ title: "Mi Diccionario" }}
      />
      <Stack.Screen
        name="senia"
        component={Senia}
        options={{ title: "Seña" }}
      />
    </Stack.Navigator>
  );
}
