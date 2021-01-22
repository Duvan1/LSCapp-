import React, { useState } from "react";
import ProgressCircle from "react-native-progress-circle";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";

export default function IconClass() {
  //const disable = true;
  const [disable, setDisable] = useState(false);

  return (
    <View
      style={{
        alignItems: "center",
        marginRight: 60,
        marginLeft: 60,
        marginBottom: 20,
      }}
    >
      <View style={{ position: "absolute" }}>
        <ProgressCircle
          percent={30}
          radius={50}
          borderWidth={8}
          color={disable ? "gray" : "#FFD200"}
          shadowColor="#E4E4E4"
          bgColor="#fff"
        >
          <View
            style={disable ? styles.iconContainerGray : styles.iconContainer}
            onPress={() => console.log("lkdnsklfsn")}
          >
            <Image
              style={{
                marginTop: 15,
                height: 40,
                width: 40,
              }}
              source={require("../../../assets/icons/burguer.png")}
            />
            {disable ? (
              <Image
                style={{
                  position: "absolute",
                  tintColor: "gray",
                  opacity: 0.8,
                  marginTop: 15,
                  height: 40,
                  width: 40,
                }}
                source={require("../../../assets/icons/burguer.png")}
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
        {disable ? (
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
        {disable ? null : (
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
            5
          </Text>
        )}
      </View>
      <Text style={{ marginTop: 105, fontSize: 15, fontWeight: "bold" }}>
        Comidas
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
