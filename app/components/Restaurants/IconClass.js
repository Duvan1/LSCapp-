import React, { useState, useEffect } from "react";
import ProgressCircle from "react-native-progress-circle";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

export default function IconClass() {
  //const disable = true;
  const [percent, setPercent] = useState(0);

  const imgs = [
    require("../../../assets/icons/hombre/alimentacion.png"),
    require("../../../assets/icons/hombre/aseo-personal.png"),
    require("../../../assets/icons/hombre/cantidad.png"),
    require("../../../assets/icons/hombre/cuerpo.png"),
    require("../../../assets/icons/hombre/espacio.png"),
    require("../../../assets/icons/hombre/fisiologia.png"),
    require("../../../assets/icons/hombre/fruts.png"),
    require("../../../assets/icons/hombre/inteligencia.png"),
    require("../../../assets/icons/hombre/salud.png"),
    require("../../../assets/icons/hombre/sentimientos.png"),
  ];
  const titles = [
    "Alimentación",
    "Aseo Personal",
    "Cantidad",
    "Cuerpo",
    "Espacio",
    "Fisiología",
    "Frutas",
    "Inteligencía",
    "Salud",
    "Sentimientos",
  ];

  useEffect(() => {
    setPercent(Math.floor(Math.random() * (9 + 1)));
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
          percent={10 * percent}
          radius={50}
          borderWidth={8}
          color={percent === 0 ? "gray" : "#FFD200"}
          shadowColor="#E4E4E4"
          bgColor="#fff"
        >
          <View
            style={
              percent === 0 ? styles.iconContainerGray : styles.iconContainer
            }
            onPress={() => console.log("lkdnsklfsn")}
          >
            <Image
              style={{
                marginTop: 15,
                height: 40,
                width: 40,
              }}
              source={imgs[percent]}
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
                source={require("../../../assets/icons/hombre/alimentacion.png")}
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
        {titles[percent]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#FC4848",
    borderRadius: 100,
    width: "80%",
    height: "80%",
    alignItems: "center",
  },
  iconContainerGray: {
    backgroundColor: "gray",
    borderRadius: 100,
    width: "80%",
    height: "80%",
    alignItems: "center",
  },
});
