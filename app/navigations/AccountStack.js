import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="account">
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta", headerShown: false }}
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
