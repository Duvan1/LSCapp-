import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import UserGuest from "../screens/Account/UserGuest";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="account-user">
      <Stack.Screen
        name="account-user"
        component={UserGuest}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: "Iniciar Sesion",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Registro", headerShown: true }}
      />
    </Stack.Navigator>
  );
}
