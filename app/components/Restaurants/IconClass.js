import React, { useState, useEffect } from "react";
import ProgressCircle from "react-native-progress-circle";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

export default function IconClass(props) {
  const {
    nombre,
    nombreIcon,
    coronas,
    completado,
    veces_completado,
    img,
    color,
  } = props;
  //const disable = true;
  const [percent, setPercent] = useState(0);

  // Map que asigna un color y la imagen por cada categoria
  const iconMap = new Map([
    [
      "cuerpo-humano",
      {
        uri: require("../../../assets/icons/hombre/cuerpo-humano.png"),
        color: "#5DADE2",
      },
    ],
    [
      "escencia",
      {
        uri: require("../../../assets/icons/hombre/escencia.png"),
        color: "#5DADE2",
      },
    ],
    [
      "tiempo",
      {
        uri: require("../../../assets/icons/hombre/tiempo.png"),
        color: "#5DADE2",
      },
    ],
    [
      "inteligencia",
      {
        uri: require("../../../assets/icons/hombre/inteligencia.png"),
        color: "#5DADE2",
      },
    ],
    [
      "espacio",
      {
        uri: require("../../../assets/icons/hombre/espacio.png"),
        color: "#5DADE2",
      },
    ],
  ]);

  const jewelStyle = function (color) {
    return {
      backgroundColor: color,
      borderRadius: 100,
      width: "80%",
      height: "80%",
      alignItems: "center",
    };
  };

  useEffect(() => {
    setPercent(coronas);
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View style={{ position: "absolute" }}>
        <ProgressCircle
          percent={10 * veces_completado}
          radius={50}
          borderWidth={8}
          color={percent === 0 ? "gray" : "#FFD200"}
          shadowColor="#E4E4E4"
          bgColor="#fff"
        >
          <View
            style={percent === 0 ? styles.iconContainerGray : jewelStyle(color)}
            onPress={() => console.log("lkdnsklfsn")}
          >
            <Image
              style={{
                marginTop: 15,
                height: 40,
                width: 40,
              }}
              source={{ uri: img }}
            />
            {percent === 0 ? (
              <Image
                style={{
                  position: "absolute",
                  tintColor: "gray",
                  opacity: 0.8,
                  marginTop: 15,
                  height: 40,
                  width: 40,
                }}
                source={{ uri: img }}
              />
            ) : null}
          </View>
        </ProgressCircle>

        <Image
          source={require("../../../assets/icons/crown1.png")}
          style={{
            position: "absolute",
            bottom: 2,
            right: 5,
            height: 30,
            width: 38,
          }}
        />
        {percent === 0 ? (
          <Image
            source={require("../../../assets/icons/crown1.png")}
            style={{
              position: "absolute",
              bottom: 2,
              right: 5,
              tintColor: "#a7a7a7",
              height: 30,
              width: 38,
            }}
          />
        ) : null}
        {percent === 0 ? null : (
          <Text
            style={{
              position: "absolute",
              bottom: 3,
              right: 19,
              color: "#DB8B00",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {percent}
          </Text>
        )}
      </View>
      <Text style={{ marginTop: 100, fontSize: 14, fontWeight: "bold" }}>
        {nombre.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainerGray: {
    backgroundColor: "gray",
    borderRadius: 100,
    width: "80%",
    height: "80%",
    alignItems: "center",
  },
});
