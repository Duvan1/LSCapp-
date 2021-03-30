import React from "react";
import { StyleSheet, Alert } from "react-native";
import { Overlay } from "react-native-elements";

export default function ModalEjercicio(props) {
  const { isVisible, setVisible, children } = props;
  const closeModal = () => setVisible(false);

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={() => {
        Alert.alert("¡Espera!", "¿Seguro que quieres salir de la clase?", [
          {
            text: "Quedarme",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Salir", onPress: () => setVisible(false) },
        ]);
      }}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  cancel: {
    color: "#E74C3C",
  },
});
