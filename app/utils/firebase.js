import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBWI_xrLUmPFNG58F82G2T11fW8Oz2ZjLs",
  authDomain: "tenedores-d1e09.firebaseapp.com",
  databaseURL: "https://tenedores-d1e09.firebaseio.com",
  projectId: "tenedores-d1e09",
  storageBucket: "tenedores-d1e09.appspot.com",
  messagingSenderId: "788574431137",
  appId: "1:788574431137:web:e698c017ffc9ac90f7cde0",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
