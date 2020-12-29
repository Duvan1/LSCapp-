import React from "react";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Setting a timer",
  "Animated: `useNativeDriver` was not specified.",
]);

export default function App() {
  return <Navigation />;
}
