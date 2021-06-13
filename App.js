import React from "react";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";
import { LogBox } from "react-native";
import { decode, encode } from "base-64";

LogBox.ignoreLogs([
  "Setting a timer",
  "Animated: `useNativeDriver` was not specified.",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead",
  "VirtualizedList",
  'Each child in a list should have a unique "key" prop.',
  "Unhandled promise rejection",
  "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return <Navigation />;
}
